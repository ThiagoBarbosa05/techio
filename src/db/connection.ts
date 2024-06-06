import mongoose from 'mongoose'

const DATABASE_URL = process.env.DATABASE_URL as string

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

interface MongooseGlobal {
  conn: mongoose.Connection | null
  promise: Promise<mongoose.Connection> | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose as MongooseGlobal

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB(): Promise<mongoose.Connection | undefined> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(DATABASE_URL, opts)
      .then((mongoose) => mongoose.connection)
  }

  cached.conn = await cached?.promise
  return cached.conn
}

// export async function connectDB() {
//   await mongoose.connect(DATABASE_URL, { autoCreate: true, autoIndex: true })
// }
