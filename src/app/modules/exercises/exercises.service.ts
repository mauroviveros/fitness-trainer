import { Exercise } from '@shared/interfaces';
import { FirestoreCollection } from '@shared/classes/firestore-collection';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService extends FirestoreCollection<Exercise> {
  constructor() {
    super('exercises');
  }
}
