import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "@angular/fire/auth";
import { Firestore, collection, setDoc, doc, collectionData, updateDoc, docSnapshots, DocumentData, DocumentSnapshot } from "@angular/fire/firestore";

import { UserDocument, UserDocumentOutput } from "../interfaces/users";
import { from, map, switchMap, BehaviorSubject, filter } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersCollection = collection(this.firestore, "users");
  public _user = new BehaviorSubject<UserDocument>({} as UserDocument);
  public get user(){ return this._user.pipe(filter((user) => !!user._id)); }

  private parseUserDocument(document: DocumentSnapshot<DocumentData>){
    if(!document.exists()) throw new Error();
    const user = document.data();
    user["_id"] = document.id;
    user["dateCreated"] = user["dateCreated"].toDate();
    user["dateLastEmailVerification"] = user["dateLastEmailVerification"] ? user["dateLastEmailVerification"].toDate() : undefined;
    return user as UserDocument;
  }

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private firestore: Firestore
  ){
    this.authService.user.pipe(
      switchMap( user => docSnapshots(doc(this.usersCollection, user.uid))),
      map(this.parseUserDocument)
    ).subscribe(user => {
      this._user.next(user);
    });
  }

  public createUser(email: string, fields: UserDocument){
    const promise = async () => {
      const methods = await fetchSignInMethodsForEmail(this.auth, email);
      if(methods.length) throw "Ya existe ese usuario";
      const credential = await createUserWithEmailAndPassword(this.auth, email, "123456");
      await setDoc(doc(this.usersCollection, credential.user.uid), fields);
    };

    return from(promise());
  }

  public updateUser(userID: string, fields: UserDocumentOutput){
    return updateDoc(doc(this.usersCollection, userID), { ...fields });
  }

  public getUsers(){
    return collectionData(this.usersCollection, { idField: "_id" });
  }

  public getUser(_id: string){
    return docSnapshots(doc(this.usersCollection, _id)).pipe(
      map(this.parseUserDocument),
    );
  }

}
