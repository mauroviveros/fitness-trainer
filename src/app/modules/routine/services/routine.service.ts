import { Injectable, inject } from "@angular/core";
import { DocumentData, Firestore, collection, collectionData, doc, docData, query, setDoc, where } from "@angular/fire/firestore";
import { filter, from, map, of, switchMap, take, tap } from "rxjs";

import { MessageService } from "src/app/shared/services/message.service";

import { Routine, RoutineOUT } from "src/app/shared/interfaces/routine";
import { UserService } from "src/app/core/modules/auth/services/user.service";
import { UserDoc } from "src/app/shared/interfaces/user";

@Injectable({
  providedIn: "root"
})
export class RoutineService {
  private readonly user = inject(UserService);
  private readonly message = inject(MessageService);
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "routines");

  readonly $list = collectionData(this.collection, { idField: "_id" }).pipe(
    switchMap(routines => this.convert(routines).pipe(take(1)))
  );

  get(_id: string){
    return docData(doc(this.collection, _id), { idField: "_id" }).pipe(
      switchMap(routine => this.convert([routine]).pipe(take(1))),
      map(routines => routines[0])
    );
  }

  getOwn(){
    return this.user.$data.pipe(
      filter(user => user !== null && user !== undefined),
      map(user => user as UserDoc),
      switchMap(user => collectionData(query(this.collection, where("customer", "==", this.user.ref(user._id))))),
      switchMap(routines => this.convert(routines).pipe(take(1))),
      map(routines => routines[0])
    );
  }

  private convert(routines: DocumentData[]){
    return of(routines).pipe(
      map(routines => routines.map(routine => {
        routine["dateIN"] = routine["dateIN"].toDate();
        routine["dateOUT"] = routine["dateOUT"].toDate();
        return routine;
      })),
      switchMap(routines => from(routines).pipe(
        switchMap(routine => this.user.doc(routine["admin"]).pipe(
          map(admin => ({ ...routine, admin } as DocumentData))
        )),
        switchMap(routine => this.user.doc(routine["customer"]).pipe(
          map(customer => ({ ...routine, customer } as DocumentData))
        )),
        map((routine, index) => {
          routines[index] = routine;
          return routines;
        })
      )),
      map(routines => routines as Routine[])
    );
  }

  async upload(fields: RoutineOUT){
    try {
      const { admin, customer, ...routine } = fields;
      const adminRef = this.user.ref(admin);
      const customerRef = this.user.ref(customer);
      const routineDoc = doc(this.collection);

      await setDoc(routineDoc, { admin: adminRef, customer: customerRef,...routine });
      this.message.success("Rutina generada correctamente");
      return routineDoc.id;
    } catch (error) {
      this.message.error(error as Error);
      throw error;
    }
  }
}
