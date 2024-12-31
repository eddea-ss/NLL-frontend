import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  LoginService,
  CharacterizationModelService,
  RecordsService,
} from '@v2/services';
import { AuthState, Role } from '@v2/enums';
import { EVALUACION_PROVEEDORES } from '@v2/constants';
import {
  BreadcrumbsComponent,
  StepRegisterComponent,
  TitleSectionComponent,
} from '@v2/components';
import {
  surveyJsonA,
  surveyJsonB,
  surveyJsonC,
  surveyJsonD,
  surveyJsonE,
} from '@v2/constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-evaluaciones-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    TitleSectionComponent,
    StepRegisterComponent,
    RouterLink,
  ],
  templateUrl: './evaluaciones-proveedor.component.html',
  styleUrl: './evaluaciones-proveedor.component.scss',
})
export class EvaluacionesProveedorComponent implements OnInit {
  private loginService = inject(LoginService);
  //private modeloCaracterService = inject(CharacterizationModelService);
  private recordsService = inject(RecordsService);

  private title = inject(Title);
  private meta = inject(Meta);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;
  supplierSurvey = this.recordsService.supplierSurvey;

  public AuthState = AuthState;
  public Role = Role;

  breadcrumbs: any[] = EVALUACION_PROVEEDORES;

  titlesSurvey: string[] = [
    surveyJsonA.title,
    surveyJsonB.title,
    surveyJsonC.title,
    surveyJsonD.title,
    surveyJsonE.title,
  ];

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
  //modeloCaracter = this.modeloCaracterService.modeloCaracter;

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      this.recordsService.recheckData();
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Caracterización de Proveedores | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Define tu modelo de Caracterización de Proveedores y descubre cómo conectarte con clientes de tu región. Da el siguiente paso y amplía tus oportunidades de negocio.',
    });
  }

  openLink(): void {}

  getSurveyData(index: number): boolean {
    const key: string = 'part' + index;
    switch (key) {
      case 'part1':
        return this.supplierSurvey().part1 === true;
      case 'part2':
        return this.supplierSurvey().part2 === true;
      case 'part3':
        return this.supplierSurvey().part3 === true;
      case 'part4':
        return this.supplierSurvey().part4 === true;
      case 'part5':
        return this.supplierSurvey().part5 === true;
      default:
        return true;
    }
  }
}
