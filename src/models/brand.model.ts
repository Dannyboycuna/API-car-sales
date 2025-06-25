import mongoose, { Schema } from "mongoose"

export interface Brand{
  name: string;
  vehicleId?: mongoose.Schema.Types.ObjectId;
};
  
const brandSchema = new Schema<Brand>({
  name:{
    type: String,
    required: true,
    unique: true,
    uppercase:true
  },
  vehicleId: {
    type: mongoose.Schema.ObjectId,
    ref:'Brand'
  }
})

export const Brand=mongoose.model<Brand>('Brand', brandSchema)