
export interface UserDocument {
    _id         : string,
    email       : string,
    name        : string,
    surname     : string,
    verified    : boolean,
    role        : Role,
    dateCreated : Date,
    dateLastEmailVerification? : Date,
    [key: string]: string | boolean | Date | undefined
}

export interface UserDocumentOutput{
    name    : string,
    surname : string,
}

export type Role = "USER" | "ADMIN" | "OWNER";