import { Injectable, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, of, switchMap } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";
import { AuthService } from "src/app/core/modules/auth/services/auth.service";
import { DialogService } from "../services/dialog.service";

export interface FormComponent{
  form: FormGroup
}

@Injectable({
  providedIn: "root"
})
export class FormGuard {
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private readonly dialog = inject(DialogService);

  canDeactivate(component: FormComponent): Observable<boolean> | boolean {
    return this.auth.$user.pipe(
      switchMap(() => this.user.$data),
      switchMap(user => {
        if(user === null) return this.dialog.showMandatoryProfile();
        if(component.form.pristine) return of(true);
        return this.dialog.showUnsavedChanges();
      })
    );
  }
}
