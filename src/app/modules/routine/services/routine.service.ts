import { Injectable, inject } from "@angular/core";
import { Firestore, collection, doc, setDoc } from "@angular/fire/firestore";

import { Routine } from "src/app/shared/interfaces/routine";
import { MessageService } from "src/app/shared/services/message.service";

@Injectable({
  providedIn: "root"
})
export class RoutineService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "routines");
  private readonly message = inject(MessageService);

  async upload(fields: Routine){
    try {
      const routineDoc = doc(this.collection);
      await setDoc(routineDoc, { ...fields });
      this.message.success("Rutina generada correctamente");
      return routineDoc.id;
    } catch (error) {
      this.message.error(error as Error);
      throw error;
    }
  }
}
