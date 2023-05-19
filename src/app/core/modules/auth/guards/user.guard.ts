import { Injectable, inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";

import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class UserGuard {
  private readonly user = inject(UserService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.user.$data.pipe(
      map(() => true),
      catchError(() => of(this.router.createUrlTree(["profile"])))
    );
  }

  // canDeactivate(): Observable<boolean> | boolean{
  //   this.auth.logout();
  //   return true;
  // }
  
}
