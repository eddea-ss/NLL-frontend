import { Component, inject, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selection-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './selection-register.component.html',
  styleUrl: './selection-register.component.scss',
})
export class SelectionRegisterComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  @Input() changeMeta: boolean = true;

  @Input() cards = [
    {
      title: 'Proveedores',
      icon: 'dinero',
      link: '/registro-proveedor',
      buttonLabel: 'Registrarse',
      description: `Accede a nuestra plataforma como proveedor y conecta con empresas
              de la Industria 4.0 para ofrecer tus productos o servicios
              especializados. Únete a una red de colaboración y aprovecha
              oportunidades de negocio en crecimiento.`,
    },
    {
      title: 'Empresas de los lagos',
      icon: 'empresas',
      link: '/registro-industria',
      buttonLabel: 'Registrarse',
      description: `Únete como empresa de la región de Los Lagos para aumentar tu
              visibilidad y competitividad en la Industria 4.0. Accede a
              recursos exclusivos, oportunidades de financiamiento y contacto
              directo con proveedores e innovadores.`,
    },
    {
      title: 'Startups y Emprendedores',
      icon: 'startups',
      link: '/registro-persona',
      buttonLabel: 'Registrarse',
      description: `Regístrate como Startup o Emprendedor, y explora oportunidades de
              desarrollo, empleo y formación en el ecosistema de la Industria
              4.0. Conecta con empresas, accede a cursos en línea y mantente
              actualizado.`,
    },
  ];

  ngOnInit(): void {
    if (this.changeMeta) {
      this.title.setTitle('Registro | Nuevo Los Lagos');

      // Agregar meta etiquetas
      this.meta.updateTag({
        name: 'description',
        content:
          'Registrate y Únete a una red de colaboración y aprovecha oportunidades de negocio en crecimiento.',
      });
    }
  }
}
