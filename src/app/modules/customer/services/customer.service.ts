import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, query, where } from "@angular/fire/firestore";
import { map } from "rxjs";

import { UserDoc } from "src/app/shared/interfaces/user";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "users");

  readonly $list = collectionData(query(this.collection, where("admin", "!=", true)), { idField: "_id" }).pipe(
    map(list => {
      return list.map(customer => {
        if(customer["birthday"]) customer["birthday"] = customer["birthday"].toDate();

        return customer;
      }) as UserDoc[];
    })
  );
}