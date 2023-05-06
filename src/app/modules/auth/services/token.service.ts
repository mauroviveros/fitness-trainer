import { Injectable } from "@angular/core";
import { Firestore, collection, doc, docSnapshots, setDoc } from "@angular/fire/firestore";
import { firstValueFrom, map } from "rxjs";
import { AuthService } from "./auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

interface TokenDoc{
  expirationDate: Date,
  token: string,
  uid: string,
  used: boolean
}

@Injectable({
  providedIn: "root"
})
export class TokenService {
  private tokenCollection = collection(this.firestore, "tokens");
  constructor(
    private snackBar: MatSnackBar,
    private firestore: Firestore,
    private auth: AuthService
  ){}

  get(uid: string){
    return docSnapshots(doc(this.tokenCollection, uid)).pipe(
      map(tokenData => tokenData.data()),
      map(tokenData => {
        if(tokenData){
          tokenData["expirationDate"] = tokenData["expirationDate"].toDate();
        }
        return tokenData as TokenDoc;
      })
    );
  }

  async set(token: string){
    const user = await firstValueFrom(this.auth.user);
    const tokenDoc = await firstValueFrom(this.get(user.uid));


    if(!tokenDoc || tokenDoc.token !== token) throw this.snackBar.open("❌ Token incorrecto");
    tokenDoc.used = true;
    return setDoc(doc(this.tokenCollection, user.uid), { ...tokenDoc }).then(() => {
      return this.snackBar.open("✅ Token Validado correctamente", "cerrar", { duration: 1000 });
    });
  }
}
