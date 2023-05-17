import { Injectable, inject } from "@angular/core";
import { Firestore, collection, doc, docSnapshots } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { map, switchMap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private auth = inject(AuthService);
  private firestore = inject(Firestore);
  private collection = collection(this.firestore, "users");

  data = this.auth.user.pipe(
    switchMap(user => docSnapshots(doc(this.collection, user.uid))),
    map(({ id, data }) => { return { ...data(), id }; })
  );
}
