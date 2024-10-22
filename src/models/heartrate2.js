import mongoose from "mongoose";
const { Schema, model } = mongoose

const heartrate2Schema = new Schema(
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
export default model('Heartrate2', heartrate2Schema);