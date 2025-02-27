import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState
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

  readonly isAuthenticated = signal<boolean>(false);

  constructor(){
    authState(this.auth).subscribe(authState => {
      this.isAuthenticated.set(!!authState);
    });
  }

  signIn(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {this.router.navigate(['/'])})
      .catch(error => {this.message.error(error)});
  }

  signUp(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {this.message.error(error)});
  }

  signOut(): Promise<void> {
    return this.auth
      .signOut()
      .then(() => {this.router.navigate(['/login'])})
      .catch(error => {this.message.error(error)});
  }
}
