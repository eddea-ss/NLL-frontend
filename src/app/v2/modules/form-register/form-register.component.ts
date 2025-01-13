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
import { UserType } from '@v2/enums';
import { RegisterService, SnackbarService } from '@v2/services';

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
  private snackbar = inject(SnackbarService);

  selectedFile: File | null = null;
  formGroup!: FormGroup;
  formFields: any[] = [];
  tipoRegistro!: string;
  errorGeneral = '';
  typeUser: UserType | undefined;

  formGeneral = [
    {
      type: 'email',
      label: 'Correo electrónico',
      name: 'mail',
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
      name: 'name',
      placeholder: '',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'text',
      label: 'Rut',
      name: 'rut',
      placeholder: 'example 11111111-1',
      error: null,
      validator: [Validators.required],
    },
  ];

  formIndustria4 = [
    {
      type: 'text',
      label: 'Nombre de la Empresa',
      name: 'name',
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
      name: 'nameRepresentative',
      placeholder: '',
      error: null,
      validator: [Validators.required],
    },
    {
      type: 'text',
      label: 'RUT del Representante',
      name: 'rutRepresentative',
      placeholder: 'example 11111111-1',
      error: null,
      validator: [Validators.required],
    },
    // Rating questions
    {
      type: 'rating',
      label: '¿Qué tan clara es la estrategia digital de tu organización?',
      name: 'questionStrategy',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'rating',
      label:
        '¿Qué tan complejos son los desafíos para implementar soluciones de la Industria 4.0 en tu organización?',
      name: 'questionSolution',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
    {
      type: 'rating',
      label:
        '¿Qué tan alta es la prioridad de la adopción de tecnologías digitales y la integración de la Industria 4.0 en tu organización?',
      name: 'questionAdoption',
      error: 'Este campo es obligatorio.',
      validator: [Validators.required],
    },
  ];

  SECTOR_OPTIONS = [
    { value: 'ACUICULTURA', label: 'Acuicultura' },
    { value: 'CONSTRUCCION', label: 'Construcción' },
    { value: 'ASTILLEROS', label: 'Astilleros' },
    { value: 'CARNICO', label: 'Cárnico' },
    { value: 'LACTEO', label: 'Lácteo' },
    { value: 'MAESTRANZA', label: 'Maestranza' },
    { value: 'TURISMO', label: 'Turismo' },
    { value: 'GENERAL', label: 'General' },
  ];

  formSector = [
    {
      type: 'select',
      label: 'Sector',
      name: 'sector',
      // Aqui podemos inyectar nuestras opciones
      options: this.SECTOR_OPTIONS,
      placeholder: 'Selecciona un sector',
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
        this.typeUser = UserType.STARTUP;
        break;
      case 'registro-industria':
        this.formFields = [
          ...this.formIndustria4,
          ...this.formSector,
          ...this.formGeneral,
        ];
        this.tipoRegistro = 'empresa';
        this.typeUser = UserType.COMPANY;
        break;
      case 'registro-proveedor':
        this.formFields = [
          ...this.formIndustria4,
          ...this.formSector,
          ...this.formGeneral,
        ];
        this.tipoRegistro = 'proveedor';
        this.typeUser = UserType.SUPPLIER;
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

    if (this.formGroup.valid) {
      this.errorGeneral = '';

      // Asignar sector
      const sectorValue =
        this.typeUser === UserType.STARTUP
          ? 'INDEFINIDO'
          : this.formGroup.get('sector')?.value;

      let formData = new FormData();
      formData.append('mail', this.formGroup.value['mail']);
      formData.append('password', this.formGroup.value['password']);
      formData.append('rut', this.formGroup.value['rut']);
      formData.append('name', this.formGroup.value['name']);
      formData.append('role', this.typeUser || '');
      formData.append('type', this.typeUser || '');
      formData.append('sector', sectorValue);

      if (
        this.typeUser === UserType.COMPANY ||
        this.typeUser === UserType.SUPPLIER
      ) {
        formData.append(
          'nameRepresentative',
          this.formGroup.value['nameRepresentative']
        );
        formData.append(
          'rutRepresentative',
          this.formGroup.value['rutRepresentative']
        );
        formData.append(
          'questionStrategy',
          this.formGroup.value['questionStrategy']?.toString() || '0'
        );
        formData.append(
          'questionSolution',
          this.formGroup.value['questionSolution']?.toString() || '0'
        );
        formData.append(
          'questionAdoption',
          this.formGroup.value['questionAdoption']?.toString() || '0'
        );
      }

      if (this.selectedFile) {
        formData.append('logo', this.selectedFile, this.selectedFile.name);
      }

      this.registroService.register(formData).subscribe({
        next: () => {
          console.log('Registro exitoso');
          // Redirigir o mostrar mensaje de éxito
        },
        error: (err) => {
          console.error(err);
          // Manejar errores de registro
        },
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
