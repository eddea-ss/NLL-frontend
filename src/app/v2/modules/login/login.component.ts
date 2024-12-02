// src/app/core/components/login/login.component.ts

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from '@core/services/login.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private loginService = inject(LoginService);
  protected fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef); // Inyectar ChangeDetectorRef

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdRef.markForCheck(); // Forzar la detección de cambios para actualizar la vista

    const { email, password } = this.loginForm.value;

    this.loginService.login({ correo: email, password }).subscribe({
      next: () => {
        // Manejar el inicio de sesión exitoso
        this.isLoading = false;
        // Por ejemplo, redirigir al usuario a otra página
        // this.router.navigate(['/dashboard']);
        this.cdRef.markForCheck(); // Forzar la detección de cambios
      },
      error: (response) => {
        this.errorMessage =
          response?.error?.error || 'Error al iniciar sesión.';
        this.isLoading = false;
        this.cdRef.markForCheck(); // Forzar la detección de cambios
      },
    });
  }
}
