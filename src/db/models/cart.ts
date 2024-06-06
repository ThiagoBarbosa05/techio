import mongoose, { Document, Model, Schema } from 'mongoose'

export interface CartItem {
  title: string
  description: string
  price: number
  imageUrl: string
  quantity: number
  productId: number
}

interface Cart extends Document {
  items: CartItem[]
  customerId: string
  totalPrice: number
  isPending: boolean
  createdAt: Date
  updatedAt: Date
}

export const cartItemSchema = new Schema<CartItem>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  productId: { type: Number, required: true },
})

export const cartSchema = new Schema<Cart>({
  items: [cartItemSchema],
  customerId: {
    type: String,
    required: true,
  },
  totalPrice: { type: Number, required: true, default: 0 },
  isPending: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// cartSchema.pre<Cart>('save', function (next) {
//   this.totalPrice = this.items.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0,
//   )
//   this.updatedAt = new Date()
//   next()
// })

export const Cart: Model<Cart> =
  mongoose.models.Cart || mongoose.model<Cart>('Cart', cartSchema)
