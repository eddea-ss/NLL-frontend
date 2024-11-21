import { Component, effect, inject } from '@angular/core';
import { LoginService, ModeloMadurezService } from '@core/services';
import { AuthState, Role } from '@shared/enums';

@Component({
  selector: 'app-evaluaciones-madurez',
  standalone: true,
  imports: [],
  templateUrl: './evaluaciones-madurez.component.html',
  styleUrl: './evaluaciones-madurez.component.scss',
})
export class EvaluacionesMadurezComponent {
  private loginService = inject(LoginService);
  private modeloMadurezService = inject(ModeloMadurezService);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  // Signal del ModeloMadurezService
  modeloMadurez = this.modeloMadurezService.modeloMadurez;

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      console.log(authState, user);

      console.log(user?.rol.nombreRol, Role.Empresa);
      console.log(
        authState === AuthState.LoggedIn,
        authState,
        AuthState.LoggedIn
      );
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Empresa
      ) {
        // El usuario está logueado y su rol es 'empresa'
        // Pedir al ModeloMadurezService que actualice los valores
        console.log('recheckData');
        this.modeloMadurezService.recheckData();
      }
    });
  }

  openLink(): void {
    this.modeloMadurezService.openLink();
  }
}
