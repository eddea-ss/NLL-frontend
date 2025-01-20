import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { LoginService } from '@v2/services';
import { AuthState, UserType } from '@v2/enums';

@Component({
  selector: 'app-carousel-banner',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './carousel-banner.component.html',
  styleUrl: './carousel-banner.component.scss',
})
export class CarouselBannerComponent {
  private loginService = inject(LoginService);
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public UserType = UserType;
  slides = [
    {
      type: 'custom1',
      title: 'Prueba el nuevo Asistente para la Industria 4.0',
      buttonText: 'Ir al asistente',
      buttonLink:
        'https://asistente.nuevoloslagos.org' +
        (this.authState() === AuthState.LoggedIn
          ? '/?code=' + this.currentUser()?.rut
          : ''),
    },
    {
      image: 'assets/images/industry.webp',
      content:
        this.authState() === AuthState.LoggedOut
          ? 'Ingresa a tu cuenta e impulsa tu empresa a la industria 4.0'
          : 'Completa tu evaluación y recibe un impulso para llegar a la madurez tecnológica',
      buttonText:
        this.authState() === AuthState.LoggedOut
          ? 'Ingresa a tu cuenta'
          : 'Completa tu evaluación',
      buttonLink:
        this.authState() === AuthState.LoggedOut
          ? '/login'
          : this.currentUser()?.type === UserType.COMPANY
          ? '/evaluaciones-madurez'
          : this.currentUser()?.type === UserType.STARTUP
          ? '/evaluaciones-startup'
          : '/evaluaciones-proveedor',
    },
  ];
}
