import { Injectable, inject } from "@angular/core";
import { Firestore, collection, doc, docSnapshots, setDoc } from "@angular/fire/firestore";
import { firstValueFrom, map, switchMap } from "rxjs";

import { AuthService } from "./auth.service";

import { UserDoc } from "src/app/shared/interfaces/user";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogService } from "src/app/shared/services/dialog.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(DialogService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "users");

  $data = this.auth.$user.pipe(
    switchMap(user => docSnapshots(doc(this.collection, user.uid))),
    map((user) => { 
      const data = user.data();
      if(data) return { ...data, _id: user.id } as UserDoc;
      else throw `profile is not defined "${user.ref.path}"`;
    })
  );

  constructor(){
    firstValueFrom(this.$data)
      .catch(() => this.dialog.showWelcome());
  }

  private catchError(error: Error){
    this.snackBar.open(`❌ ${error.message}`, "cerrar", { duration: 3000 });
    throw error;
  }

  async upload(fields: UserDoc){
    try {
      const { uid } = await firstValueFrom(this.auth.$user);
      await setDoc(doc(this.collection, uid), { admin: false, ...fields });
      this.snackBar.open("✅ Perfil generado correctamente");
    } catch (error) { this.catchError(error as Error); }
  }
}
