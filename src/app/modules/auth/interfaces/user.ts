import { Routine } from "src/app/shared/interfaces/routine";

export interface UserDocument {
    _id     : string,
    email   : string,
    name    : string,
    surname : string,
    admin   : boolean,
    routine?: Routine,
    [key: string]: string | boolean | undefined | Routine
}

export interface UserDocumentOutput{
    name    : string,
    surname : string,
}