import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly snackBar = inject(MatSnackBar);

  error(error: Error) {
    const message = `❌ ${error.message}`;
    return this.snackBar.open(message, 'close', { duration: 2000 });
  }

  success(message: string) {
    return this.snackBar.open(message, 'close', { duration: 2000 });
  }
}
