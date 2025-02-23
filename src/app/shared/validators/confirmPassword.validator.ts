import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPaswordValidator = (controlName: string): ValidatorFn => {
  return (confirmCtrl: AbstractControl): ValidationErrors | null => {
    const ctrl = confirmCtrl.parent?.get(controlName);
    return ctrl?.value === confirmCtrl.value ? null : { confirmPassword: true };
  };
};
