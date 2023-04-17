import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, map, filter, firstValueFrom } from "rxjs";
import { UserDocumentOutput } from "src/app/modules/auth/interfaces/user";

import { UserService } from "src/app/modules/auth/services/user.service";
import { WelcomeDialogComponent } from "../../components/welcome-dialog/welcome-dialog.component";
import { AuthService } from "src/app/modules/auth/services/auth.service";


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
  private subscription?: Subscription;

  mode      = { icon: "edit", number: 2, new: false };
  form      = this.formBuilder.group({});
  isLoading = false;


  fields: Field[] = [
    {
      _id: "name",
      icon: "person",
      label: "Nombre",
      placeholder: "Ingrese su nombre",
      validators: [Validators.required, Validators.maxLength(24)],
      maxLength: 24
    },
    {
      _id: "surname",
      icon: "badge",
      label: "Apellido",
      placeholder: "Ingrese su apellido",
      validators: [Validators.required, Validators.maxLength(24)],
      maxLength: 24
    },
    {
      _id: "email",
      icon: "email",
      label: "Email",
      placeholder: "Ingrese su email",
      validators: [Validators.required, Validators.email],
      disabled: true
    }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ){
    this.fields.forEach(field => {
      this.form.addControl(field._id, this.formBuilder.control("", field.validators));
    });

    this.route.queryParamMap.pipe(
      map(query => parseInt(query.get("mode") || "3")),
      filter(modeNum => {
        if(this.mode.new) this.router.navigate(["/profile"], { queryParams: { mode: 2 }});
        return modeNum === 3 || modeNum === 2;
      }),
    ).subscribe(modeNum => {
      this.mode.number = modeNum;
      this.mode.icon = modeNum === 3 ? "edit" : "save";

      this.fields.forEach(field => {
        const control = this.form.get(field._id);
        if(modeNum === 2 && !field.disabled) control?.enable();
        else control?.disable();
      });

    });

    firstValueFrom(this.authService.user).then(({ email }) => {
      this.subscription = this.userService.userObservable.subscribe(user => {
        this.mode.new = !user;

        if(this.mode.new){
          this.dialog.open(WelcomeDialogComponent);
          this.router.navigate(["/profile"], { queryParams: { mode: 2 } });
        }
        return this.fields.forEach(field => {
          let value = user ? user[field._id] : null;
          if(field._id === "email") value = email;
          this.form.get(field._id)?.setValue(value);
        });
      });
    });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  submit(){
    const options = { queryParams: { mode: this.mode.number === 3 ? 2 : 3 } };
    const fields = this.form.getRawValue() as UserDocumentOutput;

    if(this.mode.number !== 2) return this.router.navigate([], options);
    if(this.form.invalid) return this.form.markAllAsTouched();

    let promise = () => this.userService.update(fields);
    if(this.mode.new) promise = () => this.userService.create(fields);

    this.isLoading = true;
    const _new = this.mode.new;
    promise()
      .finally(() => this.isLoading = false)
      .then(() => this.snackBar.open("✅ Datos actualizados correctamente", undefined))
      .then(() => {
        if(_new) return this.router.navigate(["/"]);
        return this.router.navigate(["/profile"], options);
      });

  }
}
