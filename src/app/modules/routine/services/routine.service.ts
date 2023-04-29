import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Firestore, collection, doc, setDoc, docData, updateDoc } from "@angular/fire/firestore";

import { UserService } from "../../auth/services/user.service";

import { Routine, RoutineOUT, RoutineExercise } from "src/app/shared/interfaces/routine";
import { map, switchMap } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class RoutineService {
  private routineCollection = collection(this.firestore, "routines");


  constructor(
    private snackBar: MatSnackBar,
    private firestore: Firestore,
    private userService: UserService
  ){}


  get(_id: string){
    return docData(doc(this.routineCollection, _id)).pipe(
      switchMap(routine => {
        const adminRef = doc(this.firestore, routine["admin"].path);
        return docData(adminRef).pipe(
          map(admin => {
            admin["_id"] = adminRef.id;
            routine["admin"] = admin;
            return routine;
          })
        );
      }),
      switchMap(routine => {
        const customerRef = doc(this.firestore, routine["customer"].path);
        return docData(customerRef).pipe(
          map(customer => {
            customer["_id"] = customerRef.id;
            routine["customer"] = customer;
            return routine;
          })
        );
      }),
      map(routine => {
        routine["dateIN"] = routine["dateIN"].toDate();
        routine["dateOUT"] = routine["dateOUT"].toDate();
        routine["_id"] = _id;
        return routine as Routine;
      })
    );
  }

  async create(fields: RoutineOUT, customer: string){
    const newDoc = doc(this.routineCollection);
    return setDoc(newDoc, {
      admin: await this.userService.reference(),
      customer: await this.userService.reference(customer),
      ...fields
    }).then(() => {
      this.snackBar.open("✅ Rutina creada correctamente");
      return newDoc.id;
    });
  }

  updateExercises(exercises: RoutineExercise[], routineID: string){
    return updateDoc(doc(this.routineCollection, routineID), { exercises })
      .then(() => { this.snackBar.open("✅ Rutina creada correctamente"); });
  }
}
