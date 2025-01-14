import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss',
})
export class ExtrasComponent {
  @Input() type: string = 'default';
}
