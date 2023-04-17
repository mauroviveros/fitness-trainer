
export interface UserDocument {
    _id         : string,
    email       : string,
    name        : string,
    surname     : string,
    admin?      : boolean,
    [key: string]: string | boolean | undefined
}

export interface UserDocumentOutput{
    name    : string,
    surname : string,
}