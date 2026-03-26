import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: ''
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);