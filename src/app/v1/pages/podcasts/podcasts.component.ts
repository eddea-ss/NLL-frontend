import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodcastsComponent {

}
