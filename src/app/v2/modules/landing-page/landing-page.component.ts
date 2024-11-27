import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'El proyecto "Nuevo Los Lagos", en desarrollo, es una colaboración entre la Universidad Santo Tomás, Asimet y Grupo Centinela, con financiamiento de Corfo Los Lagos. Esta plataforma web busca fortalecer la infraestructura industrial y profesional de la región.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Region de los Lagos, Industria 4.0',
    });
  }
}
