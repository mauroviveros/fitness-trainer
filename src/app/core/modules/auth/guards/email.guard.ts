import { Injectable, inject } from "@angular/core";
import { UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";

import { AuthService } from "../services/auth.service";
import { DialogService } from "src/app/shared/services/dialog.service";

@Injectable({
  providedIn: "root"
})
export class EmailGuard {
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(DialogService);

  canActivate(): Observable<boolean | UrlTree>{
    return this.auth.$user.pipe(
      map(user => {
        if(user !== null && !user?.emailVerified){
          this.dialog.showEmailValidation(user).subscribe();
          this.auth.logout();
        }
        return user?.emailVerified || false;
      }),
    );
  }
  
}
