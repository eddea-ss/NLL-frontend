import { Component, effect, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '@v2/services';
import { AuthState, Role, UserType } from '@v2/enums';

interface MenuItem {
  label: string;
  route?: string;
  roleCondition?: UserType[];
  showIfLoggedOut?: boolean;
  alwaysVisible?: boolean;
}

interface DropdownMenu {
  label: string;
  items: MenuItem[];
  route?: string;
  isOpenSignal: ReturnType<typeof signal>;
  isDropdown?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // Inyectamos servicios necesarios
  private loginService = inject(LoginService);
  private router = inject(Router);

  // Estados de autenticación del usuario
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  // Hacer disponibles los enums en la plantilla
  public AuthState = AuthState;
  public Role = Role;

  @Input() background = '#1f2937';
  @Input() zindex = '';

  // Estado del menú móvil
  isMobileMenuOpen = false;

  // Menús principales
  projectMenu: DropdownMenu = {
    label: 'Proyecto',
    isDropdown: true,
    items: [
      { label: 'Equipo', route: '/proyecto-equipo', alwaysVisible: true },
      {
        label: 'Plataforma',
        route: '/proyecto-plataforma',
        alwaysVisible: true,
      },
    ],
    isOpenSignal: signal(false),
  };

  evaluacionesMenu: DropdownMenu = {
    label: 'Evaluaciones',
    isDropdown: true,
    items: [
      {
        label: 'Madurez Tecnológica',
        route: '/evaluaciones-madurez',
        roleCondition: [UserType.COMPANY],
        showIfLoggedOut: true,
      },
      {
        label: 'Proveedores',
        route: '/evaluaciones-proveedor',
        roleCondition: [UserType.SUPPLIER],
        showIfLoggedOut: true,
      },
      {
        label: 'Startup y Emprendimiento',
        route: '/evaluaciones-startup',
        roleCondition: [UserType.STARTUP],
        showIfLoggedOut: true,
      },
    ],
    isOpenSignal: signal(false),
  };

  investigacionMenu: DropdownMenu = {
    label: 'Investigación',
    isDropdown: true,
    items: [
      {
        label: 'Podcast i4.0',
        route: '/investigacion-podcasts',
        alwaysVisible: true,
      },
      {
        label: 'Diagnóstico Regional i4.0',
        route: '/investigacion-diagnostico',
        alwaysVisible: true,
      },
    ],
    isOpenSignal: signal(false),
  };

  buscadoresMenu: DropdownMenu = {
    isDropdown: false,
    label: 'Buscador',
    route: '/buscador',
    items: [],
    isOpenSignal: signal(false),
  };

  cuentaMenu: DropdownMenu = {
    label: 'Cuenta',
    isDropdown: true,
    items: [
      { label: 'Ingresa a tu cuenta', route: '/login', alwaysVisible: false },
      { label: 'Cerrar sesión', route: '', alwaysVisible: false },
    ],
    isOpenSignal: signal(false),
  };

  mainMenus: DropdownMenu[] = [
    this.projectMenu,
    this.evaluacionesMenu,
    this.investigacionMenu,
    this.buscadoresMenu,
    this.cuentaMenu,
  ];

  profileImageUrl: string =
    'https://accesos.nuevoloslagos.org/logos/default.png';
  constructor() {
    // Efecto que se activa cuando cambia el estado de autenticación o el usuario actual
    effect(() => {
      const authStateValue = this.authState();
      const user = this.currentUser();
      // Aquí podemos agregar lógica adicional si se requiere.
      this.setProfileImageUrl(user?.url);
    });
  }

  // Retorna true si el usuario está logueado
  get isLoggedIn(): boolean {
    return this.authState() === AuthState.LoggedIn;
  }

  // Retorna true si el usuario está deslogueado
  get isLoggedOut(): boolean {
    return this.authState() === AuthState.LoggedOut;
  }

  // Devuelve el rol actual del usuario o null si no lo hay
  get currentRole(): UserType | null {
    return this.currentUser()?.type || null;
  }

  // Abre o cierra el menú móvil
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.closeAllSubmenus();
    }
  }

  // Cierra el menú móvil
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.closeAllSubmenus();
  }

  // Cierra todos los submenús abiertos
  closeAllSubmenus() {
    this.mainMenus.forEach((menu) => menu.isOpenSignal.set(false));
  }

  // Abre o cierra un submenú específico
  toggleSubmenu(menu: DropdownMenu) {
    const open = menu.isOpenSignal();
    this.closeAllSubmenus();
    menu.isOpenSignal.set(open);
    menu.isOpenSignal.set(!menu.isOpenSignal());
  }

  // Cierra sesión y redirige a la página inicial
  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  // Determina si un ítem del menú debe ser visible según el estado de autenticación y el rol del usuario
  shouldShowMenuItem(item: MenuItem): boolean {
    // Nuevo caso: si está deslogueado y el ítem está marcado para mostrarse en ese estado
    if (this.isLoggedOut && (item as any).showIfLoggedOut) {
      return true;
    }

    // Lógica existente:
    if (item.alwaysVisible) {
      return true;
    }

    if (this.isLoggedOut) {
      // Si el usuario está deslogueado y no tiene showIfLoggedOut, solo mostramos
      // ítems sin condiciones de rol (esto se mantiene para otros menús).
      return !item.roleCondition;
    }

    // Si el usuario está logeado y el ítem requiere rol, verificamos si coincide
    if (this.isLoggedIn && item.roleCondition && this.currentRole) {
      return item.roleCondition.includes(this.currentRole);
    }

    return false;
  }

  // Navega hacia la ruta del ítem o realiza la acción correspondiente (ej: logout)
  onMenuItemClick(item: MenuItem) {
    if (item?.route) {
      this.router.navigate([item.route]);
    } else if (item.label === 'Cerrar sesión') {
      this.logout();
    }
    this.closeMobileMenu();
  }
  setProfileImageUrl(userImageUrl: string | undefined | null): void {
    if (userImageUrl) {
      this.profileImageUrl = `https://accesos.nuevoloslagos.org/logos/${userImageUrl}`;
    } else {
      this.profileImageUrl =
        'https://accesos.nuevoloslagos.org/logos/default.png';
    }
  }
}
