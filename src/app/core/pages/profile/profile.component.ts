import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Subscription, firstValueFrom } from "rxjs";

import { UserService } from "src/app/modules/auth/services/user.service";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { ProfileService } from "../../services/profile.service";

import { UserDocumentOutput } from "src/app/modules/auth/interfaces/user";
import { environment } from "src/environments/environment";

import { WelcomeDialogComponent } from "../../components/welcome-dialog/welcome-dialog.component";


interface Field{
  _id         : string,
  icon        : string,
  label       : string,
  placeholder : string,
  validators  : ValidatorFn[],
  maxLength?  : number,
  disabled?   : true
}

@Component({
  selector: "core-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnDestroy{
  private subscriptions: Subscription[] = [];
  private _mode = new BehaviorSubject<number>(3);
  mode      = 3;
  isLoading = false;
  form      = this.formBuilder.group({});

  fields: Field[] = [
    {
      _id: "name", icon: "person", label: "Nombre",
      placeholder: "Ingrese su nombre", maxLength: environment.MAX_LENGTH,
      validators: [Validators.required, Validators.maxLength(environment.MAX_LENGTH)]
    },
    {
      _id: "surname", icon: "badge", label: "Apellido",
      placeholder: "Ingrese su apellido", maxLength: environment.MAX_LENGTH,
      validators: [Validators.required, Validators.maxLength(environment.MAX_LENGTH)]
    },
    {
      _id: "email", icon: "email", label: "Email",
      placeholder: "Ingrese su email", disabled: true,
      validators: [Validators.required, Validators.email]
    }
  ];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService
  ){
    this.fields.forEach(field => {
      this.form.addControl(field._id, this.formBuilder.control("", field.validators));
    });

    const subscription = this._mode.asObservable().subscribe(mode => {
      this.fields.forEach(field => {
        const control = this.form.get(field._id);
        if(mode !== 3 && !field.disabled) control?.enable();
        else control?.disable();
      });
    });
    this.subscriptions.push(subscription);

    firstValueFrom(this.authService.user).then(({ email }) => {
      const subscription = this.userService.userObservable.subscribe(user => {
        this.updateMode(!user ? 1 : 3);

        if(this.mode === 1) this.dialog.open(WelcomeDialogComponent);

        this.fields.forEach(field => {
          let value = user ? user[field._id] : null;
          if(field._id === "email") value = email;
          this.form.get(field._id)?.setValue(value);
        });
      });
      this.subscriptions.push(subscription);
    });
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => { subscription.unsubscribe(); });
  }
  private updateMode(num: number){ this.mode = num; this._mode.next(num); }
  closeEdit(){ this.updateMode(3); }

  updateFile(event: Event){
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if(!file) return;
    this.isLoading = true;
    this.profileService.uploadPicture(file)
      .finally(() => this.isLoading = false);
  }

  submit(){
    if(this.mode === 3) return this.updateMode(2);
    if(this.form.invalid) return this.form.markAllAsTouched();

    const isNew = this.mode === 1;
    const fields = this.form.getRawValue() as UserDocumentOutput;
    let promise = () => this.userService.update(fields);
    if(this.mode === 1) promise = () => this.userService.create(fields);

    this.isLoading = true;
    promise()
      .finally(() => this.isLoading = false)
      .then(() => { if(isNew) this.router.navigate(["/"]); });

  }
}
