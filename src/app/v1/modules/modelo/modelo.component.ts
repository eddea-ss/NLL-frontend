import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from '@shared/components';
import { Slide } from '@shared/models';
import * as CryptoJS from 'crypto-js';
import { AuthState, Role } from '@shared/enums';
import { RouterLink, Router } from '@angular/router';
import { LoginService, ModeloMadurezService } from '@core/services';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    CarouselComponent,
    RouterLink,
  ],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.scss',
})
export class ModeloComponent {
  estado = ''; // completo - incompleto - ''

  private loginService = inject(LoginService);
  private modeloMadurezService = inject(ModeloMadurezService);
  private router = inject(Router);

  // Signals del LoginService
  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  // Signal del ModeloMadurezService
  modeloMadurez = this.modeloMadurezService.modeloMadurez;

  mySlides: Slide[] = [
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-inscripcion.jpg',
      content: `
        <h3>¡Impulsa tu Empresa con Industria 4.0!</h3>
        <p>Inscríbete y accede a herramientas tecnológicas avanzadas para transformar tu empresa.</p>
      `,
      duration: 5000,
    },
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-industria.jpg',
      content: `
        <h3>Transforma tu Negocio</h3>
        <p>La Región de Los Lagos avanza hacia la Industria 4.0. No te quedes atrás y moderniza tus procesos.</p>
      `,
      duration: 7000,
    },
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-conexion.jpg',
      content: `
        <h3>Conéctate con la Innovación</h3>
        <p>Accede a una red de proveedores y expertos en la Región de Los Lagos.</p>
      `,
      duration: 6000,
    },
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-beneficios.jpg',
      content: `
        <h3>Beneficios para tu Empresa</h3>
        <p>Mejora la productividad, reduce costos y aumenta tu competitividad con la Industria 4.0.</p>
      `,
      duration: 5000,
    },
  ];

  puntaje = {
    general: {
      letra: 'A',
      subtitulo: 'Evaluacion',
      descripcion:
        'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was original',
    },
    categoria: [
      {
        letra: 'A',
        categoria: 'The Shiba',
        descripcion: 'The Shiba Inu is the smallest of the six',
      },
      {
        letra: 'A',
        categoria: 'The Shiba',
        descripcion: 'The Shiba Inu is the smallest of the six',
      },
      {
        letra: 'B',
        categoria: 'The Shiba',
        descripcion: 'The Shiba Inu is the smallest of the six',
      },
      {
        letra: 'A',
        categoria: 'The Shiba',
        descripcion: 'The Shiba Inu is the smallest of the six',
      },
      {
        letra: 'A',
        categoria: 'The Shiba',
        descripcion: 'The Shiba Inu is the smallest of the six',
      },
    ],
  };

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Empresa
      ) {
        // El usuario está logueado y su rol es 'empresa'
        // Pedir al ModeloMadurezService que actualice los valores
        this.modeloMadurezService.recheckData();
      }
    });
  }

  openLink(): void {
    this.modeloMadurezService.openLink();
  }

  getGradeDescription(grade: string): string {
    switch (grade.toUpperCase()) {
      case 'A':
        return 'Su empresa se encuentra en una etapa inicial en la adopción de la Industria 4.0 y la manufactura avanzada. La estrategia digital no está claramente definida o implementada, y la adopción de tecnologías digitales tiene una baja prioridad. La mayoría de los procesos son manuales o utilizan tecnología básica. Hay poca automatización en los procesos de producción. No se han implementado sistemas de gestión de producción en tiempo real ni tecnologías IoT para monitoreo de equipos. La recopilación y análisis de datos es mínima, y no se utilizan tecnologías avanzadas como realidad aumentada o sistemas ERP específicos para producción. La capacitación en habilidades digitales es limitada, y la estructura organizacional no está adaptada para aprovechar las ventajas de la digitalización. Se recomienda desarrollar una estrategia digital clara y comenzar a invertir en tecnologías básicas de Industria 4.0..';
      case 'B':
        return 'Su empresa está comenzando a explorar la Industria 4.0 y la manufactura avanzada. Se ha definido una estrategia digital básica, y la adopción de tecnologías digitales está ganando mayor prioridad. Algunos procesos de producción están automatizados. Se están dando los primeros pasos en la implementación de sistemas de gestión de producción y en la integración de sensores para monitoreo de equipos. La empresa reconoce la necesidad de desarrollar habilidades digitales en su personal y ha implementado algunas iniciativas en este sentido. Hay un interés creciente en la recopilación y análisis de datos, aunque aún de manera limitada. La empresa está considerando la implementación de tecnologías más avanzadas para producción. Se recomienda continuar con la capacitación del personal, la inversión en tecnologías clave para mejorar la eficiencia y la calidad de la producción, y comenzar a implementar metodologías para la optimización de procesos.';
      case 'C':
        return 'Su empresa ha logrado avances importantes en la adopción de la Industria 4.0 y la manufactura avanzada. La estrategia digital está definida y avanzando en su implementación, y la adopción de tecnologías digitales es una prioridad estratégica importante. Se han implementado sistemas de gestión de producción en tiempo real y hay una integración parcial de sensores IoT para monitoreo de equipos. La empresa ha implementado programas de desarrollo de habilidades digitales para su personal y ha adaptado su estructura organizacional para aprovechar las ventajas de la digitalización. La recopilación y análisis de datos se realiza de manera sistemática, aunque aún hay amplias oportunidades de mejora. Se están explorando tecnologías más avanzadas, lo cual debe fortaalecerse. Se recomienda profundizar en la integración de sistemas, mejorar las capacidades de análisis de datos y continuar con la automatización de procesos clave.';
      case 'D':
        return 'Su empresa se encuentra en una etapa avanzada en la adopción de la Industria 4.0 y la manufactura avanzada. La estrategia digital está plenamente integrada en la estrategia de negocio, y la empresa se caracteriza por una cultura de innovación y transformación digital.  Los sistemas de gestión de producción en tiempo real están implementados y hay una amplia integración de sensores IoT para monitoreo y mantenimiento predictivo de equipos. Se utilizan simulaciones digitales para pruebas de componentes y se han implementado tecnologías de medición y control de calidad automatizadas. La recopilación y análisis de datos es avanzada, utilizando big data y analytics para la toma de decisiones. Se emplean tecnologías avanzadas para formación y mantenimiento, y se ha implementado un sistema ERP avanzado específico para la producción. La empresa cuenta con una política de ciberseguridad y una estrategia para gestionar los datos generados por las nuevas tecnologías. Se recomienda continuar optimizando los procesos, explorar tecnologías emergentes y fomentar una cultura de innovación continua.';
      case 'E':
        return 'Su empresa ha alcanzado un nivel optimizado de Industria 4.0, posicionándose como líder en el sector de maestranza. Todas las tecnologías clave de Industria 4.0 están plenamente integradas y optimizadas. El uso de software CAD/CAM avanzado y tecnologías de fabricación automatizadas permiten una producción altamente eficiente y personalizada. Los sistemas de gestión de producción en tiempo real están totalmente integrados con sensores IoT, permitiendo un control y optimización continua de los procesos. Se utilizan simulaciones avanzadas y las tecnologías de medición y control de calidad de última generación. El análisis de datos y la inteligencia artificial se aplican en todos los aspectos de la producción, desde la planificación hasta el mantenimiento predictivo. La realidad aumentada y virtual se utiliza ampliamente para formación, diseño y mantenimiento. La empresa es pionera en la implementación de nuevas tecnologías y constantemente innova en sus procesos y productos. Existe una estrategia robusta y sostenida de innovación y digitalización, optimizando continuamente los procesos productivos y operacionales a través de la tecnología. Se recomienda mantener el liderazgo tecnológico, compartir mejores prácticas con la industria y explorar continuamente nuevas fronteras en manufactura avanzada.';
      default:
        return 'Calificación desconocida.';
    }
  }
}
