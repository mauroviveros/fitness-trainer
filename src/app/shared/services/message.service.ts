import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private readonly snackBar = inject(MatSnackBar);

  private catchError(error: Error): Error{
    if(error.message.includes("(auth/email-already-in-use)")) error.message = "Ya existe ese email";
    if(error.message.includes("(auth/invalid-email)")) error.message = "Ingresa un email valido";
    if(error.message.includes("(auth/weak-password)")) error.message = "La contraseña es muy debil";
    if(error.message.includes("(auth/user-not-found)") || error.message.includes("(auth/wrong-password)")){
      error.message = "Usuario o contraseña incorrecta";
    }

    return error as Error;
  }


  error(error: Error): void{
    if(!error) error = new Error("ERROR: error is not defined");
    error = this.catchError(error);

    this.snackBar.open(`❌ ${error.message}`, "cerrar", { duration: 3000 });
    throw error;
  }

  success(message: string): void{
    this.snackBar.open(`✅ ${message}`);
  }
}
