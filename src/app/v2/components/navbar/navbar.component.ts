import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '@core/services';
import { AuthState, Role } from '@shared/enums';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  activeMenu: string | null = null;
  private loginService = inject(LoginService);
  private router = inject(Router);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

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
    });
  }

  showMenu(menu: string) {
    this.activeMenu = menu;
  }

  hideMenu() {
    this.activeMenu = null;
  }

  // Estado del menú móvil
  isMobileMenuOpen = false;

  // Estados de submenús en móvil
  isProyectoSubmenuOpen = false;
  isEvaluacionesSubmenuOpen = false;
  isInvestigacionSubmenuOpen = false;
  isBuscadoresSubmenuOpen = false;
  isCuentaSubmenuOpen = false;

  // Método para alternar el menú móvil
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Método para cerrar el menú móvil (útil al seleccionar una opción)
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    // Cerrar todos los submenús
    this.isProyectoSubmenuOpen = false;
    this.isEvaluacionesSubmenuOpen = false;
    this.isInvestigacionSubmenuOpen = false;
    this.isBuscadoresSubmenuOpen = false;
    this.isCuentaSubmenuOpen = false;
  }

  // Métodos para alternar submenús en móvil
  toggleProyectoSubmenu() {
    this.isProyectoSubmenuOpen = !this.isProyectoSubmenuOpen;
  }

  toggleEvaluacionesSubmenu() {
    this.isEvaluacionesSubmenuOpen = !this.isEvaluacionesSubmenuOpen;
  }

  toggleInvestigacionSubmenu() {
    this.isInvestigacionSubmenuOpen = !this.isInvestigacionSubmenuOpen;
  }

  toggleBuscadoresSubmenu() {
    this.isBuscadoresSubmenuOpen = !this.isBuscadoresSubmenuOpen;
  }

  toggleCuentaSubmenu() {
    this.isCuentaSubmenuOpen = !this.isCuentaSubmenuOpen;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
