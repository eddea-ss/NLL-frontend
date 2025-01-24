import { Component, effect, inject, OnInit } from '@angular/core';
import {
  ArticleModalComponent,
  ExtrasComponent,
  TitleSectionComponent,
} from '@v2/components';
import { PatrocinadoresComponent, FooterComponent } from '@v2/components';
import { LoginService, ResourceService } from '@v2/services';
import { AuthState, UserType } from '@v2/enums';
import { TruncatePipe } from '@v2/pipes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page3',
  standalone: true,
  imports: [
    ExtrasComponent,
    PatrocinadoresComponent,
    FooterComponent,
    TitleSectionComponent,
    ArticleModalComponent,
    TruncatePipe,
    RouterLink,
  ],
  templateUrl: './landing-page3.component.html',
  styleUrl: './landing-page3.component.scss',
})
export class LandingPage3Component implements OnInit {
  private loginService = inject(LoginService);
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;
  protected recursosService = inject(ResourceService);

  public AuthState = AuthState;
  public UserType = UserType;

  slides = [];
  data: any[] = [];
  isModalOpen = false;
  dataModal: any | undefined;
  currentIndex = 0;

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

  ngOnInit(): void {
    this.fetchSuggestions();
  }

  private fetchSuggestions(): void {
    const { pathMatch, searchKey } = {
      pathMatch: 'articles',
      searchKey: 'articulo',
    };
    this.recursosService.searchResources(searchKey, pathMatch, 3).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
        this.data = [];
      },
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  /**
   * Abre el modal para el elemento sugerido en el índice dado.
   */
  openModal(index: number): void {
    this.currentIndex = index;
    this.dataModal = this.data[this.currentIndex];
    this.isModalOpen = true;
  }
}
