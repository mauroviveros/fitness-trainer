import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, doc, docData, setDoc } from "@angular/fire/firestore";
import { map } from "rxjs";

import { MessageService } from "src/app/shared/services/message.service";

import { Exercise } from "src/app/shared/interfaces/exercise";

@Injectable({
  providedIn: "root"
})
export class ExerciseService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "exercises");
  private readonly message = inject(MessageService);

  readonly $list = collectionData(this.collection, { idField: "_id" }).pipe(
    map(exercises => exercises as Exercise[])
  );

  detail(_id: string){
    return docData(doc(this.collection, _id), { idField: "_id" }).pipe(
      map(exercise => exercise as Exercise)
    );
  }


  async upload(fields: Exercise){
    try {
      const { _id, ...exercise } = fields;
      let _doc = doc(this.collection);
      if(_id) _doc = doc(this.collection, _id);

      await setDoc(_doc, { ...exercise });
      this.message.success("Ejercicio generado correctamente");
    } catch (error) {
      this.message.error(error as Error);
      throw error;
    }
  }
}
