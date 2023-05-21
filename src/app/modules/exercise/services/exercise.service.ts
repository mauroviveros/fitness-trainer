import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, deleteDoc, doc, docData, setDoc, updateDoc } from "@angular/fire/firestore";
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

      if(!_id){
        await setDoc(doc(this.collection), { ...exercise });
        this.message.success("Ejercicio generado correctamente");
      } else{
        await updateDoc(doc(this.collection, _id), { ...exercise });
        this.message.success("Ejercicio actualizado correctamente");
      }

    } catch (error) {
      this.message.error(error as Error);
      throw error;
    }
  }

  async delete(_id: string){
    try {
      await deleteDoc(doc(this.collection, _id));
      this.message.success("Ejercicio borrado correctamente");
    } catch (error) {
      this.message.error(error as Error); throw error;
    }
  }
}
