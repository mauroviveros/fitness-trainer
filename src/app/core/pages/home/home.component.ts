import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../../modules/auth/services/auth.service";
import { UserService } from "../../modules/auth/services/user.service";

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  private auth = inject(AuthService);
  private user = inject(UserService);

  logout(){ this.auth.logout(); }
}