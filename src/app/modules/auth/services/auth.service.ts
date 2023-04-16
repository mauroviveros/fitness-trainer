import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Auth, signInWithEmailAndPassword, signOut, User, user, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { BehaviorSubject, filter, map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  userObservable = user(this.auth);
  get user(){
    return this._user.pipe(
      filter(user => !!user),
      map(user => user as User)
    );
  }

  constructor(
    private auth: Auth,
    private snackBar: MatSnackBar
  ){
    this.userObservable.subscribe(user => {
      this._user.next(user);
    });
    //// setPersistence(this.auth, { type: "LOCAL" });
  }

  catchError(error: Error){
    if(error.message.includes("(auth/user-not-found)")) error.message = "No existe ese usuario";
    if(error.message.includes("(auth/email-already-in-use)")) error.message = "Ya existe ese email";

    this.snackBar.open(error.message, "cerrar", { duration: 5000 });
    throw error;
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password).catch(error => this.catchError(error));
  }
  register(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password).catch(error => this.catchError(error));
  }
  logout(){ return signOut(this.auth); }
}
