import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private apiUrl = 'https://demo.nuevoloslagos.org/data'; // URL base de la API
  private apiUrlUsers = 'http://64.176.10.243:3021/api/usuarios';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // BehaviorSubject para rastrear el estado de autenticación
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  //Crear otros 2 behaviorSubjects para otros casos
  private nombreRolSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private encuestaRealizadaSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private rutSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private limiteBusquedasSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private nombreEmpresaSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();
  //Observadores publicos
  public nombreRol$: Observable<string> = this.nombreRolSubject.asObservable();
  public encuestaRealizada$: Observable<boolean> =
    this.encuestaRealizadaSubject.asObservable();
  public rut$: Observable<string> = this.rutSubject.asObservable();
  public limiteBusquedas$: Observable<number> =
    this.limiteBusquedasSubject.asObservable();
  public nombreEmpresa$: Observable<string> =
    this.nombreEmpresaSubject.asObservable();

  constructor(private http: HttpClient) {
    // Inicializar el estado de autenticación basado en el token en localStorage
    const token = localStorage.getItem('authToken');
    const nombreRol = localStorage.getItem('nombreRol');
    const encuestaRealizada = localStorage.getItem('encuestaRealizada');
    const rut = localStorage.getItem('rut');
    const limiteBusquedas = localStorage.getItem('limiteBusquedas');
    const nombreEmpresa = localStorage.getItem('nombreEmpresa');

    this.isLoggedInSubject.next(!!token);
    this.nombreRolSubject.next(nombreRol || '');
    this.encuestaRealizadaSubject.next(encuestaRealizada === 'true');
    this.rutSubject.next(rut || '');
    this.limiteBusquedasSubject.next(
      limiteBusquedas ? Number(limiteBusquedas) : 0 //O parseInt para convertir a número  
    );
    this.nombreEmpresaSubject.next(nombreEmpresa || '');
  }

  // Manejar los errores de la API
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(
        `Backend retornó código ${error.status}, ` +
          `cuerpo del error: ${error.error}`
      );
    }
    return throwError('Algo salió mal; por favor, intenta de nuevo más tarde.');
  }

  // Obtener datos de la API y manejar respuestas en diferentes formatos
  getData(endpoint: string): Observable<any[]> {
    return this.http
      .get(`${this.apiUrl}/${endpoint}`, {
        ...this.httpOptions,
        responseType: 'text', // Solicitamos la respuesta como texto
      })
      .pipe(
        map((responseText: string) => {
          try {
            const trimmedResponse = responseText.trim();

            if (trimmedResponse.startsWith('{')) {
              // Caso 1: Múltiples objetos JSON separados por líneas
              const jsonObjects = trimmedResponse
                .split('\n')
                .filter((line) => line.trim().length > 0) // Filtrar líneas vacías
                .map((line) => JSON.parse(line));
              return jsonObjects;
            } else if (trimmedResponse.startsWith('[')) {
              // Caso 2: Arreglo JSON válido
              return JSON.parse(trimmedResponse);
            } else {
              // Formato desconocido
              console.error('Formato de respuesta desconocido.');
              return [];
            }
          } catch (e) {
            console.error('Error al parsear la respuesta:', e);
            return []; // Retornamos una lista vacía en caso de error
          }
        }),
        catchError((error) => {
          console.error('Error en getData:', error);
          return of([]); // Retornamos una lista vacía en caso de error HTTP
        })
      );
  }

  // Enviar datos a la API
  // Registro y Login
  postData(endpoint: string, data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrlUsers}/${endpoint}`, data, this.httpOptions) //Dirigido a la base de datos
      .pipe(catchError(this.handleError));
  }

  // Actualizar datos en la API
  updateData(
    endpoint: string,
    id: number | string,
    data: any
  ): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${endpoint}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Eliminar datos de la API
  deleteData(endpoint: string, id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${endpoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Lógica común para manejar el token y actualizar estado de autenticación
  //Observador.
  private manejarToken(token: string, usuario: any): void {
    localStorage.setItem('authToken', token);
    //Guardar encuestaRealizada y nombrerol en localstorage

    let nombreRol = '';
    let encuestaRealizada = false;
    let rut = '';
    let limiteBusquedas = 0;
    let nombreEmpresa = '';

    try {
      nombreRol = usuario.rol?.nombreRol || '';
    } catch (error) {
      console.warn(
        'No se pudo obtener nombreRol. Se usará valor por defecto.',
        error
      );
      nombreRol = '';
    }

    try {
      encuestaRealizada = usuario.encuestaRealizada ?? false;
    } catch (error) {
      console.warn(
        'No se pudo obtener encuestaRealizada. Se usará valor por defecto.',
        error
      );
      encuestaRealizada = false;
    }

    try {
      rut = usuario.rut || '';
    } catch (error) {
      console.warn(
        'No se pudo obtener rut. Se usará valor por defecto.',
        error
      );
      rut = '';
    }

    try {
      limiteBusquedas = usuario.limiteBusquedas || 0;
    } catch (error) {
      console.warn(
        'No se pudo obtener limiteBusquedas. Se usará valor por defecto.',
        error
      );
      limiteBusquedas = 0;
    }

    try {
      nombreEmpresa = usuario.nombreEmpresa || '';
    } catch (error) {
      console.warn(
        'No se pudo obtener nombreEmpresa. Se usará valor por defecto.',
        error
      );
      nombreEmpresa = '';
    }

    localStorage.setItem('nombreRol', nombreRol);
    localStorage.setItem('encuestaRealizada', String(encuestaRealizada));
    localStorage.setItem('rut', rut);
    localStorage.setItem('limiteBusquedas', String(limiteBusquedas));
    localStorage.setItem('nombreEmpresa', nombreEmpresa);

    this.isLoggedInSubject.next(true);
    //Agregar los otros con next
    this.nombreRolSubject.next(nombreRol);
    this.encuestaRealizadaSubject.next(encuestaRealizada);
    this.rutSubject.next(rut);
    this.limiteBusquedasSubject.next(limiteBusquedas);
    this.nombreEmpresaSubject.next(nombreEmpresa);
  }

  // Método de login real
  login(data: any): Observable<any> {
    return this.postData('login', data).pipe(
      //Cambiar postdata
      tap((response) => {
        console.log('texto');
        if (response.token && response.usuario) {
          this.manejarToken(response.token, response.usuario);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método de login simulado
  // mockLogin(data: any): Observable<any> {
  //   const { email, password } = data;
  //   if (email === 'test@example.com' && password === 'password') {
  //     const simulatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  //     return of({ token: simulatedToken }).pipe(
  //       delay(1000),
  //       tap(response => {
  //         this.manejarToken(response.token);
  //       })
  //     );
  //   } else {
  //     return throwError('Credenciales inválidas').pipe(
  //       delay(1000)
  //     );
  //   }
  // }

  actualizarEncuestaRealizada(realizado: boolean): void {
    localStorage.setItem('encuestaRealizada', String(realizado));
    this.encuestaRealizadaSubject.next(realizado);
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nombreRol');
    localStorage.removeItem('encuestaRealizada');
    localStorage.removeItem('rut');
    localStorage.removeItem('limiteBusquedas');
    localStorage.removeItem('nombreEmpresa');
    //Agregar los otros con next
    this.isLoggedInSubject.next(false);
    // Opcional: Navegar al login o home
    this.nombreRolSubject.next('');
    this.encuestaRealizadaSubject.next(false);
    this.rutSubject.next('');
    this.limiteBusquedasSubject.next(0);
    this.nombreEmpresaSubject.next('');
  }
}
