import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { UserDocument } from "src/app/modules/auth/interfaces/user";
import { Exercise } from "./exercises";

export interface Routine{
    _id         : string
    admin       : UserDocument
    customer    : UserDocument
    dateIN      : Date
    dateOUT     : Date
    days        : number[]
    level       : string
    kal         : number
    objective   : string
    exercises?  : RoutineExercise[]
}

export interface RoutineExerciseWeigh{
    meta: number
    real: number
}
export interface RoutineExercise extends Exercise{
    day: number
    reps: number
    series: number
    weighs: RoutineExerciseWeigh[]
}

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