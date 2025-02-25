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
import { LoginService, MaturityModelService } from '@v2/services';
import { AuthState, Role, UserType } from '@v2/enums';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from 'chart.js/auto';
import {
  BreadcrumbsComponent,
  StepRegisterComponent,
  TitleSectionComponent,
} from '@v2/components';
import {
  EVALUACION_MADUREZ,
  capitalHumanoSections,
  estrategiaSections,
  tecnologiaSections,
  innovacionSections,
  automatizacionSections,
  industriaSections,
} from '@v2/constants';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-evaluaciones-madurez',
  standalone: true,
  imports: [
    CommonModule,

    BreadcrumbsComponent,
    StepRegisterComponent,
    TitleSectionComponent,
  ],
  templateUrl: './evaluaciones-madurez.component.html',
  styleUrls: ['./evaluaciones-madurez.component.scss'], // Corregido: 'styleUrls' en lugar de 'styleUrl'
})
export class EvaluacionesMadurezComponent implements AfterViewInit, OnInit {
  private loginService = inject(LoginService);
  protected modeloMadurezService = inject(MaturityModelService);
  private title = inject(Title);
  private meta = inject(Meta);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public UserType = UserType;
  public Role = Role;

  breadcrumbs: any[] = EVALUACION_MADUREZ;

  // Signal del ModeloMadurezService
  modeloMadurez = this.modeloMadurezService.modeloMadurez;

  //contenido para las secciones
  public capitalHumanoSections = capitalHumanoSections;
  public estrategiaSections = estrategiaSections;
  public tecnologiaSections = tecnologiaSections;
  public innovacionSections = innovacionSections;
  public automatizacionSections = automatizacionSections;
  public industriaSections = industriaSections;

  steps = [
    {
      title: 'Regístrate',
      description:
        'Ve al botón Registrarse en la barra de Navegación y selecciona registrarte como Empresa de la Región de los Lagos.',
    },
    {
      title: 'Completa tu Modelo',
      description:
        'Completa tu modelo de Maduración Tecnológica y de Formación para descubrir tu nivel en la Industria 4.0.',
    },
    {
      title: 'Descubre',
      description:
        'Descubre qué acciones debes realizar para alcanzar la madurez tecnológica. Encuentra cursos, artículos, financiamiento, entre otros.',
    },
  ];
  profileImageUrl: string =
    'https://accesos.nuevoloslagos.org/logos/default.png';

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (authState === AuthState.LoggedIn && user?.type === UserType.COMPANY) {
        this.modeloMadurezService.recheckData();

        this.setProfileImageUrl(user?.url);
        // Esperar 1 segundo antes de llamar a makeChart()
        setTimeout(() => {
          this.makeChart();
        }, 1000); // 1000 milisegundos = 1 segundo
      }
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Evalúa la Madurez Tecnológica | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Descubre cómo tu empresa puede alcanzar la madurez tecnológica. Evalúa su nivel actual y comienza a implementar cambios estratégicos hoy mismo.',
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
      const modelo = this.modeloMadurez()?.puntaje_sector;

      let dataValues = [
        this.numeroANumero(
          this.modeloMadurez()?.puntaje_por_categoria
            ?.capital_humano_y_organizacion_digital ?? 0
        ),
        this.numeroANumero(
          this.modeloMadurez()?.puntaje_por_categoria?.estrategia_y_liderazgo ??
            0
        ),
        this.numeroANumero(
          this.modeloMadurez()?.puntaje_por_categoria
            ?.tecnologia_y_gestion_de_datos ?? 0
        ),
        this.numeroANumero(
          this.modeloMadurez()?.puntaje_por_categoria
            ?.gestion_de_la_innovacion_y_conocimiento ?? 0
        ),
        this.numeroANumero(
          this.modeloMadurez()?.puntaje_por_categoria
            ?.procesos_y_automatizacion ?? 0
        ),
      ];

      // Definir las etiquetas correspondientes a cada eje del radar
      const labels = [
        'Capital Humano',
        'Estrategia',
        'Tecnología',
        'Gestión de Innovación',
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

  numeroALetra(valor: number | null | undefined): string {
    if (typeof valor !== 'number' || isNaN(valor) || valor === undefined) {
      return 'No completado';
    }
    if (valor < 0 || valor > 100) {
      return 'Valor incorrecto';
    }
    if (valor >= 81) {
      return 'A';
    } else if (valor >= 61) {
      return 'B';
    } else if (valor >= 41) {
      return 'C';
    } else if (valor >= 21) {
      return 'D';
    } else {
      return 'E';
    }
  }

  numeroANumero(valor: number | null | undefined): number {
    if (typeof valor !== 'number' || isNaN(valor) || valor === undefined) {
      return 0;
    }
    if (valor < 0 || valor > 100) {
      return 0;
    }
    if (valor >= 81) {
      return 5;
    } else if (valor >= 61) {
      return 4;
    } else if (valor >= 41) {
      return 3;
    } else if (valor >= 21) {
      return 2;
    } else {
      return 1;
    }
  }

  todasLasEncuestasCompletadas(): boolean {
    const modelo = this.modeloMadurez();
    if (!modelo) return false;
    
    return (
      modelo.puntaje_general !== null &&
      modelo.puntaje_sector !== null &&
      modelo.respuestas_formacion !== null &&
      modelo.respuestas_proveedor !== null
    );
  }

  setProfileImageUrl(userImageUrl: string | undefined | null): void {
    if (userImageUrl) {
      this.profileImageUrl = `https://accesos.nuevoloslagos.org/logos/${userImageUrl}`;
    } else {
      this.profileImageUrl =
        'https://accesos.nuevoloslagos.org/logos/default.png';
    }
  }

  getRutMd5(): string {
    const rut = this.currentUser()?.rut;
    if (!rut) return '';
    return Md5.hashStr(rut);
  }
}
