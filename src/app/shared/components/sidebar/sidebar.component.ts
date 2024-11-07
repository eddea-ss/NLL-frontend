import { 
  ChangeDetectionStrategy, 
  Component, 
  inject 
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService, SidebarService, ThemeService } from '@core/services';
import { AuthState, Theme } from '@shared/enums';
import { SidebarOption } from '@shared/models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatDividerModule, MatIconModule],  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  public readonly AuthState = AuthState;

  private themeService = inject(ThemeService);
  private loginService = inject(LoginService);
  private sidebarService = inject(SidebarService);
  private router = inject(Router);

  protected readonly authState = this.loginService.authState;
  protected readonly currentUser = this.loginService.currentUser;
  protected readonly authError = this.loginService.authError;
  protected readonly isOpen = this.sidebarService.isSidebarOpen;

  menuOptions: SidebarOption[] = [];
  menuNavbar: SidebarOption[] = [
    { label: 'Quienes somos', icon: 'info', routerLink: '/quienes-somos' },
    { label: 'Modelo de diagnóstico', icon: 'assessment', routerLink: '/modelo' },
    { label: 'Cursos', icon: 'book', routerLink: '/cursos' },
    { label: 'Proveedores', icon: 'business', routerLink: '/proveedores' },
    { label: 'Proyectos destacados', icon: 'star', routerLink: '/proyectos' },
    { label: 'Financiamiento', icon: 'attach_money', routerLink: '/financiamiento' },
    { label: 'Artículos de interés', icon: 'article', routerLink: '/articulos' }
  ];
  menuBotton: SidebarOption[] = [
    { label: 'Cerrar Sesión', icon: 'logout', action: 'logout' },
  ]

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.loginService.logout();
    this.sidebarService.closeSidebar();
  }

  toggleTheme(): void {
    const newTheme = this.themeService.getTheme() === Theme.Light ? Theme.Dark : Theme.Light;
    this.themeService.setTheme(newTheme);
  }

  handleMenuClick(option: SidebarOption): void {
    if (option.action === 'logout') {
      this.loginService.logout();
      this.router.navigate(['/']); // Redirigir a login después de cerrar sesión
    } else if (option.routerLink) {
      this.router.navigate([option.routerLink]);
    }
    this.toggleSidebar();
  }
}
