import { Injectable, inject } from "@angular/core";
import { Firestore, collection, setDoc, doc, collectionData, query, where, DocumentReference, deleteDoc } from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
import { dayOfWeek } from "src/app/shared/interfaces/interfaces";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { MessageService } from "src/app/shared/services/message.service";
import { Category } from "src/app/shared/interfaces/exercise";

@Injectable({
  providedIn: "root"
})
export class SchemeService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "schemes");
  private readonly message = inject(MessageService);
  readonly RIR = [ -1, 0, 1, 2, 3, 4, 5 ];

  readonly $list : Observable<Scheme[]> = collectionData(this.collection, { idField: "_id" }).pipe(
    map(schemes => schemes as Scheme[])
  );

  getList(routine: DocumentReference, dayOfWeek: dayOfWeek, weekOfMonth: number, category: Category) : Observable<Scheme[]> {
    return collectionData(query(this.collection, where("category", "==", category), where("routine", "==", routine), where("dayOfWeek", "==", dayOfWeek), where("weekOfMonth", "==", weekOfMonth)), { idField: "_id" }).pipe(
      map(schemes => schemes as Scheme[])
    );
  }

  async upload(fields: Scheme) : Promise<void> {
    try {
      const { _id, ...exercise } = fields;

      if(!_id){
        await setDoc(doc(this.collection), { ...exercise });
        this.message.success("Ejercicio creado correctamente");
      } else{
        // await updateDoc(doc(this.collection, _id), { ...exercise });
        // this.message.success("Ejercicio actualizado correctamente");
      }

    } catch (error) {
      if(error instanceof Error){ this.message.error(error); }
      throw error;
    }
  }

  async delete(_id: string) : Promise<void> {
    try {
      await deleteDoc(doc(this.collection, _id));
      this.message.success("Ejercicio borrado correctamente");
    } catch (error) {
      this.message.error(error as Error); throw error;
    }
  }
}
