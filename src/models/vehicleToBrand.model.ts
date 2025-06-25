import mongoose, { Schema } from "mongoose"

export interface VehicleToBrand{
  brandId: mongoose.Schema.Types.ObjectId;
  vehicleId: mongoose.Schema.Types.ObjectId;
};
  
const VehicleToBrandSchema = new Schema<VehicleToBrand>({
  brandId:{
    type: mongoose.Schema.ObjectId,
    ref:'Brand'
  },
  vehicleId: {
    type: mongoose.Schema.ObjectId,
    ref:'Vehicle'
  }
})
VehicleToBrandSchema.index({ brand: 1, vehicle: 1 }, { unique: true });

export const VehicleToBrand = mongoose.model<VehicleToBrand>('VehicleToBrand', VehicleToBrandSchema)