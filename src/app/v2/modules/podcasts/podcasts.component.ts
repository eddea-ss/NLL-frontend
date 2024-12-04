import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  DomSanitizer,
  Meta,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';
import { INVESTIGACION_PODCASTS } from '@v2/constants';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CommonModule, SugeridosComponent, BreadcrumbsComponent],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss',
})
export class PodcastsComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  breadcrumbs: any[] = INVESTIGACION_PODCASTS;

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Podcasts | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Nuestros podcasts, generados por inteligencia artificial, están basados en nuestras investigaciones y conversaciones con expertos en áreas como automatización, inteligencia artificial, Internet de las Cosas (IoT) y más.',
    });
  }

  videos = [
    {
      id: 'xfiEpdZFVIc',
      title: 'Metodologías ágiles en entornos industriales',
    },
    {
      id: 'ciAn_qGxUkw',
      title: 'Desafíos de interoperabilidad en el IoT Industrial',
    },
    {
      id: 'NS-XdY4eRF4',
      title: 'Transformación digital en empresas tradicionales',
    },
    {
      id: 'MzrobpDg13A',
      title: 'Consideraciones éticas de la IA en la industria',
    },
    //asdas
    {
      id: 'SHu_OPsGoyU',
      title: 'Economía circular y la Industria 4.0',
    },
    {
      id: 'LqR-6Gsne04',
      title: 'Desafíos de la Industria 4.0',
    },
    {
      id: 'FgmDuCnCcGs',
      title: 'Blockchain',
    },
    {
      id: '9eMufV7dLJY',
      title: 'Gemelos Digitales',
    },
    //asdasdas
    {
      id: 'O_7iYK61kVw',
      title: 'Industria 4.0',
    },
    {
      id: 'T4ZEZGe4nkE',
      title: 'Robótica Colaborativa',
    },
    {
      id: 'MDhUSHTLn6Q',
      title: 'Computación en la nube',
    },
    {
      id: 'lxpa7KfxREA',
      title: 'Habilidades Laborales para la industria 4.0',
    },
    //asdasdasdasd
    {
      id: '_F-X3p4bRks',
      title: 'Diseño 3D y Manufactura aditiva',
    },
    {
      id: 'tQxSk9TqEW0',
      title: 'Mantenimiento predictivo',
    },
    {
      id: 'gqyNm5i3ZJA',
      title: 'Logística inteligente',
    },
    {
      id: '7H-yixETXdk',
      title: 'Realidad Aumentada y Realidad Virtual',
    },
    //asdasdasdasd
    {
      id: 'PuLlAFqjZyk',
      title: 'Big Data',
    },
    {
      id: '__W8KrlB3m8',
      title: 'Internet de las cosas',
    },
    {
      id: 'NCkTQcY7f3I',
      title: 'Inteligencia Artificial',
    },
    {
      id: 'cob8tIoMvb0',
      title: 'Tecnología 5g',
    },
    {
      id: 'KQXcRWHllpk',
      title: 'Ciberseguridad',
    },
  ];

  selectedVideo = this.videos[0];
  selectedVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.selectedVideoUrl = this.getEmbedUrl(this.selectedVideo.id);
  }

  getThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  selectVideo(video: any) {
    this.selectedVideo = video;
    this.selectedVideoUrl = this.getEmbedUrl(video.id);
  }

  getEmbedUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
