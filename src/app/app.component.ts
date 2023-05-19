import { Component, inject } from "@angular/core";

import { AuthService } from "./core/modules/auth/services/auth.service";
import { UserService } from "./core/modules/auth/services/user.service";

import { finalize, switchMap, tap, of } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <core-splash-screen *ngIf="isLoading"></core-splash-screen>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  isLoading = false;

  ngOnInit(){
    this.auth.$user.pipe(
      tap(() => this.isLoading = true),
      switchMap(() => this.user.$data),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }
}
