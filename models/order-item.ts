import mongoose from 'mongoose'

import { Pizza } from './pizza'

const Schema = mongoose.Schema

export interface OrderItem {
  pizza: Pizza
  quantity: number
}

const orderItemSchema = new Schema<OrderItem>({
  pizza: {
    type: Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true
  },
  quantity: { type: Number, required: true }
})

export default mongoose.model<OrderItem>('OrderItem', orderItemSchema)