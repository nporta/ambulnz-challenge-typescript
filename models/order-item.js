import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderItemSchema = new Schema({
  pizza: { 
    type: Schema.Types.ObjectId,
    ref: 'Pizza', 
    required: true 
  },
  quantity: { type: Number, required: true }
})

export default mongoose.model('OrderItem', orderItemSchema)