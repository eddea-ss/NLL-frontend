import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleCardComponent } from '@shared/components';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Question } from '@shared/models';

@Component({
  selector: 'app-registro-formulario',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ArticleCardComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './registro-formulario.component.html',
  styleUrls: ['./registro-formulario.component.scss'],
})
export class RegistroFormularioComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  entityType = '';
  registroForm: FormGroup;
  isLoading = false;
  isPassMatch = false;

  // Propiedades para manejar la visibilidad de las contraseñas
  hidePassword = true;
  hideConfirmPassword = true;

  // Propiedad para manejar el hover de las estrellas
  hoverRatings: Record<string, number> = {};

  currentStepIndex = 0;

  // Definición de preguntas para cada tipo de entidad
  preguntas: Record<string, Question[]> = {
    Personal: [
      // Preguntas específicas para Personal (si las hay)
    ],
    Empresa: [
      {
        label: 'Nombre de la Empresa',
        name: 'nombreEmpresa',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT de la Empresa',
        name: 'rut',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      {
        label: 'Nombre del Representante',
        name: 'nombreRepresentante',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT del Representante',
        name: 'rutRepresentante',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      {
        label:
          '¿Qué tan clara es la estrategia digital de tu organización?',
        name: 'estrategiaDigital',
        type: 'rating',
        validators: [Validators.required]
      },
      {
        label:
          '¿Qué tan complejos son los desafíos para implementar soluciones de la Industria 4.0 en tu organización?',
        name: 'desafiosIndustria4',
        type: 'rating',
        validators: [Validators.required]
      },
      {
        label:
          '¿Qué tan alta es la prioridad de la adopción de tecnologías digitales y la integración de la Industria 4.0 en tu organización?',
        name: 'prioridadAdopcion',
        type: 'rating',
        validators: [Validators.required]
      }
    ],
    Proveedor: [
      // Asumiendo que proveedores tienen las mismas preguntas que empresas
      {
        label: 'Nombre de la Empresa',
        name: 'nombreEmpresa',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT de la Empresa',
        name: 'rut',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      {
        label: 'Nombre del Representante',
        name: 'nombreRepresentante',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT del Representante',
        name: 'rutRepresentante',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      {
        label:
          '¿Qué tan clara es la estrategia digital de tu organización?',
        name: 'estrategiaDigital',
        type: 'rating',
        validators: [Validators.required]
      },
      {
        label:
          '¿Qué tan complejos son los desafíos para implementar soluciones de la Industria 4.0 en tu organización?',
        name: 'desafiosIndustria4',
        type: 'rating',
        validators: [Validators.required]
      },
      {
        label:
          '¿Qué tan alta es la prioridad de la adopción de tecnologías digitales y la integración de la Industria 4.0 en tu organización?',
        name: 'prioridadAdopcion',
        type: 'rating',
        validators: [Validators.required]
      }
    ]
  };

  conversationSteps: any[] = [
    {
      message:
        '¡Hola! Soy tu asistente virtual. Te ayudaré a completar el formulario. ¿Cuál es tu nombre?',
      field: 'nombre',
      type: 'text',
      validators: [Validators.required]
    },
    {
      message:
        '¿Qué tipo de usuario eres? Por favor selecciona una opción:',
      field: 'tipoUsuario',
      type: 'select',
      options: [
        { value: 'Personal', label: 'Persona - Usuario individual' },
        {
          value: 'Empresa',
          label:
            'Empresa Industrial 4.0 de la Región de los Lagos'
        },
        { value: 'Proveedor', label: 'Proveedor de servicios' }
      ],
      validators: [Validators.required]
    }
    // Las demás preguntas se agregarán dinámicamente
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        tipoUsuario: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        confirmPassword: ['', [Validators.required]]
        // Campos dinámicos se agregarán después
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.currentStepIndex = 0;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Configurar el formulario según el tipo de usuario
  setupForm(): void {
    // Limpiar preguntas dinámicas previas
    this.clearAllDynamicFields();

    // Eliminar pasos adicionales en conversationSteps
    this.conversationSteps = this.conversationSteps.slice(0, 2);

    if (this.entityType && this.preguntas[this.entityType]) {
      this.preguntas[this.entityType].forEach(question => {
        if (!this.registroForm.contains(question.name)) {
          this.registroForm.addControl(
            question.name,
            this.fb.control('', question.validators)
          );
        }
        this.conversationSteps.push({
          message: question.label,
          field: question.name,
          type: question.type,
          options: question.options || null,
          validators: question.validators || null
        });
      });
    }

    // Agregar campos comunes al final
    this.conversationSteps.push(
      {
        message: 'Por favor, ingresa tu correo electrónico.',
        field: 'correo',
        type: 'text',
        validators: [Validators.required, Validators.email]
      },
      {
        message: 'Crea una contraseña segura.',
        field: 'password',
        type: 'password',
        validators: [Validators.required, this.passwordStrengthValidator],
        instruction:
          'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.'
      },
      {
        message: 'Confirma tu contraseña.',
        field: 'confirmPassword',
        type: 'password',
        validators: [Validators.required]
      }
    );
  }

  // Limpiar todos los campos dinámicos
  clearAllDynamicFields(): void {
    Object.keys(this.registroForm.controls).forEach(controlName => {
      if (
        ![
          'tipoUsuario',
          'correo',
          'password',
          'confirmPassword',
          'nombre'
        ].includes(controlName)
      ) {
        this.registroForm.removeControl(controlName);
      }
    });
  }

  // Validador personalizado para la contraseña
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      isValidLength;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  // Validador personalizado para el RUT chileno
  rutValidator(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    if (!rut) return null;

    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    if (isNaN(Number(body))) return { rutInvalid: true };

    let sum = 0,
      multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += Number(body.charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const rest = sum % 11;
    const calculatedDV =
      rest === 1 ? 'K' : rest === 0 ? '0' : String(11 - rest);

    return calculatedDV !== dv ? { rutInvalid: true } : null;
  }

  // Validador para confirmar contraseña
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const isValid = password === confirmPassword;
    return isValid ? null : { passwordsMismatch: true };
  }

  // Manejar la selección de valoración
  setRating(questionName: string, rating: number): void {
    this.registroForm.get(questionName)?.setValue(rating);
    this.registroForm.get(questionName)?.markAsTouched();
  }

  // Obtener la valoración actual para un campo específico
  getRating(questionName: string): number {
    return (
      this.hoverRatings[questionName] ||
      this.registroForm.get(questionName)?.value ||
      0
    );
  }

  // Manejar el hover de las estrellas
  hoverRating(questionName: string, rating: number): void {
    this.hoverRatings[questionName] = rating;
  }

  // Manejar el mouseleave de las estrellas
  leaveRating(questionName: string): void {
    this.hoverRatings[questionName] =
      this.registroForm.get(questionName)?.value || 0;
  }

  // Métodos para alternar la visibilidad de las contraseñas
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // Manejar el avance de las preguntas
  onQuestionAnswered(index: number): void {
    if (index !== this.currentStepIndex) {
      return;
    }
    const step = this.conversationSteps[index];
    const control = this.registroForm.get(step.field);
    if (control && control.valid) {
      if (step.field === 'tipoUsuario') {
        this.entityType = control.value;
        this.setupForm();
      }
      this.currentStepIndex++;
    }
  }

  // Manejar el envío del formulario
  onSubmit(): void {
    this.isLoading = true;
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const formValue = this.registroForm.value;

    // Construir el objeto de usuario según el tipo
    const usuario = {
      tipoUsuario: this.entityType,
      correo: formValue.correo,
      password: formValue.password,
      ...this.getDynamicFields(formValue)
    };
    // Aquí se enviaría el formulario al backend
    this.isLoading = false;
  }

  // Obtener campos dinámicos basados en el tipo de entidad
  getDynamicFields(formValue: any): any {
    const dynamicFields: any = {};
    this.conversationSteps.forEach(step => {
      if (
        ![
          'tipoUsuario',
          'correo',
          'password',
          'confirmPassword',
          'nombre'
        ].includes(step.field)
      ) {
        dynamicFields[step.field] = formValue[step.field];
      }
    });
    return dynamicFields;
  }

  // Resetear el formulario
  onReset(): void {
    this.registroForm.reset();
    this.currentStepIndex = 0;
    this.conversationSteps = this.conversationSteps.slice(0, 2);
    this.clearAllDynamicFields();
  }
}
