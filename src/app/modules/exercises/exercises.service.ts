import { Injectable } from '@angular/core';
import { FirestoreCollection } from '@shared/classes/firestore-collection';
import { Exercise } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService extends FirestoreCollection<Exercise> {
  constructor() {
    super('exercises');
  }
}
