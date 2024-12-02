import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoginService,
  CharacterizationModelService,
  MaturityModelService,
  ResourceService,
} from '@v2/services';
import { AuthState, Role } from '@shared/enums';
import DOMPurify from 'dompurify';

import { CourseItemComponent } from '@v2/components/course-item/course-item.component';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { ArticleItemComponent } from '../article-item/article-item.component';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { SupplierItemComponent } from '../supplier-item/supplier-item.component';
import { SupplierModalComponent } from '../supplier-modal/supplier-modal.component';
import { FinancingItemComponent } from '../financing-item/financing-item.component';
import { FinancingModalComponent } from '../financing-modal/financing-modal.component';
import { ProjectsItemComponent } from '../projects-item/projects-item.component';
import { ProjectsModalComponent } from '../projects-modal/projects-modal.component';
import { StartupItemComponent } from '../startup-item/startup-item.component';
import { StartupModalComponent } from '../startup-modal/startup-modal.component';

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
  styleUrl: './sugeridos.component.scss',
})
export class SugeridosComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recursosService = inject(ResourceService);
  private loginService = inject(LoginService);
  private modeloMadurezService = inject(MaturityModelService);
  private modeloCaracterService = inject(CharacterizationModelService);

  modeloMadurez = this.modeloMadurezService.modeloMadurez;
  modeloCaracter = this.modeloCaracterService.modeloCaracter;

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  sugeridos: any[] = [];

  ruta: string | undefined;
  isModalOpen = false;
  dataModal: any | undefined;
  currentIndex = 0;

  paths: Record<string, string> = {
    'buscador-proveedores': 'suppliers',
    'buscador-cursos': 'curses',
    'buscador-articulos': 'articles',
  };

  key: Record<string, string> = {
    'buscador-proveedores': 'sí',
    'buscador-cursos': '2024',
    'buscador-articulos': 'articulo',
  };

  constructor() {
    effect(() => {
      this.modeloMadurezService.recheckData();
      this.modeloCaracterService.recheckData();
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const rutaActual = segments[0]?.path;
      if (rutaActual) {
        this.ruta = rutaActual;
        let pathMatch = this.paths[this.ruta];
        let searchPath = this.getSearchKey();

        //para articulos por default
        const pathKeys = Object.keys(this.paths);
        const randomKey = pathKeys[2];

        if (!pathMatch) {
          pathMatch = this.paths[randomKey];
          searchPath = this.key[randomKey];
        }

        // Sugerencias para empresas en cursos y proveedores
        if (
          this.authState() === AuthState.LoggedIn &&
          this.ruta &&
          (this.ruta === 'buscador-cursos' ||
            this.ruta === 'buscador-proveedores') &&
          (this.modeloMadurez() || this.modeloCaracter())
        ) {
          searchPath = this.modeloMadurez()![0].IndustryName ?? searchPath;
        } else {
          pathMatch = this.paths[randomKey];
          searchPath = this.key[randomKey];
        }

        // Continuamos con la lógica de búsqueda utilizando 'pathMatch'
        this.recursosService.searchResources(searchPath, pathMatch).subscribe({
          next: (data) => {
            this.sugeridos = data;
          },
          error: (error) => {
            console.error('Error al obtener los datos:', error);
          },
        });
      }
    });
  }

  getSearchKey(): string {
    let value = '';

    if (this.ruta) {
      const pathMatch = this.key[this.ruta];
      if (pathMatch) {
        return pathMatch;
      }
    }
    return value;
  }

  closeModal() {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  openModal(index: number): void {
    this.currentIndex = index;
    const item = this.sugeridos[this.currentIndex];
    this.isModalOpen = true;
    this.dataModal = item;
  }
}
