import { Component, inject, OnInit } from '@angular/core';
import { SnackbarService } from '@v2/services';
import { CommonModule } from '@angular/common';
import { SnackbarMessage } from '@v2/models';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit {
  message: SnackbarMessage | null = null;
  show = false;

  private snackbarService = inject(SnackbarService);

  ngOnInit() {
    this.snackbarService.snackbar$.subscribe((msg) => {
      if (msg) {
        this.message = msg;
        this.show = true;
        setTimeout(() => {
          this.dismiss();
        }, msg.duration || 3000);
      }
    });
  }

  dismiss() {
    this.show = false;
    setTimeout(() => {
      this.message = null;
    }, 300); // Duración de la transición de opacidad
  }
}
