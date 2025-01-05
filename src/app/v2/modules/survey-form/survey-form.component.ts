import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Model, StylesManager, settings, surveyStrings } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import {
  surveyJsonA,
  surveyJsonB,
  surveyJsonC,
  surveyJsonD,
  surveyJsonE,
} from '@v2/constants';
import { LoginService, RecordsService, SnackbarService } from '@v2/services';

import 'survey-core/modern.min.css';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, SurveyModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyFormComponent implements OnInit {
  survey!: Model;
  part!: number;
  rutMd5!: string;

  private recordsService = inject(RecordsService);
  private loginService = inject(LoginService);
  private routeActivate = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

  currentUser = this.loginService.currentUser;

  ngOnInit(): void {
    surveyStrings.pageNextText = 'Ir al Siguiente';
    surveyStrings.pagePrevText = 'Volver Atrás';
    surveyStrings.completeText = 'Enviar Encuesta';

    this.routeActivate.paramMap.subscribe((params) => {
      const partParam = params.get('part');
      this.part = partParam ? parseInt(partParam, 10) : 1;

      switch (this.part) {
        case 1:
          this.survey = new Model(surveyJsonA);
          break;
        case 2:
          this.survey = new Model(surveyJsonB);
          break;
        case 3:
          this.survey = new Model(surveyJsonC);
          break;
        case 4:
          this.survey = new Model(surveyJsonD);
          break;
        case 5:
          this.survey = new Model(surveyJsonE);
          break;
        default:
          this.router.navigate(['/']);
      }

      // Configuración de la barra de progreso
      this.survey.progressBarType = 'pages'; // También puedes usar 'questions' o 'requiredQuestions'.
      this.survey.completedHtml =
        "Gracias por completar la encuesta, haz click en el botón 'Enviar' para terminar.";

      this.survey.showCompletedPage = false; // Evita mostrar la pantalla final

      // Dispara automáticamente tu método onSubmit() al completar:
      this.survey.onComplete.add(() => {
        this.onSubmit();
      });
      this.survey.onCurrentPageChanged.add((sender) => {
        // Mueve el scroll al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rut) {
      const rutOriginal = currentUser.rut;
      this.rutMd5 = this.loginService.stringToHash(rutOriginal);
    } else {
      this.snackbar.show('Usuario no autenticado o sin RUT.', 4000);
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.survey.state === 'completed') {
      const data = this.survey.data;
      const part = this.part;
      const rut = this.rutMd5;

      this.recordsService.createRecord(rut, part, data).subscribe({
        next: (response) => {
          this.snackbar.show('Respuestas contestadas correctamente', 6000);
          this.router.navigate(['/evaluaciones-proveedor']);
        },
        error: (err) => {
          console.error('Error al enviar datos:', err);
          this.snackbar.show('Error al enviar datos: ' + err.message, 4000);
        },
      });
    } else {
      this.survey.completeLastPage();
      if (this.survey.state !== 'completed') {
        this.snackbar.show(
          'Por favor, complete todas las preguntas requeridas antes de enviar.',
          4000
        );
      }
    }
  }
}
