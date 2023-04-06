import { Injectable } from "@angular/core";
import { Auth, setPersistence, signInWithEmailAndPassword } from "@angular/fire/auth";
import { from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private auth: Auth
  ){
    // setPersistence(this.auth, { type: "LOCAL" });
  }

  public login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}
