import { Injectable } from '@angular/core';
import { CONSEJOS_SECTOR, Consejo, ConsejosPorRango } from './consejos-sector';

@Injectable({
  providedIn: 'root'
})
export class ConsejosSectorService {

  constructor() { }

  /**
   * Obtener consejos específicos para un sector y puntaje
   * @param sector Sector de la empresa
   * @param puntaje Puntaje obtenido en la evaluación
   * @returns Array de consejos aplicables
   */
  obtenerConsejosPorSectorYPuntaje(sector: string, puntaje: number): Consejo[] {
    // Obtener los consejos para el sector específico o usar la categoría "Otro" si no existe
    const consejosSector = CONSEJOS_SECTOR[sector] || CONSEJOS_SECTOR['Otro'];
    
    // Encontrar el rango correspondiente al puntaje
    const rangoAplicable = consejosSector.find(rango => 
      puntaje >= rango.min && puntaje <= rango.max
    );
    
    // Retornar los consejos del rango encontrado o un array vacío si no hay coincidencia
    return rangoAplicable ? rangoAplicable.consejos : [];
  }

  /**
   * Obtener el rango de puntaje como texto
   * @param puntaje Puntaje obtenido
   * @returns Texto del rango (ej: "0-20", "20-40", etc.)
   */
  obtenerRangoPuntaje(puntaje: number): string {
    if (puntaje >= 0 && puntaje <= 20) return '0-20';
    if (puntaje > 20 && puntaje <= 40) return '20-40';
    if (puntaje > 40 && puntaje <= 60) return '40-60';
    if (puntaje > 60 && puntaje <= 80) return '60-80';
    if (puntaje > 80 && puntaje <= 100) return '80-100';
    return '';
  }
} 