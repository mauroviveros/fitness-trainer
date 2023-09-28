import { Injectable, inject } from "@angular/core";
import { DocumentData, Firestore, collection, collectionData, doc, orderBy, query, setDoc, where } from "@angular/fire/firestore";
import { firstValueFrom, from, map, mergeMap, switchMap, toArray } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";
import { ExerciseService } from "../../exercise/services/exercise.service";
import { MessageService } from "src/app/shared/services/message.service";

import { Scheme, SchemeOUT } from "src/app/shared/interfaces/scheme";

@Injectable({
  providedIn: "root"
})
export class SchemeService {
  private readonly user = inject(UserService);
  private readonly exercise = inject(ExerciseService);
  private readonly message = inject(MessageService);
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "schemes");

  $list(dayOfWeek: number, customer: string){
    const queryRef = query(
      this.collection,
      where("dayOfWeek", "==", dayOfWeek),
      where("customer", "==", this.user.ref(customer)),
    );
    return collectionData(queryRef, { idField: "_id" }).pipe(
      switchMap(schemes => this.convert(schemes))
    );
  }

  private convert(schemes: DocumentData[]){
    return from(schemes).pipe(
      mergeMap(async scheme => {
        scheme["customer"] = await firstValueFrom(this.user.doc(scheme["customer"]));
        scheme["exercise"] = await firstValueFrom(this.exercise.doc(scheme["exercise"]));
        return scheme;
      }),
      toArray(),
      map(schemes => schemes as Scheme[])
    );
  }


  async upload(fields: SchemeOUT){
    try {
      const { _id, customer, exercise, ...routine } = fields;
      const customerRef = this.user.ref(customer);
      const exerciseRef = this.exercise.ref(exercise);
      let routineDoc = doc(this.collection);
      if(_id) routineDoc = doc(this.collection, _id);

      await setDoc(routineDoc, { customer: customerRef, exercise: exerciseRef, ...routine });

      if(_id) this.message.success("Ejercicio agregado correctamente");
      else this.message.success("Ejercicio actualizado correctamente");

      return routineDoc.id;
    } catch (error) { this.message.error(error as Error); throw error; }
  }
}
