import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, query, where } from "@angular/fire/firestore";
import { BehaviorSubject, filter, map } from "rxjs";
import { UserDocument } from "../../auth/interfaces/user";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private customerCollection = collection(this.firestore, "users");
  private _customers = new BehaviorSubject<UserDocument[] | null>(null);
  get customers(){
    return this._customers.pipe(
      filter(customers => !!customers),
      map(customers => customers as UserDocument[])
    );
  }

  constructor(
    private firestore: Firestore
  ){
    collectionData(query(this.customerCollection, where("admin", "!=", true)), { idField: "_id" }).subscribe(customers => {
      this._customers.next(customers as UserDocument[]);
    });
  }
}
