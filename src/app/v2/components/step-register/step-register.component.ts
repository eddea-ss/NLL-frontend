import { Component, Input } from '@angular/core';
import { Step } from '@v2/models/step.model';

@Component({
  selector: 'app-step-register',
  standalone: true,
  imports: [],
  templateUrl: './step-register.component.html',
  styleUrl: './step-register.component.scss',
})
export class StepRegisterComponent {
  @Input() steps: Step[] = [];
}
