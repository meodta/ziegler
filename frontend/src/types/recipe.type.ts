export type Recipe = {
  _id: string
  name: string
  imageUrl: string
  originalUrl: string
  ingredients: { name: string, type: string, quantity: string }[]
  timers: number[]
  steps: string[]
}
