import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Pizza {
  name: string
  price: number
}

const pizzaSchema = new Schema<Pizza>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
})

export default mongoose.model<Pizza>('Pizza', pizzaSchema)