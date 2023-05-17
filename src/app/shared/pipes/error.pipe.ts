import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";


interface messages{ [key: string]: string }
const messages: messages = {
  required        : "El campo es obligatorio",
  email           : "No es un email valido",
  confirmPassword : "Las contraseñas no coinciden",
  min             : "El campo debe ser mayor a",
  minlength       : "Debe contener al menos"
};

@Pipe({
  name: "error"
})
export class ErrorPipe implements PipeTransform {

  transform(errors: ValidationErrors | null, arg?: number): string | undefined {
    if(!errors) return;

    const type = Object.keys(errors)[0];
    let message = messages[type] || `ERROR: ${type}`;

    if(type === "min") message = `${message}: ${arg || NaN}`;
    if(type === "minlength") message = `${message}: ${arg || NaN} caracteres`;

    return message;
  }

}
