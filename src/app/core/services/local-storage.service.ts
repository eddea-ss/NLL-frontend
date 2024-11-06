// src/app/services/local-storage.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Hace que el servicio sea singleton y esté disponible en toda la aplicación
})
export class LocalStorageService {
  
  constructor() {}

  /**
   * Guarda un valor en el localStorage.
   * @param key La clave bajo la cual se almacenará el valor.
   * @param value El valor a almacenar. Puede ser de cualquier tipo que se pueda serializar a JSON.
   */
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error al guardar en localStorage con la clave "${key}":`, error);
    }
  }

  /**
   * Obtiene un valor del localStorage.
   * @param key La clave del valor a obtener.
   * @returns El valor deserializado o null si no existe o ocurre un error.
   */
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = window.localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error al leer de localStorage con la clave "${key}":`, error);
      return null;
    }
  }

  /**
   * Elimina un valor del localStorage.
   * @param key La clave del valor a eliminar.
   */
  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar de localStorage con la clave "${key}":`, error);
    }
  }

  /**
   * Limpia todo el localStorage.
   */
  clear(): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }
}
