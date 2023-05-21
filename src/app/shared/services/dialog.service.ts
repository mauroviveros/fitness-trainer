import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@angular/fire/auth";
import { map, tap } from "rxjs";

import { AuthService } from "src/app/core/modules/auth/services/auth.service";

import { DialogComponent } from "../components/dialog/dialog.component";

import { DialogContent } from "../interfaces/dialog";
import { VideoDialogComponent } from "../components/video-dialog/video-dialog.component";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  open(dialogContent: DialogContent){
    return this.dialog.open(DialogComponent, { data: dialogContent })
      .afterClosed().pipe(map(action => action === dialogContent.action?._id));
  }

  openVideoFrame(title: string, url: string){
    return this.dialog.open(VideoDialogComponent, {
      data: { title, url },
      width: "calc(100% - 2rem)",
      height: "calc(100% - 2rem)",
      maxWidth: "100%",
    }).afterClosed();
  }

  showEmailValidation(user: User){
    return this.open({
      title: "Verifica tu email",
      icon: "security",
      texts: ["Tu email no ha sido verificado todavía. Por favor verifica tu dirección de correo electrónico para acceder a todas las funcionalidades de nuestra plataforma."],
      action: { _id: "sendEmail", label: "Enviar Email" }
    }).pipe(
      tap(boolean => { if(boolean) this.auth.sendEmailVerification(user); })
    );
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
    }).pipe(
      tap(boolean => { if(boolean) this.auth.logout(); })
    );
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
    return this.open({
      title: "¡Cambios no guardados!",
      icon: "error",
      texts: [
        "Hay cambios pendientes que no se guardarán si sales.",
        "¿Estas seguro de que deseas salir sin guardar los cambios?"
      ],
      action: { _id: "aggre", label: "Aceptar" }
    });
  }

  showConfirmDelete(title: string, docName: string){
    return this.open({
      title,
      icon: "delete",
      texts: [
        `Vas a borrar: "${docName}".`,
        "¿Estas seguro de que desea borrarlo?"
      ],
      action: { _id: "confirm", label: "Confirmar" }
    });
  }
}
