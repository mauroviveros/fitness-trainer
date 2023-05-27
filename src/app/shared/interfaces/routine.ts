
type daysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// 0 domingo, 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado

type levelObjetive = 0 | 1 | 2 | 3;
// 0 baja, 1 media, 2 intensa, 3 muy intensa

export interface Routine {
    _id: string
    admin: string
    customer: string
    dateIN: Date
    dateOUT: Date
    days: daysOfWeek[]
    kal: number
    level: levelObjetive
    objective: string
}