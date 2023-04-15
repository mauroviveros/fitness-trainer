import { Injectable } from "@angular/core";
import { Firestore, collection, setDoc, doc, docSnapshots, DocumentData } from "@angular/fire/firestore";

import { UserDocument } from "../interfaces/users";
import { map, switchMap, BehaviorSubject, filter } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersCollection = collection(this.firestore, "users");
  public _user = new BehaviorSubject<UserDocument>({} as UserDocument);

  public get user(){ return this._user.asObservable(); }

  constructor(
    private auth: AuthService,
    private firestore: Firestore
  ){
    this.auth.USER.pipe(
      switchMap(user => docSnapshots(doc(this.usersCollection, user.uid))),
      filter(document => {
        const bool = document.exists();
        if(!bool) setDoc(doc(this.usersCollection, document.id), {});
        return bool;
      }),
      map(document => {
        const documentData = document.data() as DocumentData;
        documentData["_id"] = document.id;
        return documentData;
      }),
      map(documentData => {
        const user = documentData;
        //TODO parseUserFields
        return user as UserDocument;
      })
    ).subscribe(user => {
      console.log(user);
      this._user.next(user);
    });
  }

}
