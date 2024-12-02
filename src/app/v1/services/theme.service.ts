// src/app/services/theme.service.ts
import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { Theme } from '@shared/enums';
import { signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Inyección de RendererFactory2 usando inject
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  // Definir un Signal para el tema actual
  private _currentTheme: WritableSignal<Theme> = signal(Theme.Light);

  constructor() {
    // Recuperar el tema guardado en localStorage, si existe
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && Object.values(Theme).includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this._currentTheme());
    }
  }

  /**
   * Establece el tema actual.
   * @param theme El tema a establecer.
   */
  setTheme(theme: Theme): void {
    // Remover la clase del tema anterior
    this.renderer.removeClass(document.documentElement, this._currentTheme());
    // Actualizar el Signal con el nuevo tema
    this._currentTheme.set(theme);
    // Agregar la clase del nuevo tema
    this.renderer.addClass(document.documentElement, theme);
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
  }

  /**
   * Obtiene el tema actual como un Signal.
   * @returns El Signal que representa el tema actual.
   */
  getTheme(): Theme {
    return this._currentTheme();
}
}
