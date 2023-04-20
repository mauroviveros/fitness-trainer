import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, filter, switchMap, tap } from "rxjs";

import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UserService } from "src/app/modules/auth/services/user.service";

@Injectable({
  providedIn: "root"
})
export class SplashScreenService {
  isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ){
    this.authService.userObservable.pipe(
      tap(user => !user ? this.setLoading(false) : null),
      filter(user => !!user),
      switchMap(() => combineLatest([this.userService.userObservable])),
    ).subscribe(() => {
      this.setLoading(false);
    });
  }

  public setLoading(value: boolean){ this.isLoading.next(value); }
}
