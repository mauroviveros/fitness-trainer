import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

import { environment } from "src/environments/environment";

interface messages{ [key: string]: string }
const messages: messages = {
  required        : "El campo es obligatorio",
  email           : "No es un email valido",
  confirmPassword : "Las contraseñas no coinciden",
  min             : "El campo debe ser mayor a",
  minlength       : "Debe contener al menos",
  maxlength       : "Debe contener como máximo",
  videoUrl        : "Debe ser de Vimeo o YouTube",
  exercise        : "El ejercicio seleccionado no existe"
};

@Pipe({
  name: "error"
})
export class ErrorPipe implements PipeTransform {
  private readonly maxlength = environment.MAX_LENGTH || 24;

  transform(errors: ValidationErrors | null, arg?: number): string | undefined {
    if(!errors) return;

    const type = Object.keys(errors)[0];
    let message = messages[type] || `ERROR: ${type}`;

    if(type === "min") message = `${message}: ${arg === undefined ? NaN : arg}`;
    if(type === "minlength") message = `${message}: ${arg === undefined ? NaN : arg} caracteres`;
    if(type === "maxlength") message = `${message}: ${arg !== undefined ? arg : this.maxlength || NaN} caracteres`;

    return message;
  }

}
