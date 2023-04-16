import { Component, Inject } from "@angular/core";
import { User } from "@angular/fire/auth";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

interface DialogData{
  user: User
}

@Component({
  selector: "app-unauthorized",
  templateUrl: "./unauthorized.component.html",
  styleUrls: ["./unauthorized.component.scss"]
})
export class UnauthorizedComponent {
  constructor(
    private dialog: MatDialogRef<UnauthorizedComponent>,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}


  sendEmailVerification(){
    this.auth.sendEmailVerification(this.data.user)
      .finally(() => this.dialog.close())
      .then(() => this.snackBar.open("✅ Te enviamos un correo para validar tu email", undefined));
  }
}
