import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Podcast } from '@shared/models';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
  ],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss',
})
export class PodcastsComponent {
  protected podcasts: Podcast[] = [
    {
      id: 1,
      title: '5G',
      description:
        'Descubre cómo la tecnología 5G está revolucionando las comunicaciones y la conectividad en la Industria 4.0.',
      audioPath: 'assets/podcasts/5g.wav',
    },
    {
      id: 2,
      title: 'Ciberseguridad',
      description:
        'Aprende sobre la importancia de la ciberseguridad en la protección de datos y sistemas industriales.',
      audioPath: 'assets/podcasts/ciberseguridad.wav',
    },
    {
      id: 3,
      title: 'Computación en la Nube',
      description:
        'Explora cómo la computación en la nube está transformando la forma en que almacenamos y accedemos a la información.',
      audioPath: 'assets/podcasts/computacion_en_nube.wav',
    },
    {
      id: 4,
      title: 'Diseño 3D y Manufactura Aditiva',
      description:
        'Conoce las innovaciones en diseño 3D y cómo la manufactura aditiva está cambiando la producción.',
      audioPath: 'assets/podcasts/Diseño_3D_y_Manufactura_Aditiva.wav',
    },
    {
      id: 5,
      title: 'Inteligencia Artificial y Machine Learning',
      description:
        'Descubre las aplicaciones de la IA y el aprendizaje automático en la industria moderna.',
      audioPath: 'assets/podcasts/inteligencia_artificial_y_ml.wav',
    },
    {
      id: 6,
      title: 'Internet de las Cosas (IoT)',
      description:
        'Aprende cómo el IoT conecta dispositivos y mejora la eficiencia en los procesos industriales.',
      audioPath: 'assets/podcasts/iot.wav',
    },
    {
      id: 7,
      title: 'Robótica Colaborativa',
      description:
        'Explora cómo los robots colaborativos trabajan junto a los humanos en entornos industriales.',
      audioPath: 'assets/podcasts/Robotica_colaborativa.wav',
    },
  ];
}
