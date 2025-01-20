import { Component, effect, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthState, UserType } from '@v2/enums';
import { LoginService } from '@v2/services';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() type: number = 2;
  private loginService = inject(LoginService);
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public UserType = UserType;

  link: string = '';
  label: string = '';

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();

      if (authState === AuthState.LoggedOut) {
        this.link = '/registro';
        this.label = 'Regístrate';
      } else if (this.currentUser()?.type === UserType.COMPANY) {
        this.link = '/evaluaciones-madurez';
        this.label = 'Evaluación de Madurez';
      } else if (this.currentUser()?.type === UserType.STARTUP) {
        this.link = '/evaluaciones-startup';
        this.label = 'Evaluación de Emprendimiento';
      } else if (this.currentUser()?.type === UserType.SUPPLIER) {
        this.link = '/evaluaciones-proveedor';
        this.label = 'Evaluación de Proveedor';
      }
    });
  }
}
