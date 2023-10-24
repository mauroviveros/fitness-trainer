import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Subscription, switchMap, tap } from "rxjs";

import { AuthService } from "./core/modules/auth/services/auth.service";
import { UserService } from "./core/modules/auth/services/user.service";

@Component({
  selector: "app-root",
  template: `
    <core-splash-screen *ngIf="isLoading"></core-splash-screen>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly meta = inject(Meta);
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private subscription?: Subscription;
  isLoading = true;


  constructor(){
    const content = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    this.meta.updateTag({ name: "theme-color", content });
  }

  ngOnInit(){
    this.subscription = this.initLoadingChecker();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initLoadingChecker(){
    return this.auth.$snapshot.pipe(
      tap(user => this.isLoading = !!user),
      switchMap(() => this.user.$snapshot),
    ).subscribe(() => this.isLoading = false);
  }
}
