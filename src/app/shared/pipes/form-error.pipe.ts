import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

interface messages{

  [key: string]: string
}

const messages: messages = {
  required  : "El campo es obligatorio",
  email     : "No es un email valido"
};


@Pipe({ name: "formError" })
export class FormErrorPipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined): string | undefined {
    if(!errors) return;
    const type = Object.keys(errors)[0];
    return messages[type];
  }

}
