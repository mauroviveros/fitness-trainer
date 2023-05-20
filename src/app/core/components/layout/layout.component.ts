import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { UserService } from "../../modules/auth/services/user.service";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "core-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  animations: [
    trigger("expand", [
      state("true", style({ "max-height": "100vh" })),
      state("false", style({ "max-height": "0" })),
      transition("false => true", animate("300ms"))
    ])
  ]
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly user = inject(UserService);
  private readonly router = inject(Router);
  private subscriptions: Subscription[] = [];
  userData?: UserDoc | null;
  expand = true;

  ngOnInit(): void {
    this.subscriptions.push(this.initUserData());
    this.subscriptions.push(this.initNavigationCatch());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  private initNavigationCatch(){
    return this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.expand = false;
        setTimeout(() => { this.expand = true; }, 100);
      }
    });
  }

  private initUserData(){
    return this.user.$data.pipe(
    ).subscribe(data => {
      this.userData = data;
    });
  }
}
