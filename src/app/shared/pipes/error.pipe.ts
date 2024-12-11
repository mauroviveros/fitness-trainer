import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const messages: Record<string, string> = {
  required: 'This field is required',
  email: 'Invalid email address',
  minlength: 'Must be at least {requiredLength} characters',
  maxlength: 'Cannot be more than {requiredLength} characters',
  confirmPassword: 'Passwords do not match'
};

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | undefined {
    if (!errors) return;

    const type = Object.keys(errors)[0];
    const error = errors[type];
    let message = messages[type] || `ERROR: ${type}`;

    if (message && typeof error === 'object') {
      message = message.replace(/{(\w+)}/g, (match, key) => {
        return error[key] || match;
      });
    }

    return message;
  }
}
