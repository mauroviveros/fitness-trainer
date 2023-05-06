import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Firestore, collection, doc, setDoc, docData, updateDoc, collectionData, query, where } from "@angular/fire/firestore";

import { UserService } from "../../auth/services/user.service";

import { Routine, RoutineOUT, RoutineExercise } from "src/app/shared/interfaces/routine";
import { map, switchMap } from "rxjs";
import { ExerciseService } from "../../exercise/services/exercise.service";


@Injectable({
  providedIn: "root"
})
export class RoutineService {
  private routineCollection = collection(this.firestore, "routines");


  constructor(
    private snackBar: MatSnackBar,
    private firestore: Firestore,
    private userService: UserService,
    private exerciseService: ExerciseService
  ){}


  getList(){
    return collectionData(this.routineCollection,  { idField: "_id" }).pipe(
      map(routines => {
        return routines.map(routine => {
          routine["dateIN"] = routine["dateIN"].toDate();
          routine["dateOUT"] = routine["dateOUT"].toDate();
          return routine;
        });
      })
    );
  }

  getByUser(uid: string){
    return collectionData(
      query(
        this.routineCollection,
        where("customer", "==", doc(this.firestore, `users/${uid}`))
      ),
      { idField: "_id" }
    ).pipe(
      switchMap(routines => {
        const adminRef = doc(this.firestore, routines[0]["admin"].path);
        return docData(adminRef).pipe(
          map(admin => {
            admin["_id"] = adminRef.id;
            routines[0]["admin"] = admin;
            return routines;
          })
        );
      }),
      switchMap(routines => {
        const customerRef = doc(this.firestore, routines[0]["customer"].path);
        return docData(customerRef).pipe(
          map(customer => {
            customer["_id"] = customerRef.id;
            routines[0]["customer"] = customer;
            return routines;
          })
        );
      }),
      map(routine => {
        if(routine[0]["dateIN"].toDate) routine[0]["dateIN"] = routine[0]["dateIN"].toDate();
        if(routine[0]["dateOUT"].toDate) routine[0]["dateOUT"] = routine[0]["dateOUT"].toDate();
        return routine[0] as Routine;
      })
    );
  }

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
        if(routine["dateIN"].toDate) routine["dateIN"] = routine["dateIN"].toDate();
        if(routine["dateOUT"].toDate) routine["dateOUT"] = routine["dateOUT"].toDate();
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

  async updateExercises(exercises: RoutineExercise[], routineID: string){
    const promise = exercises.map(async (exercise) => {
      if(typeof exercise._id === "string"){
        exercise._id = await this.exerciseService.reference(exercise._id);
      }
      delete exercise.name;
      delete exercise.description;
      delete exercise.video;
      return exercise;
    });

    return updateDoc(doc(this.routineCollection, routineID), { exercises: await Promise.all(promise) });
  }
}
