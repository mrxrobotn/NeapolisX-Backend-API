import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        epicGamesId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'event',
        }],
        sessions: [{
            type: Schema.Types.ObjectId,
            ref: 'session',
        }],
        room: {
            type: String,
        },
        canAccess: {
            type: Boolean,
            required: true
        },
        isAuthorized: {
            type: Boolean,
            required: true
        },
        role: {
            type: String,
            enum: ['Admin', 'Staff', 'Entrepreneur', 'Talent', 'Visitor'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
