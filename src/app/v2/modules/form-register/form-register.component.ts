import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RegistroService } from '@core/services';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss',
})
export class FormRegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private registroService = inject(RegistroService);

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
    // Agregar preguntas de tipo "rating"
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

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.tipoRegistro = segments[0].path;
      this.initializeForm();
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
  }

  // Método para actualizar el valor del control cuando se selecciona una estrella
  rate(controlName: string, value: number): void {
    this.formGroup.get(controlName)?.setValue(value);
  }

  onSubmit(): void {
    if (!this.checkPassword(this.formGroup)) {
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

  checkPassword(formGroup: FormGroup): boolean {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirm')?.value;
    console.log(
      password,
      confirmPassword,
      password === confirmPassword,
      formGroup
    );
    return password === confirmPassword;
  }
}
