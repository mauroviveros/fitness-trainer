import { Injectable } from "@angular/core";
import { Firestore, collection, doc, docSnapshots, DocumentData, DocumentSnapshot, setDoc, updateDoc } from "@angular/fire/firestore";
import { map, switchMap, BehaviorSubject, filter, of, firstValueFrom } from "rxjs";

import { UserDocument, UserDocumentOutput } from "../interfaces/user";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private usersCollection = collection(this.firestore, "users");
  private _user = new BehaviorSubject<UserDocument | null | undefined>(null);

  userObservable = this._user.pipe(
    filter(user => user !== null),
    map(user => user as UserDocument | undefined)
  );
  get user(){
    return this._user.pipe(
      filter(user => !!user),
      map(user => user as UserDocument)
    );
  }

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: AuthService
  ){
    this.auth.user.pipe(
      switchMap(user => user === null ? of(null) : docSnapshots(doc(this.usersCollection, user.uid))),
      filter(document => !!document),
      map(document => document as DocumentSnapshot<DocumentData>),
      map(document => {
        if(!document.exists()) return null;
        const documentData = document.data() as DocumentData;
        documentData["_id"] = document.id;
        return documentData;
      }),
      map(documentData => {
        if(!documentData) return undefined;
        const user = documentData;
        //TODO parser User Fields
        return user as UserDocument;
      })
    ).subscribe(user => {
      if(user === undefined) this.router.navigate(["profile"]);
      this._user.next(user);
    });
  }

  update(fields: UserDocumentOutput){
    return firstValueFrom(this.auth.user).then(({ uid }) => {
      return updateDoc(doc(this.usersCollection, uid), { data: fields });
    });
  }

  create(fields: UserDocumentOutput){
    return firstValueFrom(this.auth.user).then(({ uid }) => {
      return setDoc(doc(this.usersCollection, uid), { admin: false, ...fields});
    });
  }

}
