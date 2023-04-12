
export interface UserDocument {
    _id     : string,
    email   : string,
    name    : string,
    surname : string,
    role    : Role,
    [key: string]: string
}

export type Role = "USER" | "ADMIN" | "OWNER";