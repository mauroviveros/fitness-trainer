import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from '@services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  isSignedIn(): boolean {
    return !!this.auth.currentUser;
  }

  signIn(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.message.error(error);
      });
  }

  signUp(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.message.error(error);
      });
  }

  signOut(): Promise<void> {
    return this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.message.error(error);
      });
  }
}
