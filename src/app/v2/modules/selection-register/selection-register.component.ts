import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-selection-register',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './selection-register.component.html',
  styleUrl: './selection-register.component.scss',
})
export class SelectionRegisterComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  cards = [
    {
      title: 'Startup - Emprendedor',
      description: 'Ideal para emprendedores y startups que buscan oportunidades en el ecosistema de la Industria 4.0',
      icon: 'dinero',
      route: '/registro-persona',
    },
    {
      title: 'Empresa',
      description: 'Para empresas que buscan aumentar su competitividad y adoptar tecnologías de la Industria 4.0',
      icon: 'empresa',
      route: '/registro-industria',
    },
    {
      title: 'Proveedor',
      description: 'Para proveedores de soluciones y servicios especializados en la Industria 4.0',
      icon: 'proveedor',
      route: '/registro-proveedor',
    },
  ];

  ngOnInit(): void {
    this.title.setTitle('Elige tu tipo de cuenta | Nuevo Los Lagos');
    this.meta.updateTag({
      name: 'description',
      content: 'Selecciona el tipo de cuenta que mejor se adapte a tus necesidades en Nuevo Los Lagos. Únete como Startup, Empresa o Proveedor.',
    });
  }
}
