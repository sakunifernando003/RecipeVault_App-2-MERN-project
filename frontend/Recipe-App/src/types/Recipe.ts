export interface Recipe {
  _id: string
  title: string
  ingredients: string[]
  instructions: string
  time?: string
  coverImage?: string
  createdBy?: string
}
