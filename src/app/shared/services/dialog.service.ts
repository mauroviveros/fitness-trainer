import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@angular/fire/auth";
import { map } from "rxjs";

import { AuthService } from "src/app/core/modules/auth/services/auth.service";

import { DialogComponent } from "../components/dialog/dialog.component";

import { DialogContent } from "../interfaces/dialog";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  open(dialogContent: DialogContent){
    return this.dialog.open(DialogComponent, { data: dialogContent })
      .afterClosed().pipe(map(action => action === dialogContent.action));
  }

  showEmailValidation(user: User){
    this.open({
      title: "Verifica tu email",
      icon: "security",
      texts: ["Tu email no ha sido verificado todavía. Por favor verifica tu dirección de correo electrónico para acceder a todas las funcionalidades de nuestra plataforma."],
      action: { _id: "sendEmail", label: "Enviar Email" }
    }).subscribe(boolean => {
      if(boolean) this.auth.sendEmailVerification(user);
    });
  }

  showWelcome(){
    this.open({
      title: "¡Bienvenido!",
      icon: "waving_hand",
      texts: [
        "Para poder disfrutar de todos nuestros servicios, necesitamos que nos proporciones algunos datos personales. Por favor, completa los campos obligatorios para que podamos ofrecerte una experiencia personalizada.",
        "¡Gracias por elegirnos!"
      ]
    });
  }

  showUnsavedChanges(){
    this.open({
      title: "¡Cambios no guardados!",
      icon: "error",
      texts: [
        "Hay cambios pendientes que no se guardarán si sales.",
        "¿Estas seguro de que deseas salir sin guardar los cambios?"
      ],
      action: { _id: "aggre", label: "Aceptar" }
    });
  }

  showMandatoryProfile(){
    return this.open({
      title: "¡Formulario obligatorio!",
      icon: "error",
      texts: [
        "Es obligatorio completar el formulario antes de poder continuar. Por favor, proporciona la información requerida para continuar",
        "Si lo desea puede cerrar la sesión"
      ],
      action: { _id: "logout", label: "Cerrar Sesión" }
    });
  }
}
