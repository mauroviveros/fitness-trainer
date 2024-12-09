import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const messages: Record<string, string> = {
  required: 'This field is required',
  email: 'Invalid email address'
};

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | undefined {
    if (!errors) return;

    const type = Object.keys(errors)[0];
    return messages[type] || `ERROR: ${type}`;
  }
}
