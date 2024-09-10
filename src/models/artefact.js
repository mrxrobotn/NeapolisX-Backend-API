import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const artefactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true
        },
        keyHash: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Artefact', artefactSchema);
