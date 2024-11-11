import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ArticleCardComponent, CarouselComponent } from '@shared/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Slide } from '@shared/models';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatIconModule, 
    CarouselComponent, 
    ArticleCardComponent,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
   
})
export class LandingPageComponent {
  mySlides: Slide[] = [
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-inscripcion.jpg',
      content: 
        `<h3>¡Impulsa tu Empresa con Industria 4.0!</h3>
        <p>Inscríbete y accede a herramientas tecnológicas avanzadas para transformar tu empresa.</p>`,
      duration: 5000
    },
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-industria.jpg',
      content: 
        `<h3>Transforma tu Negocio</h3>
        <p>La Región de Los Lagos avanza hacia la Industria 4.0. No te quedes atrás y moderniza tus procesos.</p>`,
      duration: 7000
    },
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-conexion.jpg',
      content: 
        `<h3>Conéctate con la Innovación</h3>
        <p>Accede a una red de proveedores y expertos en la Región de Los Lagos.</p>`,
      duration: 6000
    },
    {
      type: 'regular',
      imageUrl: 'assets/wallpapers/img-fondo-beneficios.jpg',
      content: 
        `<h3>Beneficios para tu Empresa</h3>
        <p>Mejora la productividad, reduce costos y aumenta tu competitividad con la Industria 4.0.</p>`,
      duration: 5000
    }
  ];
  

  getDescription(entityType: string, item: any): string {
    if (!item) {
      return '';
    }

    const descriptionFields: { [key: string]: string } = {
      'articulos': 'resumen',
      'financiamiento': 'descripcin',
      'proyectos': 'solucion',
      'proveedores': 'ofrece',
      'cursos': 'descripcin'
    };

    if (entityType === 'proyectos') {
      const solucion = item['solucion'] ?? '';
      const resultado = item['resultado'] ?? '';
      return `${solucion}\n\nResultado:\n${resultado}`;
    }

    const descriptionField = descriptionFields[entityType];

    if (!descriptionField) {
      console.warn(`EntityType no reconocido: ${entityType}`);
      return '';
    }

    return item[descriptionField] ?? '';
  }

  getTitle(entityType:string,item: any): string {
    if (!item) return '';
    const titleFields: { [key: string]: string } = {
      'articulos': 'ttulo',
      'financiamiento': 'ttulo',
      'proyectos': 'tarea',
      'proveedores': 'nombreproveedor',
      'cursos': 'nombre_curso'
    };
    const titleField = titleFields[entityType];
    return item[titleField] ?? '';
  }

  getRouteParam(id: number, title: string): string {
    const titleSlug = title?.toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, ''); // Elimina caracteres especiales
    return `${id}-${titleSlug}`;
  }

  getIconName(entityType:string): string {
    const iconMap: { [key: string]: string } = {
      'quienes-somos': 'info',
      'modelo': 'assessment',
      'cursos': 'book',
      'proveedores': 'business',
      'proyectos': 'star',
      'financiamiento': 'attach_money',
      'articulos': 'article',
      'casos-exito': 'star', // Puedes ajustar este ícono si es necesario
      // Añade otros entityType y sus respectivos íconos
      'default': 'insert_photo'
    };
    return iconMap[entityType] || iconMap['default'];
  }
  
  openLink(): void {
    window.open('https://drive.google.com/file/d/12LpUYnh2Gje8wC3TMkESBJJSO3kJhXO2/view?usp=sharing', '_blank');
  }
}
