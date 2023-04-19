import { Component, Inject } from "@angular/core";
import { User } from "@angular/fire/auth";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { AuthService } from "../../services/auth.service";

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
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}


  sendEmailVerification(){
    this.auth.sendEmailVerification(this.data.user).finally(() => this.dialog.close());
  }
}
