import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LoginService, MaturityModelService } from '@v2/services';
import { AuthState, Role } from '@shared/enums';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from 'chart.js/auto';
import { BreadcrumbsComponent } from '@v2/components';
import {
  EVALUACION_MADUREZ,
  capitalHumanoSections,
  estrategiaSections,
  tecnologiaSections,
  innovacionSections,
  automatizacionSections,
  industriaSections,
} from '@v2/constants';

@Component({
  selector: 'app-evaluaciones-madurez',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './evaluaciones-madurez.component.html',
  styleUrls: ['./evaluaciones-madurez.component.scss'], // Corregido: 'styleUrls' en lugar de 'styleUrl'
})
export class EvaluacionesMadurezComponent implements AfterViewInit, OnInit {
  private loginService = inject(LoginService);
  private modeloMadurezService = inject(MaturityModelService);
  private title = inject(Title);
  private meta = inject(Meta);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  breadcrumbs: any[] = EVALUACION_MADUREZ;

  // Signal del ModeloMadurezService
  modeloMadurez = this.modeloMadurezService.modeloMadurez;
  modeloFormacion = this.modeloMadurezService.modeloFormacion;

  //contenido para las secciones
  public capitalHumanoSections = capitalHumanoSections;
  public estrategiaSections = estrategiaSections;
  public tecnologiaSections = tecnologiaSections;
  public innovacionSections = innovacionSections;
  public automatizacionSections = automatizacionSections;
  public industriaSections = industriaSections;

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Empresa.toLowerCase()
      ) {
        this.modeloMadurezService.recheckData();
        // Esperar 1 segundo antes de llamar a makeChart()
        setTimeout(() => {
          this.makeChart();
        }, 1000); // 1000 milisegundos = 1 segundo
      }
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Modelo Madurez | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Evalua el nivel de madurez tecnológica de tu empresa y conoce que acciones debes realizar para alcanzar la madurez tecnológica.',
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
        data: [0, 0, 0, 0, 0, 0],
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

  // Tipado corregido
  public radarChartOptions: ChartOptions<'radar'> = {
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
    // Si deseas inicializar el gráfico aquí, puedes hacerlo
    // this.makeChart();
  }

  makeChart(): void {
    try {
      const ctx = this.radarChartCanvas.nativeElement.getContext('2d');
      if (!ctx) throw new Error('Contexto de Canvas no disponible');

      const modelo = this.modeloMadurez()![0];

      // Convertir las letras a números según la lógica definida
      const dataValues = [
        this.letterToNumberDescASCII(modelo.GradeCapitalHumano),
        this.letterToNumberDescASCII(modelo.GradeEstrategiaLiderazgo),
        this.letterToNumberDescASCII(modelo.GradeTecnologiaGestionDatos),
        this.letterToNumberDescASCII(modelo.GradeGestionInnovacionConocimiento),
        this.letterToNumberDescASCII(modelo.TotalIndustryGrade),
        this.letterToNumberDescASCII(modelo.GradeProcesosAutomatizacion),
      ];

      // Definir las etiquetas correspondientes a cada eje del radar
      const labels = [
        'Capital Humano',
        'Estrategia',
        'Tecnología',
        'Gestión de Innovación',
        'Industria',
        'Automatización',
      ];

      const chartData: ChartData<'radar', number[], string> = {
        labels: labels,
        datasets: [
          {
            label: 'Nivel de Madurez',
            data: dataValues,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      };

      const config: ChartConfiguration<'radar'> = {
        type: 'radar',
        data: chartData,
        options: this.radarChartOptions,
      };

      // Crear o actualizar el gráfico
      new Chart(ctx, config);
    } catch (err) {
      console.warn('Error al crear el gráfico radar:', err);
    }
  }

  /**
   * Convierte una letra de la 'a' a la 'e' (mayúscula o minúscula) en su número correspondiente.
   * 'a' o 'A' => 5
   * 'b' o 'B' => 4
   * 'c' o 'C' => 3
   * 'd' o 'D' => 2
   * 'e' o 'E' => 1
   *
   * @param letter - La letra a convertir.
   * @returns El número correspondiente o 0 si la letra no es válida.
   */
  letterToNumberDescASCII(letter: string): number {
    if (letter.length !== 1) return 0;

    const lowerLetter = letter.toLowerCase();
    const asciiCode = lowerLetter.charCodeAt(0);

    // 'a' = 97, 'e' = 101
    if (asciiCode >= 97 && asciiCode <= 101) {
      // 'a' a 'e'
      return 6 - (asciiCode - 96); // 'a' => 5, 'b' => 4, ..., 'e' =>1
    }

    return 0;
  }

  openLink(): void {
    this.modeloMadurezService.openLink();
  }

  openLinkFormacion(): void {
    this.modeloMadurezService.openLinkFormacion();
  }
}
