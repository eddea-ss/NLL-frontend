// src/app/services/snackbar.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, duration: number = 3000, action: string = 'OK'): Observable<any> {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'], // Clase personalizada
    };

    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, action, config);
    return snackBarRef.onAction();
  }
}
