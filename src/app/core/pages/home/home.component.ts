import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../modules/auth/services/auth.service";
import { UserService } from "../../modules/auth/services/user.service";

import { UserDoc } from "src/app/shared/interfaces/user";
import { tap } from "rxjs";

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private readonly router = inject(Router);

  isLoading = true;
  data?: UserDoc | null;

  ngOnInit(){
    this.user.$data.pipe(
      tap(() => this.isLoading = true),
    ).subscribe(data => {
      this.isLoading = false;
      this.data = data;
    });
  }

  logout(){ this.auth.logout(); }
  profile(){ this.router.navigate(["profile"]); }
  exercises(){ this.router.navigate(["exercises"]); }
}