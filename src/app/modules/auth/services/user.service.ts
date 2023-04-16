import { Injectable } from "@angular/core";
import { Firestore, collection, doc, docSnapshots, DocumentData, DocumentSnapshot } from "@angular/fire/firestore";
import { map, switchMap, BehaviorSubject, filter, of } from "rxjs";

import { UserDocument } from "../interfaces/user";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private usersCollection = collection(this.firestore, "users");
  private _user = new BehaviorSubject<UserDocument | null | undefined>(null);
  userObservable = this._user.pipe(filter(user => user !== null));
  get user(){
    return this._user.pipe(
      filter(user => !!user),
      map(user => user as UserDocument)
    );
  }
  // get user(){ return this._user.asObservable(); }

  constructor(
    private auth: AuthService,
    private firestore: Firestore
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
      this._user.next(user);
    });
  }

}
