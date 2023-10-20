export interface UserDoc{
  _id: string
  name: string
  surname: string
  instagram: string
  gender: number
  birthday: Date
  [key: string]: string | number | boolean | Date
  _admin: boolean
  }