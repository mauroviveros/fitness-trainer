import { Injectable, inject } from "@angular/core";
import { Firestore, collection, doc, setDoc } from "@angular/fire/firestore";

import { MessageService } from "src/app/shared/services/message.service";

import { Routine } from "src/app/shared/interfaces/routine";
import { UserService } from "src/app/core/modules/auth/services/user.service";

@Injectable({
  providedIn: "root"
})
export class RoutineService {
  private readonly user = inject(UserService);
  private readonly message = inject(MessageService);
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "routines");

  async upload(fields: Routine){
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
