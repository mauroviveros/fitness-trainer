import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, query, where } from "@angular/fire/firestore";
import { map } from "rxjs";
import { UserService } from "src/app/core/modules/auth/services/user.service";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private readonly user = inject(UserService);
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "users");

  readonly $list = collectionData(query(this.collection, where("_admin", "!=", true)), { idField: "_id" }).pipe(
    map(list => list.map(customer => this.user.convert(customer)))
  );
}