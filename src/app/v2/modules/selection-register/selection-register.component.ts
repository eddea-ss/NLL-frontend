import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.title.setTitle('Registro | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Registrate y Únete a una red de colaboración y aprovecha oportunidades de negocio en crecimiento.',
    });
  }
}
