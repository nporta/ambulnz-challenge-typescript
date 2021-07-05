import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: Schema.ObjectId,
  orderItems: [{ 
    type: Schema.Types.ObjectId,
    ref: 'OrderItem', 
    required: true 
  }],
});

export default mongoose.model('Order', orderSchema);
