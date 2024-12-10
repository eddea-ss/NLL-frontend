import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { GoogleAnalyticsService, SnackbarService } from '@v2/services';
import { AuthState, Role } from '@shared/enums';
import { LoginCredentials, LoginResponse, Usuario } from '@shared/models';
import { of, throwError } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  // Mocks de las dependencias
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockGoogleAnalytics = jasmine.createSpyObj('GoogleAnalyticsService', [
    'eventEmitter',
  ]);
  const mockSnackbar = jasmine.createSpyObj('SnackbarService', ['show']);
  const mockHttpClient = jasmine.createSpyObj('HttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: Router, useValue: mockRouter },
        { provide: GoogleAnalyticsService, useValue: mockGoogleAnalytics },
        { provide: SnackbarService, useValue: mockSnackbar },
        { provide: 'HttpClient', useValue: mockHttpClient }, // Usar un token de inyección adecuado si es necesario
      ],
    });

    service = TestBed.inject(LoginService);

    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    // Resetear llamadas de los spies después de cada prueba
    jasmine.clock().uninstall();
    // Opcional: Resetear localStorage si es necesario
    localStorage.clear();
  });

  it('debe crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe tener estado LoggedOut al inicio si no hay token en localStorage', () => {
    expect(service.authState()).toBe(AuthState.LoggedOut);
  });

  describe('login', () => {
    const fakeCredentials: LoginCredentials = {
      correo: 'test@example.com',
      password: '123456',
    };
    const fakeUser: Usuario = {
      idUsuario: 123,
      nombreRepresentante: 'Juan Pérez',
      correo: 'test@example.com',
      rol_id: 1,
      estado: 'activo',
      limiteBusquedas: 100,
      created_at: '2023-01-01T00:00:00Z',
      rol: {
        nombreRol: Role.Usuario, // Asegúrate de que 'Admin' exista en tu enum Role
      },
      empresas: null,
      proveedores: null,
      rut: '12.345.678-9',
      rutRepresentante: '12.345.678-9',
      nombreEmpresa: 'Empresa Test',
      nombreProveedor: 'Proveedor A',
      encuestaRealizada: true,
      nivelEncuesta: 5,
    };
    const fakeResponse: LoginResponse = {
      token: 'fake-token',
      message: 'Inicio de sesión correcto',
      usuario: fakeUser,
    };

    it('debe realizar el login correctamente', (done) => {
      // Configurar el spy para que devuelva una respuesta simulada
      mockHttpClient.post.and.returnValue(of(fakeResponse));

      service.login(fakeCredentials).subscribe((response) => {
        expect(response.token).toBe('fake-token');
        expect(response.usuario).toEqual(fakeUser);
        // Verificar cambios en el estado
        expect(service.authState()).toBe(AuthState.LoggedIn);
        expect(service.getCurrentUser()).toEqual(fakeUser);
        expect(service.getAuthToken()).toBe('fake-token');

        // Verificar interacciones con las dependencias
        expect(mockGoogleAnalytics.eventEmitter).toHaveBeenCalledWith(
          'click-login-correcto',
          { label: 'Click Login Success' }
        );
        expect(mockSnackbar.show).toHaveBeenCalledWith(
          'Inicio de sesión correcto',
          4000
        );
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);

        // Verificar almacenamiento en localStorage
        expect(localStorage.getItem('authToken')).toBe('fake-token');
        expect(localStorage.getItem('user')).toBe(JSON.stringify(fakeUser));

        done();
      });

      // Verificar que se haya llamado al método post con los parámetros correctos
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        'https://accesos.nuevoloslagos.org/api/usuarios/login',
        fakeCredentials,
        { headers: jasmine.any(Object) }
      );
    });

    it('debe manejar error al iniciar sesión', (done) => {
      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'Credenciales inválidas' },
      };

      // Configurar el spy para que devuelva un error simulado
      mockHttpClient.post.and.returnValue(throwError(() => errorResponse));

      service.login(fakeCredentials).subscribe({
        next: () => {
          // No debería llegar aquí
          fail('Se esperaba un error pero se recibió una respuesta');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          // Verificar estado
          expect(service.authState()).toBe(AuthState.Error);
          expect(service.authError()).toContain('Credenciales inválidas');

          // Verificar interacciones con las dependencias
          expect(mockGoogleAnalytics.eventEmitter).toHaveBeenCalledWith(
            'click-login-fallido',
            { label: 'Click Login failed' }
          );
          expect(mockSnackbar.show).toHaveBeenCalledWith(
            'Error al iniciar de sesión',
            4000
          );

          done();
        },
      });

      // Verificar que se haya llamado al método post con los parámetros correctos
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        'https://accesos.nuevoloslagos.org/api/usuarios/login',
        fakeCredentials,
        { headers: jasmine.any(Object) }
      );
    });
  });

  describe('logout', () => {
    it('debe realizar el logout correctamente', () => {
      // Simular que el usuario ya está logueado
      localStorage.setItem('authToken', 'fake-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          idUsuario: 123,
          nombreRepresentante: 'Juan Pérez',
          correo: 'test@example.com',
          rol_id: 1,
          estado: 'activo',
          limiteBusquedas: 100,
          created_at: '2023-01-01T00:00:00Z',
          rol: { nombreRol: Role.Usuario },
          empresas: [],
          proveedores: [],
          rut: '12.345.678-9',
        })
      );

      // Re-inicializar el servicio para que lea el localStorage simulado
      service = TestBed.inject(LoginService);
      expect(service.isAuthenticated()).toBeTrue();

      service.logout();
      expect(service.authState()).toBe(AuthState.LoggedOut);
      expect(service.getCurrentUser()).toBeNull();
      expect(service.getAuthToken()).toBeNull();
      expect(mockSnackbar.show).toHaveBeenCalledWith('Sesión cerrada', 4000);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);

      // Verificar que los datos hayan sido removidos de localStorage
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('Inicialización del Servicio', () => {
    it('debe mantener el estado si encuentra un usuario válido en localStorage al crearse', () => {
      localStorage.setItem('authToken', 'valid-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          idUsuario: 123,
          nombreRepresentante: 'Juan Pérez',
          correo: 'test@example.com',
          rol_id: 1,
          estado: 'activo',
          limiteBusquedas: 100,
          created_at: '2023-01-01T00:00:00Z',
          rol: { nombreRol: Role.Usuario },
          empresas: [],
          proveedores: [],
          rut: '12.345.678-9',
        })
      );

      // Crear una nueva instancia del servicio para que se inicialice con datos de localStorage
      service = TestBed.inject(LoginService);
      expect(service.authState()).toBe(AuthState.LoggedIn);
      expect(service.getAuthToken()).toBe('valid-token');
      expect(service.getCurrentUser()?.correo).toBe('test@example.com');
    });

    it('debe manejar error si el rol en localStorage es inválido', () => {
      localStorage.setItem('authToken', 'valid-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          idUsuario: 123,
          nombreRepresentante: 'Juan Pérez',
          correo: 'test@example.com',
          rol_id: 999, // Rol_id inválido
          estado: 'activo',
          limiteBusquedas: 100,
          created_at: '2023-01-01T00:00:00Z',
          rol: { nombreRol: 'RolInexistente' as unknown as Role }, // Casting para evitar errores de TypeScript
          empresas: [],
          proveedores: [],
          rut: '12.345.678-9',
        })
      );

      // Crear una nueva instancia del servicio para que se inicialice con datos erróneos
      service = TestBed.inject(LoginService);
      expect(service.authState()).toBe(AuthState.Error);
      expect(service.authError()).toContain('Rol de usuario inválido');
    });
  });

  describe('Métodos Auxiliares', () => {
    it('debe retornar true en isAuthenticated() si está LoggedIn', () => {
      // Forzar estado LoggedIn
      (service as any)._authState.set(AuthState.LoggedIn);
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('debe retornar el usuario actual con getCurrentUser()', () => {
      const user: Usuario = {
        idUsuario: 123,
        nombreRepresentante: 'Juan Pérez',
        correo: 'current@example.com',
        rol_id: 1,
        estado: 'activo',
        limiteBusquedas: 100,
        created_at: '2023-01-01T00:00:00Z',
        rol: { nombreRol: Role.Usuario },
        empresas: null,
        proveedores: null,
        rut: '12.345.678-9',
        rutRepresentante: '12.345.678-9',
        nombreEmpresa: 'Empresa Actual',
        nombreProveedor: 'Proveedor A',
        encuestaRealizada: false,
        nivelEncuesta: null,
      };
      (service as any)._currentUser.set(user);
      expect(service.getCurrentUser()).toEqual(user);
    });

    it('debe retornar el token actual con getAuthToken()', () => {
      (service as any)._authToken.set('token123');
      expect(service.getAuthToken()).toBe('token123');
    });
  });
});
