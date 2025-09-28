import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

// import db connection
import connectToDB from './config/db.js';

// import middlewares
import logger from './middleware/logger.js';

// import routes
import userRoutes from './routes/user.js';
import incomeRoutes from './routes/income.js';
import expenseRoutes from './routes/expense.js';

// load environment variables
dotenv.config();
const PORT = process.env.PORT || 5003;

// construct the path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// connect to database
connectToDB();

// initialize express
const app = express();

// cors allow the server to accept request from different origin
// const allowedOrigins = process.env.CORS_ORIGINS
//     ? process.env.CORS_ORIGINS.split(',')
//     : ['http://localhost:5173'];

// app.use(
//     cors({
//         origin: "http://localhost:3000", // allow frontend
//         methods: ["GET", "POST", "DELETE", "PUT"],
//         credentials: true,
//     })
// );


const allowedOrigins = [
    "http://localhost:5173", // or 3000 if using React dev server
    "http://localhost:3000",
    "https://your-frontend-service.onrender.com" // your deployed frontend URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser tools like Postman
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // allow cookies to be sent
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// parses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// use routes
app.use('/api', userRoutes);
app.use('/api', incomeRoutes);
app.use('/api', expenseRoutes);

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '500 - Internal Server Error' });
});

// listen to port
app.listen(PORT, () => {
    console.log(`server is up and running on port :${PORT}`);
});
