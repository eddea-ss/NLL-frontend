import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';
import { ArticleModalComponent } from '@v2/v2.module';

@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [RouterLink, NavbarComponent, TruncatePipe, ArticleModalComponent],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss',
})
export class ExtrasComponent {
  @Input() type: string = 'default';

  @Input() data: any[] = [];
}
