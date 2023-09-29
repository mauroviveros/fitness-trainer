import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription, switchMap, tap } from "rxjs";

import { AuthService } from "../../modules/auth/services/auth.service";
import { UserService } from "../../modules/auth/services/user.service";

@Component({
  selector: "core-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private readonly formBuider = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly subscriptions: Subscription[] = [];
  readonly $mode = new BehaviorSubject<number>(3);
  isLoading = false;

  readonly form: FormGroup = this.formBuider.group({
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    instagram: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    gender: [null, [Validators.required]],
    birthday: [null, [Validators.required]]
  });

  ngOnInit(){
    this.subscriptions.push(this.initMode());
    this.subscriptions.push(this.initUserData());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
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

  private initUserData(){
    return this.auth.$user.pipe(
      tap(user => {
        this.form.controls["email"].setValue(user?.email);
        this.form.controls["email"].disable();
      }),
      switchMap(() => this.user.$data),
    ).subscribe(data => {
      if(!data) this.$mode.next(1);
      else{
        const controlsName = Object.keys(this.form.controls).filter(key => key !== "email");
        controlsName.forEach(controlName => this.form.controls[controlName].setValue(data[controlName]));
      }
    });
  }


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
