import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LoginService, SidebarService } from '@core/services';
import { AuthState } from '@shared/enums';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
   
})
export class NavbarComponent {
  isDropdownOpen = false;

  // Exponer el enum AuthState al template
  public readonly AuthState = AuthState;

  // Inyectar LoginService usando la función `inject`
  private loginService = inject(LoginService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);

  // Acceder a los Signals de LoginService
  public readonly authState = this.loginService.authState;
  public readonly currentUser = this.loginService.currentUser;
  public readonly authError = this.loginService.authError;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
    this.isDropdownOpen = false;
  }
}
