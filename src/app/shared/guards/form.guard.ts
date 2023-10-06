import { Injectable, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { DialogService } from "../services/dialog.service";

export interface FormComponent{
  form: FormGroup
}

@Injectable({
  providedIn: "root"
})
export class FormGuard {
  private readonly dialog = inject(DialogService);

  canDeactivate(component: FormComponent): Observable<boolean> | boolean {
    return component.form.pristine ? true : this.dialog.showUnsavedChanges();
  }
}
