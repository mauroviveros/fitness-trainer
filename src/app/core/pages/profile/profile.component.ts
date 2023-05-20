import { Component, OnInit, inject } from "@angular/core";
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
export class ProfileComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private readonly formBuider = inject(FormBuilder);
  private readonly router = inject(Router);
  private subscriptions: Subscription[] = [];

  isLoading = false;
  $mode = new BehaviorSubject<number>(3);

  form: FormGroup = this.formBuider.group({
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]]
  });

  ngOnInit(){
    this.subscriptions.push(this.initMode());
    this.subscriptions.push(this.initUserData());
  }

  private initMode(){
    return this.$mode.subscribe($mode => {
      const controlsName = Object.keys(this.form.controls).filter(key => key !== "email");

      controlsName.forEach(controlName => {
        if($mode !== 3) this.form.controls[controlName].enable();
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
    this.user.upload(this.form.value)
      .then(() => {
        this.form.markAsPristine();
        this.router.navigate([""]);
      })
      .finally(() => this.isLoading = false);
  }

}
