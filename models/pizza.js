import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pizzaSchema = new Schema({
  id: Schema.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
})

export default mongoose.model('Pizza', pizzaSchema)