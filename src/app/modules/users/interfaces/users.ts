
export interface UserDocument {
    email?  : string,
    name    : string,
    surname : string,
    role    : Role
}

export interface UserDialog{
    role    : Role
}


export enum Role {
    user    = "USER",
    admin   = "ADMIN",
    owner   = "OWNER"
}