import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

interface messages{

  [key: string]: string
}

const messages: messages = {
  required        : "El campo es obligatorio",
  email           : "No es un email valido",
  confirmPassword : "Las contraseñas no coinciden",
  min             : "El campo debe ser mayor a"
};


@Pipe({ name: "formError" })
export class FormErrorPipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined, arg?: number): string | undefined {
    if(!errors) return;
    const type = Object.keys(errors)[0];
    let errormsg = messages[type] || `ERROR: ${type}`;
    if(arg !== undefined && type === "min") errormsg = `${errormsg}: ${arg}`;
    return errormsg;
  }

}
