import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenCollection = collection(this.firestore, "tokens");

  constructor(
    private snackBar: MatSnackBar,
    private firestore: Firestore
  ){}


  private getNextMonth(){
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  private generateToken(){
    return uuidv4();
  }

  set(uid: string){
    const token = this.generateToken();
    const expirationDate = this.getNextMonth();
    return setDoc(doc(this.tokenCollection, uid), {
      uid, token,
      expirationDate,
      used: false,
    }).then(() => {
      this.snackBar.open("✅ Token generado correctamente", "cerrar", { duration: 1000 });
      return { token, expirationDate };
    });
  }
}
