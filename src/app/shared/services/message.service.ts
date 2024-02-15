import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string, action?: string): void {
    this.snackBar.open(`✅ ${message}`, action);
  }
}
