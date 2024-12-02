import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LoginService, CharacterizationModelService } from '@v2/services';
import { AuthState, Role } from '@shared/enums';

@Component({
  selector: 'app-evaluaciones-proveedor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evaluaciones-proveedor.component.html',
  styleUrl: './evaluaciones-proveedor.component.scss',
})
export class EvaluacionesProveedorComponent implements OnInit {
  private loginService = inject(LoginService);
  private modeloCaracterService = inject(CharacterizationModelService);
  private title = inject(Title);
  private meta = inject(Meta);

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;

  public AuthState = AuthState;
  public Role = Role;

  // Signal del ModeloMadurezService
  modeloCaracter = this.modeloCaracterService.modeloCaracter;

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      if (
        authState === AuthState.LoggedIn &&
        user?.rol.nombreRol.toLocaleLowerCase() === Role.Proveedor.toLowerCase()
      ) {
        this.modeloCaracterService.recheckData();
      }
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Modelo Caracterización | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Completa tu modelo de Caracterización de Proveedores y ayúdanos a identificar cómo podemos conectarte con clientes de tu región. Da el siguiente paso hacia nuevas oportunidades.',
    });
  }

  openLink(): void {
    this.modeloCaracterService.openLink();
  }
}
