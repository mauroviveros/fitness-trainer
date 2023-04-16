import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, switchMap, map, of, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { UnauthorizedComponent } from "../components/unauthorized/unauthorized.component";
import { User } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class EmailGuard {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService
  ){}

  canActivate(): Observable<boolean | UrlTree> {
    let _user: User = {} as User;
    return this.auth.user.pipe(
      tap(user => _user = user),
      switchMap(user => user.emailVerified ? of(user) : this.auth.logout()),
      tap(user => {
        if(user) return;

        this.dialog.open(UnauthorizedComponent, { data: { user: _user } });
      }),
      map(user => user ? true : this.router.createUrlTree(["/login"]))
    );
  }
}
