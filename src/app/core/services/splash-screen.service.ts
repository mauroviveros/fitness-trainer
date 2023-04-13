import { Injectable } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
import { BehaviorSubject, combineLatest, switchMap, filter, tap } from "rxjs";

import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UsersService } from "src/app/modules/users/services/users.service";

@Injectable({
  providedIn: "root"
})
export class SplashScreenService {
  public isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private usersService: UsersService,
  ){
    authState(this.auth).pipe(
      tap(user => { if(!user) this.setLoading(false);}),
      filter(user => !!user),
      switchMap(() => combineLatest([this.authService.user, this.usersService.user]))
    ).subscribe(() => { this.setLoading(false); });
  }

  public setLoading(value: boolean){ this.isLoading.next(value); }
}
