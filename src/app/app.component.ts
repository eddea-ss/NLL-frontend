import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SnackbarComponent } from './v2/components/snackbar/snackbar.component';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);

  title = 'Nuevo los Lagos';

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCanonicalUrl();
      });
  }

  updateCanonicalUrl() {
    const canonicalUrl = window.location.origin + this.router.url.split('?')[0];
    let link: HTMLLinkElement | null = document.querySelector(
      "link[rel='canonical']"
    );

    if (link === null) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }
}
