import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";

import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UsersService } from "src/app/modules/users/services/users.service";

@Injectable({
  providedIn: "root"
})
export class SplashScreenService {
  public isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ){
    combineLatest([this.authService.user]).subscribe(() => {
      this.setLoading(false);
    });
  }

  public setLoading(value: boolean){ this.isLoading.next(value); }
}
