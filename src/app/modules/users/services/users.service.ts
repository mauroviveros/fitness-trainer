import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "@angular/fire/auth";
import { Firestore, collection, setDoc, getDoc, doc, collectionData } from "@angular/fire/firestore";

import { UserDocument } from "../interfaces/users";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersCollection = collection(this.firestore, "users");

  constructor(
    private auth: Auth,
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

  public getUsers(){
    return collectionData(this.usersCollection, { idField: "_id" }) as Observable<UserDocument[]>;
  }

  public getUser(_id: string){
    const promise = async () => {
      const document = await getDoc(doc(this.usersCollection, _id));
      if(document.exists()){
        const user = document.data() as UserDocument;
        user._id = document.id;
        return user;
      }
      else throw document.id;
    };

    return from(promise());
  }

}
