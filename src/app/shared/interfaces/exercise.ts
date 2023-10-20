export interface Exercise{
  _id: string
  name: string
  description: string
  video: string
  category: Category
  [key: string]: string
}
export type Category = "WARM_UP" | "TRAINING"