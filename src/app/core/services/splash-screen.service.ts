import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, filter, switchMap, tap } from "rxjs";

import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UsersService } from "src/app/modules/users/services/users.service";

@Injectable({
  providedIn: "root"
})
export class SplashScreenService {
  isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ){
    this.authService.userObservable.pipe(
      tap(user => !user ? this.setLoading(false) : null),
      filter(user => !!user),
      switchMap(() => combineLatest([this.usersService.user])),
    ).subscribe(() => {
      this.setLoading(false);
    });
  }

  public setLoading(value: boolean){ this.isLoading.next(value); }
}
