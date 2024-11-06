import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = 'light-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const savedTheme = localStorage.getItem('theme') || this.currentTheme;
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    this.renderer.removeClass(document.documentElement, this.currentTheme);
    this.currentTheme = theme;
    this.renderer.addClass(document.documentElement, theme);
    localStorage.setItem('theme', theme);
  }

  getTheme(): string {
    return this.currentTheme;
  }
}
