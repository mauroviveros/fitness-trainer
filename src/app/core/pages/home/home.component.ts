import { Component, inject } from "@angular/core";
import { AuthService } from "../../modules/auth/services/auth.service";
import { Router } from "@angular/router";

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
}