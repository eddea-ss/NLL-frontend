import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Indicator {
  codigo: string;
  nombre: string;
  unidad_medida: string;
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

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {
  // Obtener indicadores desde la API de mindicador.cl
  private indicatorsUrl = 'https://mindicador.cl/api';
  // API de OpenWeatherMap para Puerto Montt
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = ''; // Necesitarás obtener una API key de OpenWeatherMap
  private cityId = '3874960'; // ID de Puerto Montt

  constructor(private http: HttpClient) {}

  // Obtener los indicadores necesarios (USD y UF)
  getIndicators(): Observable<{ usd: Indicator, uf: Indicator }> {
    return this.http.get<any>(this.indicatorsUrl).pipe(
      map(response => ({
        usd: response.dolar,
        uf: response.uf
      }))
    );
  }

  // Obtener el clima actual y pronóstico
  getWeather(): Observable<Weather> {
    // Obtener clima actual
    const currentWeather = this.http.get<any>(`${this.weatherUrl}?id=${this.cityId}&appid=${this.apiKey}&units=metric&lang=es`);
    
    // Obtener pronóstico
    const forecast = this.http.get<any>(`${this.forecastUrl}?id=${this.cityId}&appid=${this.apiKey}&units=metric&lang=es`);

    // Combinar ambas respuestas
    return new Observable(observer => {
      currentWeather.subscribe(
        current => {
          forecast.subscribe(
            forecastData => {
              observer.next({
                current: {
                  temp: current.main.temp,
                  description: current.weather[0].description,
                  icon: current.weather[0].icon
                },
                forecast: {
                  temp: forecastData.list[0].main.temp,
                  description: forecastData.list[0].weather[0].description,
                  icon: forecastData.list[0].weather[0].icon
                }
              });
              observer.complete();
            },
            error => observer.error(error)
          );
        },
        error => observer.error(error)
      );
    });
  }
} 