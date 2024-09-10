import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        tezWallet: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            match: [/.+@.+\..+/, 'Please fill a valid email address']
        },
        review: {
            type: Number,
        },
        timeSpent: {
            type: String,
        },
        coins: {
            type: Number,
            default: 0,
        },
        artifactsData: {
            skipped: {
                type: Boolean,
                default: false
            },
            artefacts: [{
                artefactId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Artefact',
                },
            }]
        },
        puzzlesMinigame: {
            skipped: {
                type: Boolean,
                default: false
            },
            puzzles: [{
                puzzleId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Puzzle',
                }
            }]
        }

    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
