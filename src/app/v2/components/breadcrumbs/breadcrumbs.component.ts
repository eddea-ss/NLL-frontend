import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Breadcrumb } from '@v2/models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndicatorsService } from '@v2/services/indicators.service';
import { interval, Subscription } from 'rxjs';

interface Indicator {
  valor: number;
  fecha: string;
}

interface Weather {
  current: {
    temp: number;
    description: string;
    icon: string;
  };
  forecast: {
    temp: number;
    description: string;
    icon: string;
  };
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  @Input() breadcrumbs: Breadcrumb[] = [];
  
  // Indicadores económicos
  usdValue: number | null = null;
  ufValue: number | null = null;
  currentDate: string = '';

  // Clima
  weather: Weather | null = null;
  
  // Control de visualización
  showWeather = false;
  private intervalSubscription?: Subscription;

  constructor(private indicatorsService: IndicatorsService) {}

  ngOnInit() {
    // Obtener indicadores al iniciar el componente
    this.loadIndicators();
    this.loadWeather();

    // Configurar el intervalo para alternar cada 5 segundos
    this.intervalSubscription = interval(5000).subscribe(() => {
      this.showWeather = !this.showWeather;
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  private loadIndicators() {
    this.indicatorsService.getIndicators().subscribe(
      (data) => {
        this.usdValue = data.usd.valor;
        this.ufValue = data.uf.valor;
        this.currentDate = new Date().toLocaleDateString('es-CL');
      },
      (error) => {
        console.error('Error al obtener indicadores:', error);
      }
    );
  }

  private loadWeather() {
    this.indicatorsService.getWeather().subscribe(
      (data) => {
        this.weather = data;
      },
      (error) => {
        console.error('Error al obtener el clima:', error);
      }
    );
  }

  // Obtener la URL del ícono del clima
  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
