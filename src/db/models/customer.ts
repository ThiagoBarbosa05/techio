import mongoose, { Document, Model, Schema } from 'mongoose'

export interface Customer extends Document {
  email: string
  firstName: string | null
  lastName: string | null
  password: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export const customerSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
})

export const Customer: Model<Customer> =
  mongoose.models.Customer ||
  mongoose.model<Customer>('Customer', customerSchema)
