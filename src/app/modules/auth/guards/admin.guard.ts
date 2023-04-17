import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard {
  constructor(
    private router: Router,
    private userService: UserService
  ){}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.user.pipe(
      map(user => user.admin),
      map(isAdmin => isAdmin ? true : this.router.createUrlTree(["/"]))
    );
  }
}
