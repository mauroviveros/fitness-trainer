export interface Exercise {
    _id         : string,
    name        : string,
    description : string,
    video       : string
}

export interface ExerciseOUT {
    name        : string,
    description : string,
    video       : string
}


export type ExerciseAction = "delete" | "detail" | "update" | "video";