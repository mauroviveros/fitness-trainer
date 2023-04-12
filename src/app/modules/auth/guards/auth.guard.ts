import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

import { Observable, map } from "rxjs";
import { UsersService } from "../../users/services/users.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard {

  constructor(
    private router: Router,
    private auth: AuthService,
    private users: UsersService
  ){}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.getUser().pipe(
      map(userAuth => {
        if(userAuth) this.users.updateUser(userAuth.uid, { verified: userAuth.emailVerified });
        if(userAuth?.emailVerified) return true;
        return this.router.parseUrl("/unverified");
      })
    );
  }
  
}
