import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Firestore, collection, collectionData, deleteDoc, doc, setDoc, updateDoc } from "@angular/fire/firestore";
import { BehaviorSubject, filter, map } from "rxjs";

import { Exercise, ExerciseOUT } from "src/app/shared/interfaces/exercises";

@Injectable({
  providedIn: "root"
})
export class ExcerciseService {
  private exerciseCollection = collection(this.firestore, "excercises");
  private _exercises = new BehaviorSubject<Exercise[] | null>(null);

  get exercises(){
    return this._exercises.pipe(
      filter(customers => !!customers),
      map(customers => customers as Exercise[])
    );
  }

  constructor(
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ){
    collectionData(this.exerciseCollection, { idField: "_id" }).subscribe(customers => {
      this._exercises.next(customers as Exercise[]);
    });
  }

  create(fields: ExerciseOUT){
    return setDoc(doc(this.exerciseCollection), fields)
      .then(() => this.snackBar.open("✅ Ejercicio creado correctamente"));
  }

  update(_id: string, fields: ExerciseOUT){
    return updateDoc(doc(this.exerciseCollection, _id), { ...fields })
      .then(() => this.snackBar.open("✅ Ejercicio actualizado correctamente"));
  }

  delete(_id: string){
    return deleteDoc(doc(this.exerciseCollection, _id))
      .then(() => this.snackBar.open("✅ Ejercicio borrado correctamente"));
  }
}
