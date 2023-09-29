export interface UserDoc{
  _id: string
  name: string
  surname: string
  instagram: string
  gender: string
  birthday: Date
  [key: string]: string | boolean | Date
  _admin: boolean
  }