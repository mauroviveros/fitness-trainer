import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "@angular/fire/auth";
import { Firestore, collection, setDoc, doc } from "@angular/fire/firestore";

import { UserDocument } from "../interfaces/users";
import { from } from "rxjs";

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
}
