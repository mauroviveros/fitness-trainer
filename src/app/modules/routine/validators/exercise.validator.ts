import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function exerciseSelected(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(typeof control.value === "object") return null;
    else return { exercise: true };
  };
}