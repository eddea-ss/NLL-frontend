import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoginService,
  ModeloCaracterService,
  ModeloMadurezService,
  RecursosService,
} from '@core/services';
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
  private recursosService = inject(RecursosService);
  private loginService = inject(LoginService);
  private modeloMadurezService = inject(ModeloMadurezService);
  private modeloCaracterService = inject(ModeloCaracterService);

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

        if (!pathMatch) {
          const pathKeys = Object.keys(this.paths);
          const randomKey = pathKeys[2]; //para articulos por default
          pathMatch = this.paths[randomKey];
          searchPath = this.key[randomKey];
        }

        // Sugerencias para empresas en cursos y proveedores
        if (
          this.authState() === AuthState.LoggedIn &&
          this.ruta &&
          (this.ruta === 'buscador-cursos' ||
            this.ruta === 'buscador-proveedores')
        ) {
          if (
            this.currentUser()?.rol?.nombreRol === Role.Empresa &&
            this.modeloMadurez()
          ) {
            searchPath = this.modeloMadurez()![0].IndustryName ?? '';
          }
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

  getDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'URL inválida';
    }
  }
  getPublicationYear(fecha_publicacion: string): number {
    return this.convertToDate(fecha_publicacion).getFullYear();
  }

  convertToDate(dateString: string): Date {
    if (dateString.length !== 8) {
      console.warn(`Formato de fecha inesperado: ${dateString}`);
      return new Date(0); // Fecha por defecto
    }
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  }
  sanitizedResumen(resumen: string): string {
    return DOMPurify.sanitize(resumen);
  }
  openLink(link: string): void {
    try {
      if (!link) {
        console.warn('No se proporcionó un link');
        return;
      }

      // Verifica si el enlace incluye 'http://' o 'https://'
      if (!/^https?:\/\//i.test(link)) {
        link = 'https://' + link; // Puedes usar 'http://' si lo prefieres
      }

      window.open(link, '_blank');
    } catch (error) {
      console.error('Error al abrir el link:', error);
    }
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

  downloadInfo(link: string): void {
    try {
      if (!link) {
        console.warn('No se proporcionó un link');
        return;
      }
      const urlExcel = 'https://control.nuevoloslagos.org/suppliers/excel/';

      window.open(urlExcel + link, '_blank');
    } catch (error) {
      console.error('Error al abrir el link:', error);
    }
  }
}
