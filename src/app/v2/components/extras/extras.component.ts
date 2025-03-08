import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss',
})
export class ExtrasComponent implements OnInit {
  @Input() type: string = 'default';
  @Input() data: any[] = [];

  // Almacenar la URL del video actual
  videoUrl: string = '';

  ngOnInit() {
    // Obtener video aleatorio al iniciar el componente
    this.setRandomVideo();
  }

  // Obtener un video aleatorio de la carpeta
  private setRandomVideo(): void {
    // Generar un número aleatorio entre 0 y 4 (inclusive)
    const randomNumber = Math.floor(Math.random() * 5);
    // Construir la URL del video
    this.videoUrl = `assets/videos/video-intro${randomNumber}.mp4`;
  }
}
