import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@angular/fire/auth";

import { AuthService } from "src/app/core/modules/auth/services/auth.service";
import { DialogComponent } from "../component/dialog/dialog.component";

interface DialogAction{
  _id: string
  label: string
  close?: boolean
}

interface DialogContent{
  title: string
  icon: string
  text: string
  action?: DialogAction
}

@Injectable({
  providedIn: "root"
})
export class DialogService {
  private auth = inject(AuthService);
  private dialog = inject(MatDialog);

  open(dialogContent: DialogContent){
    return this.dialog.open(DialogComponent, { data: dialogContent });
  }

  showEmailValidation(user: User){
    this.open({
      title: "Verifica tu email",
      icon: "security",
      text: "Tu email no ha sido verificado todavía. Por favor verifica tu dirección de correo electrónico para acceder a todas las funcionalidades de nuestra plataforma.",
      action: { _id: "sendEmail", label: "Enviar Email" }
    }).beforeClosed().subscribe(() => {
      this.auth.sendEmailVerification(user);
    });
  }
}
