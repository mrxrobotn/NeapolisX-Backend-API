import mongoose from "mongoose";
const { Schema, model } = mongoose

const heartrateSchema = new Schema(
    {
        heartRate: { 
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export default model('Heartrate', heartrateSchema);