import { Component, effect, inject, OnInit } from '@angular/core';
import {
  ArticleModalComponent,
  ExtrasComponent,
  TitleSectionComponent,
  CourseModalComponent,
  ProjectsModalComponent,
  FinancingModalComponent,
} from '@v2/components';
import { PatrocinadoresComponent, FooterComponent } from '@v2/components';
import { LoginService, ResourceService } from '@v2/services';
import { AuthState, UserType } from '@v2/enums';
import { TruncatePipe } from '@v2/pipes';
import { RouterLink, Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

type ContentType = 'articles' | 'courses' | 'projects' | 'financing';

@Component({
  selector: 'app-landing-page3',
  standalone: true,
  imports: [
    ExtrasComponent,
    PatrocinadoresComponent,
    FooterComponent,
    TitleSectionComponent,
    ArticleModalComponent,
    CourseModalComponent,
    ProjectsModalComponent,
    FinancingModalComponent,
    TruncatePipe,
    RouterLink,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './landing-page3.component.html',
  styleUrl: './landing-page3.component.scss',
})
export class LandingPage3Component implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;
  protected recursosService = inject(ResourceService);

  public AuthState = AuthState;
  public UserType = UserType;

  // Contenido destacado
  articles: any[] = [];
  courses: any[] = [];
  projects: any[] = [];
  financing: any[] = [];
  activeTab: ContentType = 'articles';
  
  isModalOpen = false;
  dataModal: any | undefined;
  currentIndex = 0;
  modalType: ContentType = 'articles';

  titleSection = {
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    imageSrc: 'assets/hero.webp',
    imageAlt: 'mockup',
  };

  tabs: { id: ContentType; label: string; route: string }[] = [
    { id: 'articles', label: 'Artículos', route: '/buscador/articulos' },
    { id: 'courses', label: 'Cursos', route: '/buscador/cursos' },
    { id: 'projects', label: 'Proyectos', route: '/buscador/proyectos' },
    { id: 'financing', label: 'Financiamiento', route: '/buscador/financiamiento' },
  ];

  // Nueva propiedad para almacenar la ruta activa
  currentTabRoute = '/buscador/articulos';
  
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
    this.fetchAllContent();
    this.updateCurrentTabRoute();
  }

  private fetchAllContent(): void {
    this.fetchArticles();
    this.fetchCourses();
    this.fetchProjects();
    this.fetchFinancing();
  }

  private fetchArticles(): void {
    const { pathMatch, searchKey } = {
      pathMatch: 'articles',
      searchKey: 'articulo',
    };
    this.recursosService.searchResources(searchKey, pathMatch, 6).subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => {
        console.error('Error al obtener los artículos:', error);
        this.articles = [];
      },
    });
  }

  private fetchCourses(): void {
    const { pathMatch, searchKey } = {
      pathMatch: 'curses',
      searchKey: 'curso',
    };
    this.recursosService.searchResources(searchKey, pathMatch, 6).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        this.courses = [];
      },
    });
  }

  private fetchProjects(): void {
    const { pathMatch, searchKey } = {
      pathMatch: 'projects',
      searchKey: 'proyecto',
    };
    this.recursosService.searchResources(searchKey, pathMatch, 6).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error al obtener los proyectos:', error);
        this.projects = [];
      },
    });
  }

  private fetchFinancing(): void {
    const { pathMatch, searchKey } = {
      pathMatch: 'financing',
      searchKey: 'financiamiento',
    };
    this.recursosService.searchResources(searchKey, pathMatch, 6).subscribe({
      next: (data) => {
        this.financing = data;
      },
      error: (error) => {
        console.error('Error al obtener el financiamiento:', error);
        this.financing = [];
      },
    });
  }

  setActiveTab(tab: ContentType): void {
    this.activeTab = tab;
    this.updateCurrentTabRoute();
  }

  updateCurrentTabRoute(): void {
    const activeTabObj = this.tabs.find(tab => tab.id === this.activeTab);
    if (activeTabObj) {
      this.currentTabRoute = activeTabObj.route;
    } else {
      this.currentTabRoute = '#';
    }
  }

  getActiveContent(): any[] {
    switch (this.activeTab) {
      case 'articles':
        return this.articles;
      case 'courses':
        return this.courses;
      case 'projects':
        return this.projects;
      case 'financing':
        return this.financing;
      default:
        return [];
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  openModal(index: number, type: ContentType): void {
    this.modalType = type;
    this.currentIndex = index;
    const items = this.getActiveContent();
    this.dataModal = items[this.currentIndex];
    this.isModalOpen = true;
  }

  showNextItem(): void {
    const items = this.getActiveContent();
    if (items.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % items.length;
    this.openModal(this.currentIndex, this.modalType);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
