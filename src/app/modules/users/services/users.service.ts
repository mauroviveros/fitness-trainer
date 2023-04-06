import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  constructor(
    private _authFire: AngularFireAuth,
    // private _firestore: AngularFirestore
  ){}

  public async createUser(email: string){
    const credential = await this._authFire.createUserWithEmailAndPassword(email, "123456");
    console.log(credential.user);
    console.log(credential.user?.uid);
  }
}
