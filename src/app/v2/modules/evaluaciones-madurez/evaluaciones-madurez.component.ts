import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService, ModeloMadurezService } from '@core/services';
import { AuthState, Role } from '@shared/enums';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from 'chart.js/auto';

@Component({
  selector: 'app-evaluaciones-madurez',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evaluaciones-madurez.component.html',
  styleUrls: ['./evaluaciones-madurez.component.scss'], // Corregido: 'styleUrls' en lugar de 'styleUrl'
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
  modeloFormacion = this.modeloMadurezService.modeloFormacion;

  public capitalHumanoSections = [
    {
      estado: '',
      sugerencia: '',
    },
    {
      estado:
        'Tu empresa aún no cuenta con planes estructurados para el desarrollo digital del equipo. Prioriza la creación de un programa básico de formación.',
      sugerencia:
        'Comienza con talleres introductorios sobre competencias digitales.',
    },
    {
      estado:
        'Se están considerando planes para el desarrollo de habilidades digitales, pero aún no están implementados. Identifica áreas clave de mejora en la fuerza laboral.',
      sugerencia:
        'Realiza encuestas para determinar las necesidades formativas de tu equipo.',
    },
    {
      estado:
        'Tu organización ha comenzado a implementar iniciativas básicas de formación digital. Trabaja en un enfoque más integral para cubrir las habilidades avanzadas.',
      sugerencia:
        'Invierte en cursos especializados en tecnologías emergentes.',
    },
    {
      estado:
        'Un plan integral está en marcha, lo cual es un excelente avance. Asegúrate de mantenerlo actualizado con las últimas tendencias del mercado.',
      sugerencia:
        'Incluye métricas claras para evaluar el impacto de la capacitación.',
    },
    {
      estado:
        'Tu organización sobresale en la capacitación y estructura digital. Sigue liderando la innovación promoviendo el aprendizaje continuo y la adaptación.',
      sugerencia:
        'Comparte tu éxito organizacional en foros de la industria para ser referente.',
    },
  ];

  // Contenido para las secciones de Estrategia y Liderazgo
  public estrategiaSections = [
    {
      estado: '',
      sugerencia: '',
    },
    {
      estado:
        'Tu organización está en una etapa inicial en la definición de su estrategia digital. Es esencial comenzar por identificar objetivos clave y explorar ejemplos de estrategias exitosas en la industria para inspirar un plan inicial.',
      sugerencia:
        'Realiza talleres internos para discutir y priorizar la digitalización.',
    },
    {
      estado:
        'Se han dado los primeros pasos hacia una estrategia digital, pero aún falta consolidarla. Es un buen momento para establecer un equipo que lidere esta iniciativa y formalice un plan.',
      sugerencia:
        'Realiza un análisis de fortalezas y oportunidades en la integración de tecnologías digitales.',
    },
    {
      estado:
        'Tu organización tiene una estrategia digital parcialmente definida. Para avanzar, enfócate en alinear esta estrategia con las metas de negocio e incorporar indicadores de seguimiento.',
      sugerencia:
        'Implementa revisiones regulares para medir el impacto de la estrategia.',
    },
    {
      estado:
        'Ya cuentas con una estrategia digital clara y priorizada. Considera profundizar en la implementación de tecnologías clave para maximizar los beneficios.',
      sugerencia:
        'Fortalece alianzas estratégicas y busca capacitación avanzada para el equipo de liderazgo.',
    },
    {
      estado:
        '¡Excelente progreso! Tu organización ha implementado una estrategia digital robusta y clara. Ahora, mantén la mejora continua mediante la innovación y el monitoreo de tendencias emergentes.',
      sugerencia:
        'Establece un proceso de actualización anual de la estrategia digital.',
    },
  ];

  // Contenido para las secciones de Tecnología y Gestión de Datos
  public tecnologiaSections = [
    {
      estado: '',
      sugerencia: '',
    },
    {
      estado:
        'Tu empresa aún no ha iniciado evaluaciones sistemáticas de tecnologías habilitadoras ni estrategias de gestión de datos, lo que limita su capacidad de competir en un entorno digital avanzado. Este es un momento clave para construir una base tecnológica sólida que impulse la eficiencia y la innovación. Considera realizar un diagnóstico inicial de tus sistemas tecnológicos para identificar áreas prioritarias y explorar tecnologías avanzadas que puedan añadir valor a tus operaciones. Al implementar estas acciones, podrías aumentar la productividad, reducir costos operativos y mejorar la toma de decisiones estratégicas mediante datos confiables.',
      sugerencia:
        'Realiza un diagnóstico inicial de tus sistemas tecnológicos e identifica áreas prioritarias para la adopción de tecnologías avanzadas.',
    },
    {
      estado:
        'Tu empresa ha comenzado a considerar la evaluación de tecnologías y datos, pero aún no cuenta con una estrategia estructurada, lo que puede ralentizar el progreso hacia una integración tecnológica efectiva. Es un momento propicio para formar un equipo responsable de diseñar un plan inicial de adopción tecnológica, enfocado en áreas donde la tecnología puede generar un impacto inmediato. Con estas mejoras, podrías obtener beneficios como una mayor eficiencia operativa, un mejor control de procesos y una ventaja competitiva en el mercado.',
      sugerencia:
        'Forma un equipo responsable de diseñar un plan inicial de adopción tecnológica, enfocándote en áreas con impacto inmediato.',
    },
    {
      estado:
        'Tu empresa tiene estrategias básicas para gestionar datos y evaluar tecnologías, lo que demuestra avances iniciales, aunque aún queda margen para una integración más sólida. Es fundamental consolidar las herramientas existentes y extender su alcance a toda la organización mediante sistemas como ERP o CRM. Esta estrategia permitiría centralizar los datos, mejorar la coordinación entre equipos y facilitar decisiones más ágiles basadas en información precisa y actualizada.',
      sugerencia:
        'Consolida las herramientas existentes y extiéndelas a toda la organización mediante sistemas como ERP o CRM.',
    },
    {
      estado:
        'La tecnología y los datos están significativamente integrados en tu empresa, proporcionando una base sólida para la mejora continua. Para mantener esta ventaja competitiva, es crucial actualizar regularmente tus herramientas y estrategias tecnológicas alineándolas con las tendencias del sector. Incorporar análisis avanzados como Big Data y aprendizaje automático podría permitirte identificar nuevas oportunidades, optimizar procesos críticos y predecir tendencias del mercado con mayor precisión.',
      sugerencia:
        'Actualiza regularmente tus herramientas y estrategias tecnológicas, e incorpora análisis avanzados como Big Data y aprendizaje automático.',
    },
    {
      estado:
        '¡Felicidades! Tu empresa utiliza la tecnología y los datos como una ventaja competitiva clave, posicionándose como líder en su sector. Para mantener este liderazgo, es esencial explorar tecnologías emergentes y fortalecer las estrategias de ciberseguridad para proteger tus activos digitales. Además, capacitar a tu equipo en nuevas tecnologías asegurará que mantengas tu capacidad innovadora y aproveches oportunidades disruptivas. Estas acciones consolidarán tu posición en el mercado, atraerán nuevos clientes y reforzarán la confianza de tus stakeholders.',
      sugerencia:
        'Explora tecnologías emergentes y fortalece las estrategias de ciberseguridad para proteger tus activos digitales.',
    },
  ];

  // Contenido para las secciones de Gestión de la Innovación y Conocimiento
  public innovacionSections = [
    {
      estado: '',
      sugerencia: '',
    },
    {
      estado:
        'La innovación aún no está estructurada en tu empresa. Es momento de establecer un plan inicial para identificar oportunidades de mejora.',
      sugerencia: 'Designa un equipo encargado de gestionar la innovación.',
    },
    {
      estado:
        'Tu organización ha comenzado a trabajar en procesos básicos de innovación. Es crucial avanzar hacia una metodología estructurada.',
      sugerencia:
        'Capacita al equipo en metodologías como design thinking o lean startup.',
    },
    {
      estado:
        'Tu empresa ha estructurado parcialmente la innovación. El enfoque ahora debe ser consolidar estos procesos y promover la colaboración.',
      sugerencia:
        'Implementa herramientas de gestión de proyectos de innovación.',
    },
    {
      estado:
        'Los procesos de innovación están bien estructurados y colaborativos. Aprovecha esta base para escalar proyectos exitosos y compartir el conocimiento generado.',
      sugerencia:
        'Establece métricas claras para medir la innovación y su impacto.',
    },
    {
      estado:
        'Tu empresa es líder en innovación, con sistemas optimizados y procesos avanzados. Asegúrate de mantener esta posición mediante la búsqueda de nuevas oportunidades disruptivas.',
      sugerencia:
        'Explora alianzas internacionales para desarrollar proyectos pioneros.',
    },
  ];

  // Contenido para las secciones de Procesos y Automatización
  public automatizacionSections = [
    {
      estado: '',
      sugerencia: '',
    },
    {
      estado:
        'Los procesos empresariales aún no están optimizados ni digitalizados. Prioriza identificar los procesos clave y cómo digitalizarlos gradualmente.',
      sugerencia: 'Implementa herramientas básicas de mapeo de procesos.',
    },
    {
      estado:
        'Tu organización ha dado pasos iniciales en la digitalización, pero es necesario un esfuerzo sostenido para obtener beneficios significativos.',
      sugerencia: 'Adopta software de gestión para procesos específicos.',
    },
    {
      estado:
        'Tu empresa está en una etapa intermedia de optimización y digitalización. El siguiente paso es mejorar la conectividad entre sistemas.',
      sugerencia:
        'Evalúa herramientas de integración y automatización para conectar los procesos existentes.',
    },
    {
      estado:
        'Ya se han optimizado y digitalizado varios procesos. Continúa evaluando áreas de mejora para llegar a una optimización completa.',
      sugerencia:
        'Realiza auditorías frecuentes de procesos para asegurar su eficiencia.',
    },
    {
      estado:
        '¡Excelente! Tu organización opera con procesos completamente optimizados y digitalizados. Mantén esta ventaja revisando y mejorando continuamente las herramientas utilizadas.',
      sugerencia:
        'Experimenta con tecnologías de inteligencia artificial para predecir y optimizar flujos.',
    },
  ];

  // Contenido para las secciones de Industria
  public industriaSections = [
    {
      estado: '',
      sugerencia: '',
    },
    {
      estado: 'Descripción del Nivel 1 para Industria.',
      sugerencia: 'Sugerencia para Nivel 1 de Industria.',
    },
    {
      estado: 'Descripción del Nivel 2 para Industria.',
      sugerencia: 'Sugerencia para Nivel 2 de Industria.',
    },
    {
      estado: 'Descripción del Nivel 3 para Industria.',
      sugerencia: 'Sugerencia para Nivel 3 de Industria.',
    },
    {
      estado: 'Descripción del Nivel 4 para Industria.',
      sugerencia: 'Sugerencia para Nivel 4 de Industria.',
    },
    {
      estado: 'Descripción del Nivel 5 para Industria.',
      sugerencia: 'Sugerencia para Nivel 5 de Industria.',
    },
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
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Empresa.toLowerCase()
      ) {
        // El usuario está logueado y su rol es 'empresa'
        // Pedir al ModeloMadurezService que actualice los valores
        console.log('recheckData');
        this.modeloMadurezService.recheckData();
        // Esperar 1 segundo antes de llamar a makeChart()
        setTimeout(() => {
          this.makeChart();
        }, 1000); // 1000 milisegundos = 1 segundo
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
