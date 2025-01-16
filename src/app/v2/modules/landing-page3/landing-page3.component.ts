import { Component, effect, inject } from '@angular/core';
import { ExtrasComponent, TitleSectionComponent } from '@v2/components';
import { PatrocinadoresComponent } from '../../components/patrocinadores/patrocinadores.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginService } from '@v2/services';
import { AuthState, UserType } from '@v2/enums';

@Component({
  selector: 'app-landing-page3',
  standalone: true,
  imports: [
    ExtrasComponent,
    PatrocinadoresComponent,
    FooterComponent,
    TitleSectionComponent,
  ],
  templateUrl: './landing-page3.component.html',
  styleUrl: './landing-page3.component.scss',
})
export class LandingPage3Component {
  private loginService = inject(LoginService);
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public UserType = UserType;

  titleSection = {
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    imageSrc: 'assets/hero.webp',
    imageAlt: 'mockup',
  };

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (authState === AuthState.LoggedIn) {
        this.titleSection.title = 'Bienvenido!';
        this.titleSection.description =
          'Aprende más sobre tus clientes y comerciales';
        this.titleSection.buttonText = 'Empezar';
        if (user?.type === UserType.SUPPLIER) {
          this.titleSection.buttonLink = '/evaluaciones-proveedor';
        } else if (user?.type === UserType.COMPANY) {
          this.titleSection.buttonLink = '/evaluaciones-madurez';
        } else if (user?.type === UserType.STARTUP) {
          this.titleSection.buttonLink = '/evaluaciones-startup';
        }
      } else {
        this.titleSection.title = 'Encuentra la innovación en Nuevo Los Lagos';
        this.titleSection.description =
          'Descubre cómo conectarte con empresas de la Industria 4.0';
        this.titleSection.buttonText = 'Regístrate';
        this.titleSection.buttonLink = '/registro';
      }
    });
  }
}
