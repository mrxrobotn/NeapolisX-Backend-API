import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        tezWallet: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            match: [/.+@.+\..+/, 'Please fill a valid email address']
        },
        overallTime: {
            type: String,
        },
        review: {
            type: String,
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
                timeSpent: {
                    type: String,
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
                },
                timeSpent: {
                    type: String,
                },
            }]
        }

    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
