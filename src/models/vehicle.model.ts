import mongoose, { Schema } from "mongoose";
export interface Vehicle {
  name: String;
  photo?: String;
  brandId?: String;
  color: string;
  description: string;
  price: string
}

const VehicleSchema = new Schema<Vehicle>({
  name: {
    type: String,
    require: true
  },
  photo: {
    type: String,
    require: false
  },
  description: {
    type: String,
    default:'In a good condition'
  },
  price: {
    type: String,
    default: '10.000 MZN'
  },
  color: {
    type: String,
    default: 'white'
  }

})
export const Vehicle = mongoose.model<Vehicle>('Vehicle', VehicleSchema)