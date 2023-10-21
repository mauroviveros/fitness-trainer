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

  weights?: number[]
  sensations?: string

  [key: string]: undefined | string | number | number[] | DocumentReference<DocumentData>
}