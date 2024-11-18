import { Component } from '@angular/core';
import { SugeridosComponent } from '@v2/components';

@Component({
  selector: 'app-provider-search',
  standalone: true,
  imports: [SugeridosComponent],
  templateUrl: './provider-search.component.html',
  styleUrl: './provider-search.component.scss',
})
export class ProviderSearchComponent {}
