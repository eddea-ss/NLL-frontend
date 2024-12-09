// form-register.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RegisterService } from '@v2/services';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private registroService = inject(RegisterService);
  private title = inject(Title);
  private meta = inject(Meta);

  formGroup!: FormGroup;
  formFields: any[] = [];
  tipoRegistro!: string;
  errorGeneral = '';

  formGeneral = [
    {
      type: 'email',
      label: 'Correo electrónico',
      name: 'correo',
      placeholder: '********@*****.**',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required, Validators.email],
    },
    {
      type: 'password',
      label: 'Contraseña',
      name: 'password',
      placeholder: '',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'password',
      label: 'Confirmar contraseña',
      name: 'password_confirm',
      placeholder: '',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
  ];

  formPersona = [
    {
      type: 'text',
      label: 'Nombre',
      name: 'nombreRepresentante',
      placeholder: '',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'text',
      label: 'Rut',
      name: 'rutRepresentante',
      placeholder: 'example 11111111-1',
      error: null,
      validator: [Validators.required],
    },
  ];

  formIndustria4 = [
    {
      type: 'text',
      label: 'Nombre de la Empresa',
      name: 'nombreEmpresa',
      placeholder: '',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'text',
      label: 'RUT de la Empresa',
      name: 'rut',
      placeholder: 'example 11111111-1',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'text',
      label: 'Nombre de Representante',
      name: 'nombreRepresentante',
      placeholder: '',
      error: null,
      validator: [Validators.required],
    },
    {
      type: 'text',
      label: 'RUT del Representante',
      name: 'rutRepresentante',
      placeholder: 'example 11111111-1',
      error: null,
      validator: [Validators.required],
    },
    // Rating questions
    {
      type: 'rating',
      label: '¿Qué tan clara es la estrategia digital de tu organización?',
      name: 'estrategiaDigital',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'rating',
      label:
        '¿Qué tan complejos son los desafíos para implementar soluciones de la Industria 4.0 en tu organización?',
      name: 'desafiosIndustria4',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'rating',
      label:
        '¿Qué tan alta es la prioridad de la adopción de tecnologías digitales y la integración de la Industria 4.0 en tu organización?',
      name: 'prioridadAdopcion',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
  ];

  // Password validation variables
  hasLength: boolean = false;
  hasUppercase: boolean = false;
  hasSpecialChar: boolean = false;
  hasNumber: boolean = false;
  passwordsMatch: boolean = false;

  // Password visibility toggles
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.tipoRegistro = segments[0].path;
      this.initializeForm();
    });
    this.title.setTitle('Registro | Nuevo Los Lagos');

    // Add meta tags
    this.meta.updateTag({
      name: 'description',
      content:
        'Regístrate ahora y forma parte de una red colaborativa. Descubre nuevas oportunidades de negocio y haz crecer tu impacto en la región de Los Lagos.',
    });
  }

  private initializeForm(): void {
    switch (this.tipoRegistro) {
      case 'registro-persona':
        this.formFields = [...this.formPersona, ...this.formGeneral];
        this.tipoRegistro = 'usuario';
        break;
      case 'registro-industria':
        this.formFields = [...this.formIndustria4, ...this.formGeneral];
        this.tipoRegistro = 'empresa';
        break;
      case 'registro-proveedor':
        this.formFields = [...this.formIndustria4, ...this.formGeneral];
        this.tipoRegistro = 'proveedor';
        break;
    }
    this.formGroup = this.fb.group(
      this.formFields.reduce((acc, field) => {
        acc[field.name] = ['', field.validator];
        return acc;
      }, {})
    );

    // Subscribe to password value changes for validation
    this.formGroup
      .get('password')
      ?.valueChanges.subscribe((password: string) => {
        this.validatePassword(password);
        this.checkPasswordsMatch();
      });

    // Subscribe to confirm password value changes for matching check
    this.formGroup
      .get('password_confirm')
      ?.valueChanges.subscribe(() => this.checkPasswordsMatch());
  }

  // Method to update the value of the control when a star is selected
  rate(controlName: string, value: number): void {
    this.formGroup.get(controlName)?.setValue(value);
  }

  onSubmit(): void {
    if (!this.passwordsMatch) {
      this.errorGeneral = 'Las contraseñas no coinciden';
      return;
    }
    if (this.formGroup.valid) {
      this.errorGeneral = '';
      this.registroService
        .register({ ...this.formGroup.value, tipoUsuario: this.tipoRegistro })
        .subscribe({
          next: () => console.log('Registro exitoso'),
          error: (err) => console.error(err),
        });
    }
  }

  checkPasswordsMatch(): void {
    const password = this.formGroup.get('password')?.value;
    const confirmPassword = this.formGroup.get('password_confirm')?.value;
    this.passwordsMatch = password === confirmPassword && password !== '';
  }

  // Password validation
  validatePassword(password: string) {
    this.hasLength = password.length >= 8;
    this.hasUppercase = /[A-Z]/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.hasNumber = /[0-9]/.test(password);
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
