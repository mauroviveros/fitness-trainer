
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
    verified?   : boolean,
    name?       : string,
    surname?    : string,
    dateLastEmailVerification? : Date
}

export type Role = "USER" | "ADMIN" | "OWNER";