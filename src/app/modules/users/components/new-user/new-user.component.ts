import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs";

import { UsersService } from "../../services/users.service";
import { Role } from "../../interfaces/users";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";

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
    { key: "Administrador", value: "ADMIN" },
    { key: "Cliente", value: "USER" }
  ];

  public form: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    role: [null, [Validators.required]]
  });

  constructor(
    private dialogRef: MatDialogRef<NewUserComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _users: UsersService
  ){
  }

  public submit(){
    if(this.form.invalid) return;
    const fields = this.form.value;
    fields.dateCreated = new Date();
    fields.verified = false;

    this.isLoading = true;

    this._users.createUser(fields.email, fields).pipe(
      finalize(()=> this.isLoading = false )
    ).subscribe({
      complete: () => {
        this.dialogRef.close();
        this._snackBar.open("✅ Usuario creado correctamente", "cerrar", { panelClass: ["success-snackbar"] });
      },
      error: (error) => { this._snackBar.open(`❌ ${error}`, "cerrar", { panelClass: ["error-snackbar"] }); }
    });
  }
}
