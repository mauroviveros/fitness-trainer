import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Firestore, collection, doc, setDoc } from "@angular/fire/firestore";

import { UserService } from "../../auth/services/user.service";

import { RoutineOUT } from "src/app/shared/interfaces/routine";


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
}
