import { Injectable, inject } from "@angular/core";
import { Auth, User, UserCredential, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, filter, map, tap } from "rxjs";

import { MessageService } from "src/app/shared/services/message.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly auth     = inject(Auth);
  private readonly router   = inject(Router);
  private readonly message  = inject(MessageService);

  readonly $snapshot: Observable<User | null> = user(this.auth);

  readonly $user: Observable<User> = this.$snapshot.pipe(
    filter(user => user !== null),
    map(user => user as User)
  );

  constructor(){
    this.$snapshot.pipe(
      tap(user => user === null ? this.router.navigate(["/login"]) : null),
    ).subscribe();
  }

  async sendEmailVerification(user: User): Promise<void> {
    try{
      const response = await sendEmailVerification(user);
      this.message.success("Se ha enviado un correo para validar tu email");
      return response;
    } catch(error){ this.message.error(error as Error); throw error; }
  }

  async register(email: string, password: string): Promise<UserCredential> {
    try{
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      this.message.success("Cuenta creada correctamente");
      return response;
    } catch(error){ this.message.error(error as Error); throw error; }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try{
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch(error){ this.message.error(error as Error); throw error; }
  }

  async logout(): Promise<void> {
    try {
      return await signOut(this.auth);
    } catch (error) { this.message.error(error as Error); throw error; }
  }

}
