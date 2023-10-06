import { Injectable, inject } from "@angular/core";
import { DocumentData, DocumentSnapshot, Firestore, collection, doc, docSnapshots, setDoc, updateDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "@angular/fire/auth";
import { Observable, filter, firstValueFrom, map, switchMap, tap } from "rxjs";

import { AuthService } from "./auth.service";
import { MessageService } from "src/app/shared/services/message.service";

import { UserDoc } from "src/app/shared/interfaces/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "users");
  private readonly auth = inject(AuthService);
  private readonly message = inject(MessageService);
  private readonly router = inject(Router);

  readonly $snapshot : Observable<DocumentSnapshot<DocumentData>> = this.auth.$user.pipe(
    switchMap(user => docSnapshots(doc(this.collection, user.uid)))
  );

  readonly $data : Observable<UserDoc> = this.$snapshot.pipe(
    filter(user => user.exists()),
    map(user => this.convert(user) as UserDoc),
  );

  constructor(){
    this.$snapshot.pipe(
      tap(user => user.exists() ? null : this.router.navigate(["profile"])),
    ).subscribe();
  }

  private convert(snapshot: DocumentSnapshot<DocumentData>){
    const document = snapshot.data();
    if(!document) return undefined;

    document["_id"] = snapshot.id;
    if(document["birthday"]) document["birthday"] = document["birthday"].toDate();
    return document as UserDoc;
  }

  async upload(fields: UserDoc, isNew: boolean){
    const extra = { _admin: false };

    try {
      const { uid } = await firstValueFrom(this.auth.$user) as User;
      if(isNew){
        await setDoc(doc(this.collection, uid), { ...extra, ...fields });
        this.message.success("Perfil generado correctamente");
      } else{
        await updateDoc(doc(this.collection, uid), { ...fields });
        this.message.success("Perfil actualizado correctamente");
      }
    } catch (error) { this.message.error(error as Error); throw error; }
  }
}
