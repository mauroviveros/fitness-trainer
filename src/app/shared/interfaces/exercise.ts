export interface Exercise{
  _id: string
  name: string
  category: Category
  description?: string
  video?: string
  [key: string]: string | undefined
}
export type Category = "WARM_UP" | "TRAINING"