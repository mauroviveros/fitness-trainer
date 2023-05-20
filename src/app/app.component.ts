import { Component, OnDestroy, OnInit, inject } from "@angular/core";

import { AuthService } from "./core/modules/auth/services/auth.service";
import { UserService } from "./core/modules/auth/services/user.service";

import { Subscription, switchMap, tap } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <core-splash-screen *ngIf="isLoading"></core-splash-screen>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private subscription?: Subscription;
  isLoading = false;

  ngOnInit(){
    this.subscription = this.initLoadingChecker();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initLoadingChecker(){
    return this.auth.$authState.pipe(
      tap(() => this.isLoading = true),
      switchMap(() => this.user.$data),
    ).subscribe(() => this.isLoading = false);
  }
}
