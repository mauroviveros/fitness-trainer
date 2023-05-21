import { Injectable, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, User, user } from "@angular/fire/auth";
import { Router } from "@angular/router";

import { MessageService } from "src/app/shared/services/message.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  readonly $authState = user(this.auth);

  readonly $user = user(this.auth);

  async sendEmailVerification(user: User){
    try {
      const response = await sendEmailVerification(user);
      this.message.success("Se ha enviado un correo para validar tu email");
      return response;
    } catch (error) { this.message.error(error as Error); throw error; }
  }

  async register(email: string, password: string){
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password).catch(error => this.message.error(error));
      this.message.success("Cuenta creada correctamente");
      this.router.navigate([""]);
      return response;
    } catch (error) { this.message.error(error as Error); throw error; }
  }

  async login(email: string, password: string){
    try {
      const response = await signInWithEmailAndPassword(this.auth, email, password).catch(error => this.message.error(error));
      this.router.navigate([""]);
      return response;
    } catch (error) { this.message.error(error as Error); throw error; }
  }

  async logout(){
    try {
      const response = await signOut(this.auth);
      this.router.navigate(["login"]);
      return response;
    } catch (error) { this.message.error(error as Error); throw error; }
  }
}
