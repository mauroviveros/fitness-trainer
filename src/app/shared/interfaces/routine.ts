import { DocumentData, DocumentReference } from "@angular/fire/firestore";

export interface RoutineOUT{
    admin?      : string | DocumentReference<DocumentData>
    customer?   : string | DocumentReference<DocumentData>
    dateIN      : Date
    dateOUT     : Date
    days        : number[]
    level       : string
    kal         : number
    objective   : string
}