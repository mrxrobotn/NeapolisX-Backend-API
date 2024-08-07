import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const puzzlesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export default model('Puzzle', puzzlesSchema);
