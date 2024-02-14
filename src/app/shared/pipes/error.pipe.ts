import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const messages: { [key: string]: string } = {
  required: 'El campo es obligatorio',
  email: 'No es un email valido',
  minlength: 'Debe contener al menos {{ requiredLength }} caracteres',
  // confirmPassword: 'Las contraseñas no coinciden',
  // min: 'El campo debe ser mayor a',
  // minlength: 'Debe contener al menos',
  // maxlength: 'Debe contener como máximo',
  // videoUrl: 'Debe ser de Vimeo o YouTube',
  // exercise: 'El ejercicio seleccionado no existe',
};

@Pipe({
  name: 'error',
  standalone: true,
})
export class ErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;
    const type = Object.keys(errors)[0];
    let message = messages[type] || `ERROR: ${type}`;

    if (typeof errors[type] === 'object') {
      message = message.replace(
        /\{\{\s*(\w+)\s*\}\}/g,
        (_, key) => errors[type][key]
      );
    }

    return message;
  }
}
