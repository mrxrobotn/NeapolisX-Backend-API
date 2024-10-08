import mongoose from "mongoose";
const { Schema, model } = mongoose

const heartrateSchema = new Schema(
    {
        heartRate: { 
            type: Number,
            required: true
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
export default model('Heartrate', heartrateSchema);