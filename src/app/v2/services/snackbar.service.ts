// src/app/core/services/snackbar.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SnackbarMessage } from '@v2/models';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new Subject<SnackbarMessage | null>();
  snackbar$: Observable<SnackbarMessage | null> =
    this.snackbarSubject.asObservable();

  show(message: string, duration: number = 3000) {
    this.snackbarSubject.next({ text: message, duration });
  }

  dismiss() {
    this.snackbarSubject.next(null);
  }
}
