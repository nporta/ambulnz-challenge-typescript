import mongoose from 'mongoose'

import { OrderItem } from './order-item'

const Schema = mongoose.Schema

export interface OrderItems {
  orderItems: OrderItem[]
}

const orderSchema = new Schema<OrderItems>({
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
});

export default mongoose.model<OrderItems>('Order', orderSchema)
