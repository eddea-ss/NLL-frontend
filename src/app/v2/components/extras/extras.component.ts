import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss',
})
export class ExtrasComponent {
  @Input() type: string = 'default';

  @Input() data: any[] = [];
}
