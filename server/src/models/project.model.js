import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        default: ""
    },
    review: {
        type: String,
        default: ""
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
},
    {
        timestamps: true,
    }
);



const projectModel = mongoose.model('Project', projectSchema);

export default projectModel;