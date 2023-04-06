import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, collection, setDoc, doc } from "@angular/fire/firestore";

enum Role { "USER", "ADMIN", "OWNER" }
interface userCollection {
  name: string,
  surname: string
}

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersCollection = collection(this.firestore, "users");

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ){}

  public async createUser(email: string, role: Role, fields: userCollection){
    const credential = await createUserWithEmailAndPassword(this.auth, email, "123456");

    const document = await setDoc(doc(this.usersCollection, credential.user.uid), {
      role: role,
      ...fields
    });

    console.log(document);
  }
}
