import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { LoginService, ModeloMadurezService } from '@core/services';
import { AuthState, Role } from '@shared/enums';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';

@Component({
  selector: 'app-evaluaciones-madurez',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluaciones-madurez.component.html',
  styleUrl: './evaluaciones-madurez.component.scss',
})
export class EvaluacionesMadurezComponent implements AfterViewInit {
  private loginService = inject(LoginService);
  private modeloMadurezService = inject(ModeloMadurezService);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  // Signal del ModeloMadurezService
  modeloMadurez = this.modeloMadurezService.modeloMadurez;

  // Contenido para las secciones de Capital Humano
  public capitalHumanoSections: string[] = [
    'Lorem Epson Lorem Epson Lorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem Epso',
    'Lorem Epson Lorem Epson Lorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem Epso',
    'Lorem Epson Lorem Epson Lorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem EpsonLorem Epso',
  ];

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      console.log(authState, user);

      console.log(user?.rol.nombreRol, Role.Empresa);
      console.log(
        authState === AuthState.LoggedIn,
        authState,
        AuthState.LoggedIn
      );
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Empresa
      ) {
        // El usuario está logueado y su rol es 'empresa'
        // Pedir al ModeloMadurezService que actualice los valores
        console.log('recheckData');
        this.modeloMadurezService.recheckData();
      }
    });
  }
  @ViewChild('radarChartCanvas')
  radarChartCanvas!: ElementRef<HTMLCanvasElement>;

  public radarChartData: ChartData<'radar'> = {
    labels: [
      'Capital Humano',
      'Estrategia',
      'Tecnología',
      'Gestión de Innovación',
      'Industria',
      'Automatización',
    ],
    datasets: [
      {
        label: 'Resultados',
        data: [1, 2, 3, 2, 1, 2],
        fill: true,
        backgroundColor: 'rgba(33, 150, 243, 0.6)',
        borderColor: '#2196F3',
        pointBackgroundColor: '#2196F3',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2196F3',
      },
    ],
  };

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  ngAfterViewInit(): void {
    const ctx = this.radarChartCanvas.nativeElement;

    new Chart(ctx, {
      type: 'radar',
      data: this.radarChartData,
      options: this.radarChartOptions,
    });
  }

  openLink(): void {
    this.modeloMadurezService.openLink();
  }
}
