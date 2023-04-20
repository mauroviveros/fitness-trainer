import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class UserGuard{

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.userObservable.pipe(
      map(user => !!user),
      map(exist => exist ? true : this.router.createUrlTree(["/profile"]))
    );
  }
}
