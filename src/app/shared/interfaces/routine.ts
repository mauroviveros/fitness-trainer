import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { dayOfWeek, exerciseLevel } from "./interfaces";

export interface Routine {
  _id         : string
  admin       : DocumentReference<DocumentData>
  customer    : DocumentReference<DocumentData>
  daysOfWeek  : dayOfWeek[]
  level       : exerciseLevel
  objective   : string
  kal         : number
  dateIN      : Date
  dateOUT     : Date
  [key: string]: string | Date | number | number[] | DocumentReference<DocumentData>
}