import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, authState, sendEmailVerification, User } from "@angular/fire/auth";
import { BehaviorSubject, lastValueFrom, from, map, switchMap, filter } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<User>({} as User);
  public get user(){ return this._user.pipe(filter((user) => !!user.uid)); }

  constructor(
    private auth: Auth,
  ){
    authState(this.auth).pipe(
      filter(user => !!user),
      map(user => user as User)
    ).subscribe(user => {
      this._user.next(user);
    });
    // setPersistence(this.auth, { type: "LOCAL" });
  }

  public getUser(){
    return authState(this.auth).pipe(
      filter(user => !!user),
      map(user => { return user as User; })
    );
  }

  public login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public sendEmailVerification(){
    return lastValueFrom(this.user.pipe(
      switchMap(user => sendEmailVerification(user))
    ));
  }

  public logout(){
    return signOut(this.auth);
  }
}
