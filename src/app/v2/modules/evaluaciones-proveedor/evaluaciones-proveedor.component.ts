import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService, ModeloCaracterService } from '@core/services';
import { AuthState, Role } from '@shared/enums';

@Component({
  selector: 'app-evaluaciones-proveedor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evaluaciones-proveedor.component.html',
  styleUrl: './evaluaciones-proveedor.component.scss',
})
export class EvaluacionesProveedorComponent {
  private loginService = inject(LoginService);
  private modeloCaracterService = inject(ModeloCaracterService);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  // Signal del ModeloMadurezService
  modeloCaracter = this.modeloCaracterService.modeloCaracter;

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
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Proveedor.toLowerCase()
      ) {
        // El usuario está logueado y su rol es 'empresa'
        // Pedir al service que actualice los valores
        console.log('recheckData');
        this.modeloCaracterService.recheckData();
      }
    });
  }

  openLink(): void {
    this.modeloCaracterService.openLink();
  }
}
