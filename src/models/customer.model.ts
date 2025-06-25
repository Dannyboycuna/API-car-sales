import mongoose, { Schema } from "mongoose"

export interface Customers{
  name: string,
  photo?: String,
  email: String,
  vehicleId: String
};
  
const customersSchema = new Schema<Customers>({
  name:{
    type: String,
    required: true,
    unique:true
  },
  photo: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      require:true
    }
})

export const Customers=mongoose.model<Customers>('Customers', customersSchema)