import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IOrder extends Document {
  customerId: string
  cartId: string
  totalItems: number
  amount: number
  createdAt?: Date | null
}

export const orderSchema = new Schema<IOrder>({
  customerId: { type: String, required: true },
  cartId: { type: String, required: true },
  amount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema)
