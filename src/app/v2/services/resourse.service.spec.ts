// resource.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ResourceService } from './resourse.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GoogleAnalyticsService } from '@v2/services';

describe('ResourceService', () => {
  let service: ResourceService;
  let httpMock: HttpTestingController;
  let mockGoogleAnalyticsService: jasmine.SpyObj<GoogleAnalyticsService>;
  let windowOpenSpy: jasmine.Spy;
  let consoleWarnSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    const googleSpy = jasmine.createSpyObj('GoogleAnalyticsService', [
      'eventEmitter',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ResourceService,
        { provide: GoogleAnalyticsService, useValue: googleSpy },
      ],
    });

    service = TestBed.inject(ResourceService);
    httpMock = TestBed.inject(HttpTestingController);
    mockGoogleAnalyticsService = TestBed.inject(
      GoogleAnalyticsService
    ) as jasmine.SpyObj<GoogleAnalyticsService>;

    // Espiar window.open
    windowOpenSpy = spyOn(window, 'open');
    // Espiar console
    consoleWarnSpy = spyOn(console, 'warn');
    consoleErrorSpy = spyOn(console, 'error');
  });

  afterEach(() => {
    httpMock.verify();
    // Resetear llamados si es necesario
    windowOpenSpy.calls.reset();
    consoleWarnSpy.calls.reset();
    consoleErrorSpy.calls.reset();
  });

  describe('#searchResources', () => {
    it('debería devolver un arreglo de recursos cuando la llamada HTTP es exitosa', () => {
      const dummyResources = [
        { id: 1, name: 'Recurso 1' },
        { id: 2, name: 'Recurso 2' },
      ];
      const query = 'test';
      const path = 'resources';
      const limit = 2;

      service
        .searchResources(query, path, limit)
        .subscribe((resources: string | any[]) => {
          expect(resources.length).toBe(2);
          expect(resources).toEqual(dummyResources);
        });

      const req = httpMock.expectOne(
        `${service['API_BASE_URL']}/${path}/search?search=${query}&limit=${limit}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyResources);
    });

    it('debería manejar errores correctamente', () => {
      const query = '2024';
      const path = 'curses';
      const limit = 2;

      service.searchResources(query, path, limit).subscribe({
        next: () => fail('Debería haber fallado con un error 500'),
        error: (error: { message: any }) => {
          // Ajustar la expectativa al mensaje que realmente genera HttpClient
          expect(error.message).toContain('500 Internal Server Error');
        },
      });

      const req = httpMock.expectOne(
        `${service['API_BASE_URL']}/${path}/search?search=${query}&limit=${limit}`
      );
      req.flush('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('#getPublicationYear', () => {
    it('debería retornar el año correcto de la fecha de publicación', () => {
      const fecha_publicacion = '20230415'; // YYYYMMDD
      const year = service.getPublicationYear(fecha_publicacion);
      expect(year).toBe(2023);
    });

    it('debería retornar el año actual si la fecha es inválida', () => {
      const fecha_publicacion = 'invalid';
      const currentYear = new Date().getFullYear();
      const year = service.getPublicationYear(fecha_publicacion);
      expect(year).toBe(currentYear);
    });
  });

  describe('#convertToDate', () => {
    it('debería convertir una cadena de fecha válida a un objeto Date', () => {
      const dateString = '20230415';
      const date = service.convertToDate(dateString);
      expect(date).toEqual(new Date('2023-04-15'));
    });
  });

  // Ajusta el resto de las pruebas de acuerdo a los cambios realizados (espiar console, window.open, etc.)
  // y asegúrate de que las expectativas coincidan con el comportamiento actual del servicio.
});
