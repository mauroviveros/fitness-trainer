
export interface UserDocument {
    _id         : string,
    email       : string,
    name        : string,
    surname     : string,
    verified    : boolean,
    role        : Role,
    dateCreated : Date,
    [key: string]: string | boolean | Date
}

export interface UserDocumentOutput{
    verified?   : boolean,
    name?       : string,
    surname?    : string,
}

export type Role = "USER" | "ADMIN" | "OWNER";