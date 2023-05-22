import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../modules/auth/services/auth.service";

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(){ this.auth.logout(); }
  profile(){ this.router.navigate(["profile"]); }
  exercises(){ this.router.navigate(["exercises"]); }
}