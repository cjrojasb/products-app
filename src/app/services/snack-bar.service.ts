import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public launchSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }
}
