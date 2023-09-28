import { Exercise } from "./exercise";
import { daysOfWeek } from "./routine";
import { UserDoc } from "./user";

export interface Scheme{
    _id: string
    customer: UserDoc
    exercise: Exercise
    dayOfWeek: daysOfWeek
    series: number
    reps: number
    rir: number
    weights: number[]
    [key: string]: number | number[] | string | UserDoc | Exercise
}

export interface SchemeOUT {
    _id: string
    customer: string
    exercise: string
    dayOfWeek: number
    series: number
    reps: number
    rir: number
}