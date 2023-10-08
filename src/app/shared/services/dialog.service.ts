import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@angular/fire/auth";
import { Observable, map, tap } from "rxjs";

import { AuthService } from "src/app/core/modules/auth/services/auth.service";

import { DialogComponent } from "../components/dialog/dialog.component";
import { VideoDialogComponent } from "../components/video-dialog/video-dialog.component";

import { DialogContent } from "../interfaces/dialog";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  open(dialogContent: DialogContent) : Observable<boolean> {
    return this.dialog.open(DialogComponent, { data: dialogContent }).afterClosed().pipe(
      map(action => action === dialogContent.action?._id)
    );
  }

  openVideoFrame(title: string, url: string) : Observable<boolean> {
    return this.dialog.open(VideoDialogComponent, {
      data: { title, url },
      width: "calc(100% - 2rem)",
      height: "calc(100% - 2rem)",
      maxWidth: "100%",
    }).afterClosed();
  }

  showEmailValidation(user: User) : Observable<boolean> {
    return this.open({
      title: "Verifica tu email",
      icon: "security",
      texts: ["Tu email no ha sido verificado todavía. Por favor verifica tu dirección de correo electrónico para acceder a todas las funcionalidades de nuestra plataforma."],
      action: { _id: "sendEmail", label: "Re Enviar Email" }
    }).pipe(
      tap(boolean => {
        if(boolean) this.auth.sendEmailVerification(user);
        else this.auth.logout();
      })
    );
  }

  showWelcome() : Observable<boolean> {
    return this.open({
      title: "¡Bienvenido!",
      icon: "waving_hand",
      texts: [
        "Para poder disfrutar de todos nuestros servicios, necesitamos que nos proporciones algunos datos personales. Por favor, completa los campos obligatorios para que podamos ofrecerte una experiencia personalizada.",
        "¡Gracias por elegirnos!"
      ]
    });
  }

  showUnsavedChanges() : Observable<boolean> {
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

  showConfirmDelete(title: string, document: string) : Observable<boolean> {
    return this.open({
      title,
      icon: "delete",
      texts: [
        `Vas a borrar: "${document}".`,
        "¿Estas seguro de que desea borrarlo?"
      ],
      action: { _id: "confirm", label: "Confirmar" }
    });
  }

}
