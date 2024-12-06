import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LoginService, CharacterizationModelService } from '@v2/services';
import { AuthState, Role } from '@shared/enums';
import { EVALUACION_PROVEEDORES } from '@v2/constants';
import {
  BreadcrumbsComponent,
  StepRegisterComponent,
  TitleSectionComponent,
} from '@v2/components';

@Component({
  selector: 'app-evaluaciones-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BreadcrumbsComponent,
    TitleSectionComponent,
    StepRegisterComponent,
  ],
  templateUrl: './evaluaciones-proveedor.component.html',
  styleUrl: './evaluaciones-proveedor.component.scss',
})
export class EvaluacionesProveedorComponent implements OnInit {
  private loginService = inject(LoginService);
  private modeloCaracterService = inject(CharacterizationModelService);
  private title = inject(Title);
  private meta = inject(Meta);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  breadcrumbs: any[] = EVALUACION_PROVEEDORES;

  steps = [
    {
      title: 'Regístrate',
      description:
        'Haz clic en el botón Registrarse en la barra de navegación y selecciona la opción Proveedor para la Región de los Lagos. ¡Empieza ahora y conéctate con clientes de tu región!',
    },
    {
      title: 'Completa tu Modelo',
      description:
        'Completa tu modelo de Caracterización de Proveedores y comparte los datos necesarios para que podamos conectarte con clientes de tu región. ¡Empieza ahora y abre la puerta a nuevas oportunidades!',
    },
    {
      title: 'Descubre',
      description:
        'Descubre las acciones clave para promoverte en la Región de los Lagos. Accede a cursos, artículos, opciones de financiamiento y muchos otros recursos informativos diseñados para tu éxito. ¡Empieza hoy mismo y lleva tu negocio al siguiente nivel!',
    },
  ];

  // Signal del ModeloMadurezService
  modeloCaracter = this.modeloCaracterService.modeloCaracter;

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Proveedor.toLowerCase()
      ) {
        this.modeloCaracterService.recheckData();
      }
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Modelo Caracterización | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Completa tu modelo de Caracterización de Proveedores y ayúdanos a identificar cómo podemos conectarte con clientes de tu región. Da el siguiente paso hacia nuevas oportunidades.',
    });
  }

  openLink(): void {
    this.modeloCaracterService.openLink();
  }
}
