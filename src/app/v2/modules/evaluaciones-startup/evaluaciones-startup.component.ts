import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService, FormacionEmprendedoresService } from '@core/services';
import { StartupEmprendimientoService } from '@core/services/startup-emprendimiento.service';
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
  private startupService = inject(StartupEmprendimientoService);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  //signal formacionEmprendedores
  formacionEmprendedores =
    this.formacionEmprendedoresService.formacionEmprendedores;

  //para startup
  startup = this.startupService.startupEmprendedores;
  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Usuario.toLowerCase()
      ) {
        this.formacionEmprendedoresService.recheckData();
        this.formacionEmprendedoresService.recheckData();
      }
    });
  }

  openLink(): void {
    this.formacionEmprendedoresService.openLink();
  }

  openLinkStartup(): void {
    this.startupService.openLink('STARTUP');
  }

  openLinkEmprendimiento(): void {
    this.startupService.openLink('EMPRENDIMIENTO');
  }
}
