import { Injectable, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class RoutineUtilsService {
  private readonly formBuilder = inject(FormBuilder);

  createForm(): FormGroup {
    return this.formBuilder.group({
      admin: [null, [Validators.required]],
      days: [null, [Validators.required]],
      dateIN: [null, [Validators.required]],
      dateOUT: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      level: [null, [Validators.required]],
      kal: [null, [Validators.required]],
      objective: [null, [Validators.required]]
    });
  }
}
