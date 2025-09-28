import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(PATH, '..', '.env') });

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        console.log('Connected to the database successfully');
    } catch (err) {
        console.error(err);
    }
};

export default connectToDB;
