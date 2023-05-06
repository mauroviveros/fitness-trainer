import { Component } from "@angular/core";
import { SplashScreenService } from "./core/services/splash-screen.service";

@Component({
  selector: "app-root",
  template: `
    <core-splash-screen *ngIf="isLoading"></core-splash-screen>
    <router-outlet></router-outlet>
  `,
  styles: [`:host{ display: flex; flex: 1; flex-direction: column; width: 100%; align-items: center; } `],
})
export class AppComponent {
  public isLoading = true;

  constructor(private splashScreen: SplashScreenService){
    this.splashScreen.isLoading.subscribe(bool => { this.isLoading = bool; });
  }
}
