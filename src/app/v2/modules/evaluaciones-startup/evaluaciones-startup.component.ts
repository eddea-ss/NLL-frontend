import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService, FormacionEmprendedoresService } from '@core/services';
import { AuthState, Role } from '@shared/enums';

@Component({
  selector: 'app-evaluaciones-startup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './evaluaciones-startup.component.html',
  styleUrl: './evaluaciones-startup.component.scss',
})
export class EvaluacionesStartupComponent {
  private loginService = inject(LoginService);
  private formacionEmprendedoresService = inject(FormacionEmprendedoresService);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  //signal formacionEmprendedores
  formacionEmprendedores =
    this.formacionEmprendedoresService.formacionEmprendedores;
  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Usuario.toLowerCase()
      ) {
        // El usuario está logueado y su rol es 'empresa'
        // Pedir al service que actualice los valores
        console.log('recheckData');
        this.formacionEmprendedoresService.recheckData();
      }
    });
  }

  openLink(): void {
    this.formacionEmprendedoresService.openLink();
  }
}
