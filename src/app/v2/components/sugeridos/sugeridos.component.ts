import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoginService,
  MaturityModelService,
  RecordsService,
  ResourceService,
} from '@v2/services';
import { AuthState, Role } from '@v2/enums';
import {
  CourseItemComponent,
  ProjectsModalComponent,
  StartupModalComponent,
  StartupItemComponent,
  FinancingModalComponent,
  ProjectsItemComponent,
  CourseModalComponent,
  ArticleItemComponent,
  ArticleModalComponent,
  SupplierItemComponent,
  SupplierModalComponent,
  FinancingItemComponent,
} from '@v2/components';

@Component({
  selector: 'app-sugeridos',
  standalone: true,
  imports: [
    CommonModule,
    CourseItemComponent,
    CourseModalComponent,
    ArticleItemComponent,
    ArticleModalComponent,
    SupplierItemComponent,
    SupplierModalComponent,
    FinancingItemComponent,
    FinancingModalComponent,
    ProjectsItemComponent,
    ProjectsModalComponent,
    StartupItemComponent,
    StartupModalComponent,
  ],
  templateUrl: './sugeridos.component.html',
  styleUrls: ['./sugeridos.component.scss'],
})
export class SugeridosComponent implements OnInit {
  // Inyecciones de dependencias
  private route = inject(ActivatedRoute);
  private recursosService = inject(ResourceService);
  private loginService = inject(LoginService);
  private modeloMadurezService = inject(MaturityModelService);
  private modeloCaracterService = inject(RecordsService);

  // Observables y valores
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  // Enums a exponer en plantilla
  public AuthState = AuthState;
  public Role = Role;

  // Datos del modelo (caracterización y madurez)
  modeloMadurez = this.modeloMadurezService.modeloMadurez;
  modeloCaracter = this.modeloCaracterService.supplierSurvey;

  // Resultados sugeridos
  sugeridos: any[] = [];

  // Ruta actual
  ruta: string | undefined;

  // Modal
  isModalOpen = false;
  dataModal: any | undefined;
  currentIndex = 0;

  // Mapas de correspondencia para rutas y claves de búsqueda
  private paths: Record<string, string> = {
    'buscador-proveedores': 'suppliers',
    'buscador-cursos': 'curses',
    'buscador-articulos': 'articles',
  };

  private key: Record<string, string> = {
    'buscador-proveedores': 'sí',
    'buscador-cursos': '2024',
    'buscador-articulos': 'articulo',
  };

  constructor() {
    // Efectos sobre los modelos cuando cambien
    effect(() => {
      this.modeloMadurezService.recheckData();
      this.modeloCaracterService.recheckData();
    });
  }

  ngOnInit(): void {
    // Suscripción a cambios en la ruta
    this.route.url.subscribe((segments) => {
      const rutaActual = segments[0]?.path;
      if (rutaActual) {
        this.ruta = rutaActual;
        this.fetchSuggestions(rutaActual);
      }
    });
  }

  /**
   * Obtiene pathMatch y searchKey según la ruta actual y el estado del usuario.
   */
  private getRouteConfig(ruta: string): {
    pathMatch: string;
    searchKey: string;
  } {
    // Si la ruta existe en el map 'paths' y 'key', utilízalos, si no usa defaults
    const defaultRoute = 'buscador-articulos'; // Ruta por defecto
    let pathMatch = this.paths[ruta] || this.paths[defaultRoute];
    let searchKey = this.key[ruta] || this.key[defaultRoute];

    //
    if (!this.modeloCaracter()) {
      pathMatch = this.paths[defaultRoute];
      searchKey = this.key[defaultRoute];
    }
    if (!this.modeloCaracter()) {
      pathMatch = this.paths[defaultRoute];
      searchKey = this.key[defaultRoute];
    }

    // Si el usuario está logueado y la ruta es cursos o proveedores,
    // y se dispone de datos del modelo, usar IndustryName del modelo.
    const isLoggedIn = this.authState() === AuthState.LoggedIn;
    const hasModelData = this.modeloMadurez() || this.modeloCaracter();
    const isCourseOrSupplier =
      ruta === 'buscador-cursos' || ruta === 'buscador-proveedores';

    if (isLoggedIn && isCourseOrSupplier && hasModelData) {
      const industryName = this.currentUser()?.sector;
      if (industryName) {
        searchKey = industryName;
      }
    }

    return { pathMatch, searchKey };
  }

  /**
   * Realiza la búsqueda de sugerencias con base en la ruta.
   */
  private fetchSuggestions(ruta: string): void {
    const { pathMatch, searchKey } = this.getRouteConfig(ruta);

    this.recursosService.searchResources(searchKey, pathMatch).subscribe({
      next: (data) => {
        this.sugeridos = data;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
        this.sugeridos = [];
      },
    });
  }

  /**
   * Cierra el modal.
   */
  closeModal(): void {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  /**
   * Abre el modal para el elemento sugerido en el índice dado.
   */
  openModal(index: number): void {
    this.currentIndex = index;
    this.dataModal = this.sugeridos[this.currentIndex];
    this.isModalOpen = true;
  }
}
