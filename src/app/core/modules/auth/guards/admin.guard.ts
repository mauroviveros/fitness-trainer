import { Injectable, inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard {
  private readonly user = inject(UserService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean | UrlTree>{
    return this.user.$data.pipe(
      map(user => user._admin || this.router.createUrlTree([""]))
    );
  }
  
}
