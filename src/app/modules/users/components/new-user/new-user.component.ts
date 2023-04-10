import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs";

import { UsersService } from "../../services/users.service";
import { Role } from "../../interfaces/users";
import { MatSnackBar } from "@angular/material/snack-bar";

interface RoleSelect {
  key: string,
  value: Role
}

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"]
})
export class NewUserComponent {
  public isLoading = false;

  public roles: RoleSelect[] = [
    { key: "Administrador", value: Role.admin },
    { key: "Cliente", value: Role.user }
  ];

  public form: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    rol: [null, [Validators.required]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _users: UsersService
  ){
  }

  public submit(){
    if(this.form.invalid) return;
    const { email, ...fields } = this.form.value;

    this.isLoading = true;

    this._users.createUser(email, fields).pipe(
      finalize(()=> this.isLoading = false )
    ).subscribe({
      complete: () => { this._snackBar.open("✅ Usuario creado correctamente", "cerrar", { panelClass: ["success-snackbar"] }); },
      error: (error) => { this._snackBar.open(`❌ ${error}`, "cerrar", { panelClass: ["error-snackbar"] }); }
    });
  }
}
