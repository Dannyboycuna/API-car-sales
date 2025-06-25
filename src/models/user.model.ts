import mongoose, { Schema } from "mongoose"

export interface Users{
  username: string,
  password: String,
  photo?: String,
  email: String
};
  
const usersSchema = new Schema<Users>({
  username:{
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required:true
  },
  photo: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: true,
    unique: true
  }
})

export const Users=mongoose.model<Users>('Users', usersSchema)