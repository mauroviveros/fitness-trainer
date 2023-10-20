import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { dayOfWeek } from "./interfaces";
import { Category } from "./exercise";


export interface Scheme {
  _id: string
  routine: DocumentReference<DocumentData>
  exercise: DocumentReference<DocumentData>

  weekOfMonth: number
  dayOfWeek: dayOfWeek

  category: Category
  series: number
  reps: number
  rir: number
  // weights?: number[]

  [key: string]: string | number | DocumentReference<DocumentData>
}