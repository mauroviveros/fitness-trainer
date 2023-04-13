import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "@angular/fire/auth";
import { Firestore, collection, setDoc, doc, collectionData, updateDoc, docSnapshots } from "@angular/fire/firestore";

import { UserDocument, UserDocumentOutput } from "../interfaces/users";
import { from, map, switchMap } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersCollection = collection(this.firestore, "users");

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private firestore: Firestore
  ){}

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

  public getUser(_id?: string){
    const snapshot = () => docSnapshots(doc(this.usersCollection, _id)).pipe(
      map(documentData => {
        if(!documentData.exists()) throw new Error();
        const user = documentData.data();
        user["_id"] = documentData.id;
        user["dateCreated"] = user["dateCreated"].toDate();
        return user as UserDocument;
      }),
    );

    if(!_id) return this.authService.getUser().pipe(
      switchMap(user => {
        _id = user.uid;
        return snapshot();
      })
    ); else{
      return snapshot();
    }
  }

}
