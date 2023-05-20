import { Injectable, inject } from "@angular/core";
import { Firestore, collection, doc, docSnapshots, setDoc } from "@angular/fire/firestore";
import { firstValueFrom, map, switchMap } from "rxjs";

import { AuthService } from "./auth.service";

import { UserDoc } from "src/app/shared/interfaces/user";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogService } from "src/app/shared/services/dialog.service";
import { User } from "@angular/fire/auth";

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
    switchMap(async user => {
      try {
        return await firstValueFrom(docSnapshots(doc(this.collection, user?.uid)));
      } catch (error) {
        return undefined;
      }
    }),
    map(user => {
      if(user === undefined) return undefined;
      const data = user.data();
      if(!data) return null;
      return { ...data, _id: user?.id } as UserDoc;
    })
  );

  constructor(){
    firstValueFrom(this.$data)
      .then(data => {
        if(data === null) this.dialog.showWelcome();
      });
  }

  private catchError(error: Error){
    this.snackBar.open(`❌ ${error.message}`, "cerrar", { duration: 3000 });
    throw error;
  }

  async upload(fields: UserDoc){
    try {
      const { uid } = await firstValueFrom(this.auth.$user) as User;
      await setDoc(doc(this.collection, uid), { admin: false, ...fields });
      this.snackBar.open("✅ Perfil generado correctamente");
    } catch (error) { this.catchError(error as Error); }
  }
}
