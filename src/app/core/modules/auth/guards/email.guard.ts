import { Injectable, inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, map, tap } from "rxjs";

import { AuthService } from "../services/auth.service";
import { DialogService } from "src/app/shared/services/dialog.service";

@Injectable({
  providedIn: "root"
})
export class EmailGuard {
  private readonly router = inject(Router);
  private readonly auth   = inject(AuthService);
  private readonly dialog = inject(DialogService);

  canActivate(): Observable<boolean | UrlTree>{
    return this.auth.$user.pipe(
      tap(user => user.emailVerified ? null : this.dialog.showEmailValidation(user).subscribe()),
      tap(user => user.emailVerified ? null : this.auth.logout()),
      map(user => user.emailVerified)
    );
  }
  
}
