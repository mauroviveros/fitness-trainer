import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, query, where } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { UserDocument } from "../../auth/interfaces/user";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private customerCollection = collection(this.firestore, "users");
  private _customers = new BehaviorSubject<UserDocument[]>([]);
  get customers(){ return this._customers.asObservable(); }

  constructor(
    private firestore: Firestore
  ){
    collectionData(query(this.customerCollection, where("admin", "!=", true)), { idField: "_id" }).subscribe(customers => {
      console.log(customers);
      this._customers.next(customers as UserDocument[]);
    });
  }
}
