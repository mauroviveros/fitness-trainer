import { Component } from "@angular/core";
import { FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { map, filter } from "rxjs";
import { UserDocumentOutput } from "src/app/modules/auth/interfaces/user";

import { UserService } from "src/app/modules/auth/services/user.service";


interface Field{
  _id         : string,
  icon        : string,
  label       : string,
  placeholder : string,
  validators  : ValidatorFn[],
  maxLength?  : number
}

@Component({
  selector: "core-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
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
    }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ){
    this.fields.forEach(field => {
      this.form.addControl(field._id, this.formBuilder.control("", field.validators));
      // this.form.get(field._id)?.disable();
    });

    this.route.queryParamMap.pipe(
      map(query => parseInt(query.get("mode") || "3")),
      filter(modeNum => {
        const bool = modeNum === 3 || modeNum === 2;
        if(!bool) this.router.navigate([]);
        return bool;
      }),
    ).subscribe(modeNum => {
      this.mode.number = modeNum;
      this.mode.icon = modeNum === 3 ? "edit" : "save";

      this.fields.forEach(field => {
        const control = this.form.get(field._id);
        if(modeNum === 3) control?.disable();
        if(modeNum === 2) control?.enable();
      });

    });

    this.userService.userObservable.subscribe(user => {
      if(!user) this.mode.new = true;
      this.fields.forEach(field => {
        this.form.get(field._id)?.setValue(user ? user[field._id] : null);
      });
    });
  }

  submit(){
    const options = { queryParams: { mode: this.mode.number === 3 ? 2 : 3 } };
    const fields = this.form.value as UserDocumentOutput;

    if(this.mode.number !== 2) return this.router.navigate([], options);
    if(this.form.invalid) return this.form.markAllAsTouched();

    let promise = () => this.userService.update(fields);
    if(this.mode.new) promise = () => this.userService.create(fields);

    this.isLoading = true;
    promise()
      .finally(() => this.isLoading = false)
      .then(() => this.snackBar.open("✅ Datos actualizados correctamente", undefined))
      .then(() => this.router.navigate([], options));

  }
}
