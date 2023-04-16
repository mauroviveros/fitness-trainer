import { Injectable } from "@angular/core";
import { Firestore, collection, setDoc, doc, docSnapshots, DocumentData, DocumentSnapshot } from "@angular/fire/firestore";

import { UserDocument } from "../interfaces/users";
import { map, switchMap, BehaviorSubject, filter, of, tap } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersCollection = collection(this.firestore, "users");
  private _user = new BehaviorSubject<UserDocument | null>(null);
  userObservable = this._user.asObservable();
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
      tap(document => document.exists() ? null : setDoc(doc(this.usersCollection, document.id), {})),
      filter(document => document.exists()),
      map(document => {
        const documentData = document.data() as DocumentData;
        documentData["_id"] = document.id;
        return documentData;
      }),
      map(documentData => {
        const user = documentData;
        //TODO parser User Fields
        return user as UserDocument;
      })
    ).subscribe(user => {
      this._user.next(user);
    });
  }

}
