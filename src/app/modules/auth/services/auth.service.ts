import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, Observable } from "rxjs";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private _auth: AngularFireAuth){
    this._auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  public login(email: string, password: string): Observable<firebase.auth.UserCredential>{
    return from(this._auth.signInWithEmailAndPassword(email, password));
  }
}
