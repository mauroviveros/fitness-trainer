import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription, filter, switchMap, take, tap } from "rxjs";
import { AuthService } from "../../modules/auth/services/auth.service";
import { UserService } from "../../modules/auth/services/user.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { MediaService } from "src/app/shared/services/media.service";

import { environment } from "src/environments/environment";

@Component({
  selector: "core-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly formBuider = inject(FormBuilder);
  private readonly router     = inject(Router);
  private readonly auth   = inject(AuthService);
  private readonly user   = inject(UserService);
  private readonly dialog = inject(DialogService);
  private readonly media  = inject(MediaService);
  private readonly subscriptions: Subscription[] = [];

  readonly genres = this.user.genres;
  readonly MAX_LENGTH = environment.MAX_LENGTH;
  readonly $mode = new BehaviorSubject<number>(3);
  readonly $isMobile = this.media.$isMobile;
  isLoading = false;

  readonly form: FormGroup = this.formBuider.group({
    name: [null, [Validators.required, Validators.maxLength(this.MAX_LENGTH)]],
    surname: [null, [Validators.required, Validators.maxLength(this.MAX_LENGTH)]],
    instagram: [null, [Validators.required, Validators.maxLength(30)]],
    email: [null, [Validators.required, Validators.email]],
    gender: [null, [Validators.required]],
    birthday: [null, [Validators.required]]
  });

  ngOnInit(){
    this.subscriptions.push(this.initMode());
    this.subscriptions.push(this.initUserData());
    this.subscriptions.push(this.initNewUser());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initMode(){
    return this.$mode.subscribe(mode => {
      const controlsName = Object.keys(this.form.controls).filter(key => key !== "email");

      controlsName.forEach(controlName => {
        if(mode !== 3) this.form.controls[controlName].enable();
        else this.form.controls[controlName].disable();
      });
    });
  }

  private initNewUser(){
    return this.user.$snapshot.pipe(
      filter(user => !user.exists()),
      take(1),
      tap(() => this.$mode.next(1)),
      tap(() => this.dialog.showWelcome().subscribe())
    ).subscribe();
  }

  private initUserData(){
    return this.auth.$user.pipe(
      tap(user => {
        this.form.controls["email"].setValue(user.email);
        this.form.controls["email"].disable();
      }),
      switchMap(() => this.user.$data),
    ).subscribe(data => {
      const controlsName = Object.keys(this.form.controls).filter(key => key !== "email");
      controlsName.forEach(controlName => this.form.controls[controlName].setValue(data[controlName]));
    });
  }

  logout(){ this.auth.logout(); }

  submit(){
    if(this.form.invalid) return;

    this.isLoading = true;
    this.user.upload(this.form.value, this.$mode.value === 1)
      .then(() => {
        this.form.markAsPristine();
        if(this.$mode.value === 1) this.router.navigate([""]);
      }).finally(() => this.isLoading = false);
  }
}
