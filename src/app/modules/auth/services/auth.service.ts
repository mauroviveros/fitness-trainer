import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, authState, sendEmailVerification, User } from "@angular/fire/auth";
import { firstValueFrom, from, map, switchMap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private auth: Auth,
  ){
    // console.log(this.auth.app);
    // setPersistence(this.auth, { type: "LOCAL" });
  }

  public getUser(){
    return authState(this.auth).pipe(
      map(user => {
        if(user) return user;
        return {} as User;
      })
    );
  }

  public login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public sendEmailVerification(){
    return firstValueFrom(this.getUser().pipe(
      switchMap(user => sendEmailVerification(user))
    ));
  }

  public logout(){
    return signOut(this.auth);
  }
}
