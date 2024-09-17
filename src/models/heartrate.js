import mongoose from "mongoose";
const { Schema, model} = mongoose

const heartrateSchema = new Schema(
    {
        value: {
            type: Number
        }
    }
)
export default model('Heartrate', heartrateSchema);