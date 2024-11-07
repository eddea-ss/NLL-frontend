import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '@core/services';
import { 
  FooterComponent, 
  NavbarComponent, 
  SidebarComponent 
} from '@shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent, 
    NavbarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private sidebarService = inject(SidebarService)

  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
