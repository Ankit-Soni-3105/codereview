import mongoose from 'mongoose';
import config from '../config/config.js';

function connectToDb() {
    mongoose.connect(config.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('Error connecting to MongoDB', err);
        });
}

export default connectToDb;