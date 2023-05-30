import { UserDoc } from "./user";

type daysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// 0 domingo, 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado

type levelObjetive = 0 | 1 | 2 | 3;
// 0 baja, 1 media, 2 intensa, 3 muy intensa

export interface Routine {
    _id: string
    admin: UserDoc
    customer: UserDoc
    objective: string,
    kal: number
    level: levelObjetive
    days: daysOfWeek[]
    dateIN: Date
    dateOUT: Date
    [key: string]: string | Date | number | daysOfWeek[] | UserDoc
}

export interface RoutineOUT {
    _id: string
    admin: string
    customer: string
    objective: string
    kal: number
    level: number
    days: number[]
    dateIN: Date
    dateOUT: Date
}