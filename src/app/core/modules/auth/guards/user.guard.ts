import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { UserService } from "../services/user.service";
import { DialogService } from "src/app/shared/services/dialog.service";

@Injectable({
  providedIn: "root"
})
export class UserGuard {
  private readonly router = inject(Router);
  private readonly user = inject(UserService);
  private readonly dialog = inject(DialogService);

  canActivate(): Observable<boolean> {
    return this.user.$snapshot.pipe(
      map(user => user.exists())
    );
  }
}
