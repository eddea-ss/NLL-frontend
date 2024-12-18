import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GoogleAnalyticsService, SnackbarService } from '@v2/services';
import { Router } from '@angular/router';
import { AuthState, Role } from '@v2/enums';
import {
  LoginCredentials,
  LoginResponse,
  Usuario,
  Industria,
  Proveedor,
} from '@v2/models';

describe('LoginService (pruebas con diferentes roles y modelos)', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockGoogleAnalytics: jasmine.SpyObj<GoogleAnalyticsService>;
  let mockSnackbar: jasmine.SpyObj<SnackbarService>;
  let mockLocalStorage: { [key: string]: string | null };

  const apiUrl = 'https://accesos.nuevoloslagos.org/api/usuarios/login';

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockGoogleAnalytics = jasmine.createSpyObj('GoogleAnalyticsService', [
      'eventEmitter',
    ]);
    mockSnackbar = jasmine.createSpyObj('SnackbarService', ['show']);

    mockLocalStorage = {};
    spyOn(window.localStorage, 'getItem').and.callFake(
      (key: string) => mockLocalStorage[key] ?? null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (mockLocalStorage[key] = value)
    );
    spyOn(window.localStorage, 'removeItem').and.callFake(
      (key: string) => delete mockLocalStorage[key]
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        { provide: Router, useValue: mockRouter },
        { provide: GoogleAnalyticsService, useValue: mockGoogleAnalytics },
        { provide: SnackbarService, useValue: mockSnackbar },
      ],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Inicialización del servicio', () => {
    it('debería iniciar en LoggedOut si no hay token ni usuario en localStorage', () => {
      expect(service.authState()).toBe(AuthState.LoggedOut);
      expect(service.currentUser()).toBeNull();
      expect(service.authToken()).toBeNull();
    });

    it('debería pasar a LoggedOut si el rol del usuario no es válido', () => {
      const usuarioInvalido: Usuario = {
        idUsuario: 2,
        nombreRepresentante: 'Usuario Invalido',
        correo: 'test@example.com',
        rol_id: 99,
        estado: null,
        limiteBusquedas: null,
        created_at: null,
        rol: { nombreRol: 'ROL_INVALIDO' as Role },
        empresas: null,
        proveedores: null,
        rut: null,
      };

      mockLocalStorage['authToken'] = 'invalid-token';
      mockLocalStorage['user'] = JSON.stringify(usuarioInvalido);

      // Re-inyectar el servicio para que lea estos valores
      const service = TestBed.inject(LoginService);

      // Si la lógica actual del servicio es cambiar a LoggedOut ante rol inválido:
      expect(service.authState()).toBe(AuthState.LoggedOut);
      expect(service.authError()).toBeNull(); // o la expectativa que corresponda si no se asigna error
      expect(service.currentUser()).toBeNull();
      expect(service.authToken()).toBeNull();
    });
  });

  describe('#login con diferentes roles', () => {
    function createUsuario(role: Role): Usuario {
      return {
        idUsuario: 10,
        nombreRepresentante: 'Test User',
        correo: `${role}@example.com`,
        rol_id: 1,
        estado: null,
        limiteBusquedas: null,
        created_at: null,
        rol: { nombreRol: role },
        empresas: null,
        proveedores: null,
        rut: null,
      };
    }

    function performLoginTest(
      credentials: LoginCredentials,
      expectedRole: Role
    ) {
      const usuario = createUsuario(expectedRole);
      const loginResponse: LoginResponse = {
        message: 'Login exitoso',
        token: `valid-token-${expectedRole}`,
        usuario,
      };

      service.login(credentials).subscribe((response) => {
        expect(response.token).toBe(`valid-token-${expectedRole}`);
        expect(response.usuario.rol.nombreRol).toBe(expectedRole);
        expect(service.authState()).toBe(AuthState.LoggedIn);
        expect(service.currentUser()).toEqual(usuario);
        expect(service.authToken()).toBe(`valid-token-${expectedRole}`);

        expect(mockGoogleAnalytics.eventEmitter).toHaveBeenCalledWith(
          'click-login-correcto',
          { label: 'Click Login Success' }
        );
        expect(mockSnackbar.show).toHaveBeenCalledWith(
          'Inicio de sesión correcto',
          4000
        );
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    }

    it('debería loguearse como usuario (emprendedor)', () => {
      const credentials: LoginCredentials = {
        correo: 'emprendedor1@gmail.com',
        password: 'Password123!',
      };
      performLoginTest(credentials, Role.Usuario);
    });

    it('debería loguearse como proveedor', () => {
      const credentials: LoginCredentials = {
        correo: 'proveedor1@gmail.com',
        password: 'Password123!',
      };
      performLoginTest(credentials, Role.Proveedor);
    });

    it('debería loguearse como empresa', () => {
      const credentials: LoginCredentials = {
        correo: 'empretest1@gmail.com',
        password: 'Password123!',
      };
      performLoginTest(credentials, Role.Empresa);
    });
  });

  describe('#logout', () => {
    it('debería realizar logout correctamente', () => {
      const usuario: Usuario = {
        idUsuario: 1,
        nombreRepresentante: 'Test Representante',
        correo: 'emprendedor1@gmail.com',
        rol_id: 1,
        estado: null,
        limiteBusquedas: null,
        created_at: null,
        rol: { nombreRol: Role.Usuario }, // Asegúrate que el rol exista en el enum Role
        empresas: null,
        proveedores: null,
        rut: null,
      };

      // Establecer localStorage antes de inyectar el servicio
      mockLocalStorage['authToken'] = 'test-token';
      mockLocalStorage['user'] = JSON.stringify(usuario);

      // Ahora inyectar el servicio
      service = TestBed.inject(LoginService);

      // Ahora hacer logout
      service.logout();

      expect(service.authState()).toBe(AuthState.LoggedOut);
      expect(service.currentUser()).toBeNull();
      expect(service.authToken()).toBeNull();
      expect(mockSnackbar.show).toHaveBeenCalledWith('Sesión cerrada', 4000);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      expect(mockLocalStorage['authToken']).toBeUndefined();
      expect(mockLocalStorage['user']).toBeUndefined();
    });
  });

  describe('#isAuthenticated', () => {
    it('debería retornar false si el usuario no está autenticado', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('#getCurrentUser', () => {
    it('debería retornar null si no hay usuario autenticado', () => {
      expect(service.getCurrentUser()).toBeNull();
    });
  });

  describe('#getAuthToken', () => {
    it('debería retornar null si no hay token', () => {
      expect(service.getAuthToken()).toBeNull();
    });
  });
});
