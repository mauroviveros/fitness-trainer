import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, query, where } from "@angular/fire/firestore";
import { MatDialog } from "@angular/material/dialog";
import { Observable, map } from "rxjs";
import { UserService } from "src/app/core/modules/auth/services/user.service";
import { UserDoc } from "src/app/shared/interfaces/user";
import { MessageService } from "src/app/shared/services/message.service";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, "users");
  private readonly dialog = inject(MatDialog);
  private readonly user = inject(UserService);
  private readonly message = inject(MessageService);

  readonly $list : Observable<UserDoc[]> = collectionData(query(this.collection,  where("_admin", "==", false)), { idField: "_id" }).pipe(
    map(list => list.map(customer => this.user.convert(customer) as UserDoc))
  );
}
