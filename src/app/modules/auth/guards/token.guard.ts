import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, switchMap, map } from "rxjs";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { UserDocument } from "../interfaces/user";
@Injectable({
  providedIn: "root"
})
export class TokenGuard {
  constructor(
    private router: Router,
    private token: TokenService,
    private user: UserService
  ){}

  canActivate(): Observable<boolean | UrlTree>{
    let _user = {} as UserDocument;
    return this.user.user.pipe(
      switchMap(user => {
        _user = user;
        return this.token.get(user._id);
      }),
      map(tokenDoc => {
        if(!_user.admin) return true;

        if(!tokenDoc ||
          !tokenDoc.used ||
          tokenDoc.expirationDate.getTime() < new Date().getTime()
        ) return this.router.createUrlTree(["/token-validator"]);

        return true;
      })
    );
  }
  
}
