import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    members: [
        {
            type: String
        }
    ],
});

const roomModel = mongoose.model("room", roomSchema);

export default roomModel;