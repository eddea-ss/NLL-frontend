// login.component.ts

import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService, SnackbarService } from '@v2/services';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private loginService = inject(LoginService);
  protected fb = inject(FormBuilder);
  private snackbar = inject(SnackbarService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = false;
  errorMessage = '';

  // Password visibility toggle
  isPasswordVisible: boolean = false;

  // Password validation variables
  hasLength: boolean = false;
  hasUppercase: boolean = false;
  hasSpecialChar: boolean = false;
  hasNumber: boolean = false;

  constructor() {
    this.title.setTitle('Acceso a la Plataforma | Nuevo Los Lagos');
    this.meta.updateTag({
      name: 'description',
      content:
        'Accede a la plataforma "Nuevo Los Lagos" y conéctate con una red colaborativa. Descubre nuevas oportunidades de negocio en la región.',
    });
    this.loginForm
      .get('password')
      ?.valueChanges.subscribe((password: string) => {
        this.validatePassword(password);
      });
  }

  validatePassword(password: string) {
    this.hasLength = password.length >= 8;
    this.hasUppercase = /[A-Z]/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.hasNumber = /[0-9]/.test(password);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackbar.show(
        'Completa nombre y contraseña antes de iniciar sesión',
        4000
      );
      return;
    }

    if (
      !(
        this.hasLength &&
        this.hasUppercase &&
        this.hasSpecialChar &&
        this.hasNumber
      )
    ) {
      this.snackbar.show('La contraseña debe ser correcta', 4000);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.loginService.login({ mail: email, password }).subscribe({
      next: () => {
        // Handle successful login
        this.isLoading = false;
      },
      error: (response) => {
        this.errorMessage =
          response?.error?.error || 'Error al iniciar sesión.';
        this.isLoading = false;
      },
    });
  }
}
