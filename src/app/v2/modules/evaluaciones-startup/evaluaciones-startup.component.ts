import { Component, effect, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  LoginService,
  EntrepreneurshipTrainingService,
  StartupEntrepreneurshipService,
} from '@v2/services';
import { AuthState, Role, UserType } from '@v2/enums';
import { BreadcrumbsComponent } from '@v2/components';
import { EVALUACION_STARTUP } from '@v2/constants';
import { StepRegisterComponent } from '../../components/step-register/step-register.component';
import { TitleSectionComponent } from '../../components/title-section/title-section.component';

@Component({
  selector: 'app-evaluaciones-startup',
  standalone: true,
  imports: [BreadcrumbsComponent, StepRegisterComponent, TitleSectionComponent],
  templateUrl: './evaluaciones-startup.component.html',
  styleUrl: './evaluaciones-startup.component.scss',
})
export class EvaluacionesStartupComponent implements OnInit {
  private loginService = inject(LoginService);
  private formacionEmprendedoresService = inject(
    EntrepreneurshipTrainingService
  );
  private startupService = inject(StartupEntrepreneurshipService);
  private title = inject(Title);
  private meta = inject(Meta);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public UserType = UserType;
  public Role = Role;

  breadcrumbs: any[] = EVALUACION_STARTUP;

  steps = [
    {
      title: 'Regístrate',
      description:
        'Haz clic en el botón Registrarse en la barra de navegación y selecciona la opción Cuenta Startup o Emprendedor. ¡Empieza ahora y conéctate con la región!',
    },
    {
      title: 'Completa tu Modelo',
      description:
        'Completa tu modelo de Formación para emprendedores y comparte los datos necesarios para que podamos conectarte con la región. ¡Empieza ahora y abre la puerta a nuevas oportunidades!',
    },
    {
      title: 'Descubre',
      description:
        ' Descubre las acciones clave para promoverte en la Región de los Lagos. Accede a cursos, artículos, opciones de financiamiento y muchos otros recursos informativos diseñados para tu éxito. ¡Empieza hoy mismo y lleva tu negocio al siguiente nivel!',
    },
  ];

  //signal formacionEmprendedores
  formacionEmprendedores =
    this.formacionEmprendedoresService.formacionEmprendedores;

  //para startup
  startup = this.startupService.startupEmprendedores;
  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (authState === AuthState.LoggedIn && user?.type === UserType.STARTUP) {
        this.formacionEmprendedoresService.recheckData();
        this.formacionEmprendedoresService.recheckData();
      }
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle(
      'Formación para Startups y Emprendedores | Nuevo Los Lagos'
    );
    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Desarrolla tu modelo de Formación para startups y emprendedores. Te ayudamos a crecer y destacar en la región de Los Lagos. Da el siguiente paso hacia el éxito.',
    });
  }

  openLink(): void {
    this.formacionEmprendedoresService.openLink();
  }

  openLinkStartup(): void {
    this.startupService.openLink('STARTUP');
  }

  openLinkEmprendimiento(): void {
    this.startupService.openLink('EMPRENDIMIENTO');
  }
}
