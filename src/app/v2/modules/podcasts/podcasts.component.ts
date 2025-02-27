import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  DomSanitizer,
  Meta,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { BreadcrumbsComponent, SugeridosComponent, CarouselComponent } from '@v2/components';
import { INVESTIGACION_PODCASTS } from '@v2/constants';
import { CarouselBannerComponent } from '../carousel-banner/carousel-banner.component';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
}

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [
    CommonModule,
    SugeridosComponent,
    BreadcrumbsComponent,
    CarouselBannerComponent,
    CarouselComponent,
  ],
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  breadcrumbs: any[] = INVESTIGACION_PODCASTS;
  showAllVideos = false;
  readonly VIDEOS_TO_SHOW = 6;

  episodiosDestacados = [
    {
      image: 'assets/podcast1.jpg',
      title: 'Transformación Digital en la Industria',
      content: 'Descubre cómo la IA está revolucionando los procesos industriales',
      buttonText: 'Ver episodio',
      buttonLink: '#episodio1'
    },
    {
      image: 'assets/podcast2.jpg',
      title: 'El Futuro de la Manufactura',
      content: 'Análisis de las tendencias que definirán la próxima década',
      buttonText: 'Ver episodio',
      buttonLink: '#episodio2'
    },
    {
      image: 'assets/plataforma2.jpg',
      title: 'Innovación y Sostenibilidad',
      content: 'Estrategias para una industria más verde y eficiente',
      buttonText: 'Ver episodio',
      buttonLink: '#episodio3'
    }
  ];

  videos: Video[] = [
    {
      id: 'xfiEpdZFVIc',
      title: 'Metodologías ágiles en entornos industriales',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: 'ciAn_qGxUkw',
      title: 'Desafíos de interoperabilidad en el IoT Industrial',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: 'NS-XdY4eRF4',
      title: 'Transformación digital en empresas tradicionales',
      description: 'Análisis de datos en tiempo real'
    },
    {
      id: 'MzrobpDg13A',
      title: 'Consideraciones éticas de la IA en la industria',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: 'SHu_OPsGoyU',
      title: 'Economía circular y la Industria 4.0',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: 'LqR-6Gsne04',
      title: 'Desafíos de la Industria 4.0',
      description: 'Análisis de datos en tiempo real'
    },
    {
      id: 'FgmDuCnCcGs',
      title: 'Blockchain',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: '9eMufV7dLJY',
      title: 'Gemelos Digitales',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: 'O_7iYK61kVw',
      title: 'Industria 4.0',
      description: 'Análisis de datos en tiempo real'
    },
    {
      id: 'T4ZEZGe4nkE',
      title: 'Robótica Colaborativa',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: 'MDhUSHTLn6Q',
      title: 'Computación en la nube',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: 'lxpa7KfxREA',
      title: 'Habilidades Laborales para la industria 4.0',
      description: 'Análisis de datos en tiempo real'
    },
    {
      id: '_F-X3p4bRks',
      title: 'Diseño 3D y Manufactura aditiva',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: 'tQxSk9TqEW0',
      title: 'Mantenimiento predictivo',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: 'gqyNm5i3ZJA',
      title: 'Logística inteligente',
      description: 'Análisis de datos en tiempo real'
    },
    {
      id: '7H-yixETXdk',
      title: 'Realidad Aumentada y Realidad Virtual',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: 'PuLlAFqjZyk',
      title: 'Big Data',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: '__W8KrlB3m8',
      title: 'Internet de las cosas',
      description: 'Análisis de datos en tiempo real'
    },
    {
      id: 'NCkTQcY7f3I',
      title: 'Inteligencia Artificial',
      description: 'Una visión general de la cuarta revolución industrial'
    },
    {
      id: 'cob8tIoMvb0',
      title: 'Tecnología 5g',
      description: 'Procesos y tecnologías clave'
    },
    {
      id: 'KQXcRWHllpk',
      title: 'Ciberseguridad',
      description: 'Análisis de datos en tiempo real'
    },
  ];

  selectedVideo = this.videos[0];
  selectedVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.selectedVideoUrl = this.getEmbedUrl(this.selectedVideo.id);
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Podcasts Innovadores | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Explora nuestros podcasts generados por inteligencia artificial, con investigaciones y conversaciones sobre automatización, IoT, inteligencia artificial y más. Conecta con la innovación en Nuevo Los Lagos.',
    });
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

  get displayedVideos(): Video[] {
    return this.showAllVideos ? this.videos : this.videos.slice(0, this.VIDEOS_TO_SHOW);
  }

  toggleVideosDisplay() {
    this.showAllVideos = !this.showAllVideos;
  }
}
