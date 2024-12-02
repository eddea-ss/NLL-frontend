import { Component, effect, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  LoginService,
  EntrepreneurshipTrainingService,
  StartupEntrepreneurshipService,
} from '@v2/services';
import { AuthState, Role } from '@shared/enums';

@Component({
  selector: 'app-evaluaciones-startup',
  standalone: true,
  imports: [RouterLink],
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
  public Role = Role;

  //signal formacionEmprendedores
  formacionEmprendedores =
    this.formacionEmprendedoresService.formacionEmprendedores;

  //para startup
  startup = this.startupService.startupEmprendedores;
  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Usuario.toLowerCase()
      ) {
        this.formacionEmprendedoresService.recheckData();
        this.formacionEmprendedoresService.recheckData();
      }
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Modelo Startup y Emprendedores | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Completa tu modelo de Formación para emprendedores o startup y te ayudaremos a crecer en la region de los Lagos.',
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
