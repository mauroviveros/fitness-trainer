import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, User, user, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { BehaviorSubject, filter, map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  get user(){ return this._user.asObservable(); }
  get USER(){
    return this._user.pipe(
      filter(user => !!user),
      map(user => user as User)
    );
  }

  constructor(
    private auth: Auth,
  ){
    user(this.auth).subscribe(user => {
      this._user.next(user);
    });
    //// setPersistence(this.auth, { type: "LOCAL" });
  }

  login(email: string, password: string){ return signInWithEmailAndPassword(this.auth, email, password); }
  register(email: string, password: string){ return createUserWithEmailAndPassword(this.auth, email, password); }
  logout(){ return signOut(this.auth); }
}
