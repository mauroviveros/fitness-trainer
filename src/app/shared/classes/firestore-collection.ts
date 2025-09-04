import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export class FirestoreCollection<T> {
  private readonly firestore = inject(Firestore);
  private readonly collection;
  readonly collection$;

  constructor(name: string) {
    this.collection = collection(this.firestore, name);
    this.collection$ = collectionData(this.collection, {
      idField: '_id'
    }) as Observable<T[]>;
  }
}
