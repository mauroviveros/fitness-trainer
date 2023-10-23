import { Injectable, inject } from "@angular/core";
import { DocumentData, DocumentReference, Firestore, collection, collectionData, doc, docData, orderBy, query, setDoc, where } from "@angular/fire/firestore";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, map, switchMap } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";
import { MessageService } from "src/app/shared/services/message.service";
import { DetailDialogComponent } from "../components/detail-dialog/detail-dialog.component";

import { Routine } from "src/app/shared/interfaces/routine";
import { UserDoc } from "src/app/shared/interfaces/user";
import { ExerciseDialogComponent } from "../components/exercise-dialog/exercise-dialog.component";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { AuthService } from "src/app/core/modules/auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class RoutineService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "routines");
  private readonly dialog = inject(MatDialog);
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private readonly message = inject(MessageService);
  readonly levels = ["Baja", "Media", "Intensa", "Muy intensa"];
  private userData?: UserDoc;

  readonly $list : Observable<Routine[]> = collectionData(query(this.collection, orderBy("dateIN", "desc")), { idField: "_id" }).pipe(
    map(routines => routines.map(routine => this.convert(routine) as Routine))
  );

  constructor(){
    this.user.$data.subscribe(user => { this.userData = user; });
  }

  private convert(document: DocumentData) : Routine{
    if(document["dateIN"]) document["dateIN"] = document["dateIN"].toDate();
    if(document["dateOUT"]) document["dateOUT"] = document["dateOUT"].toDate();
    return document as Routine;
  }


  ref(routine: Routine) : DocumentReference<DocumentData> {
    return doc(this.collection, routine._id);
  }

  detail(_id: string){
    return docData(doc(this.collection, _id), { idField: "_id" }).pipe(
      map(routine => this.convert(routine) as Routine)
    );
  }
  getOwn(){
    return this.user.$data.pipe(
      switchMap(user => collectionData(query(this.collection, where("customer", "==", this.user.ref(user))), { idField: "_id" })),
      map(routines => routines.map(routine => this.convert(routine) as Routine))
    );
  }

  openRoutine(mode: 1 | 2 | 3 = 3, routine?: Routine, customer?: UserDoc) : MatDialogRef<DetailDialogComponent> {
    const data = { mode, routine: routine || {} as Routine };

    if(!routine){
      if(this.userData) data.routine.admin = this.user.ref(this.userData);
      if(customer) data.routine.customer = this.user.ref(customer);
    }

    return this.dialog.open(DetailDialogComponent, { disableClose: true, data });
  }

  openExercise(mode: 1 | 2 | 3 = 3, scheme?: Scheme, isEdit?: boolean, months?: number){
    const data = { mode, scheme, isEdit, months };
    return this.dialog.open(ExerciseDialogComponent, { disableClose: true, data });
  }


  async upload(fields: Routine) : Promise<void> {
    try {
      const { admin, customer, ...routine } = fields;

      await setDoc(doc(this.collection), { admin, customer, ...routine });
      this.message.success("Rutina creada correctamente");
    } catch (error) {
      if(error instanceof Error){ this.message.error(error); }
      throw error;
    }
  }
}
