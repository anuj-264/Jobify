import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import "express-async-errors"; // to handle async errors in express routes
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import { authenticateUser } from "./middlewares/auth.middleware.js";

const app = express();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public'))); // Serve static files from the public directory
// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());

//console.log('Environment:', process.env.NODE_ENV);


// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    
    res.json({
        message: 'data received',
        data: req.body,
    });
});


///////////Import Routes

import jobRouter from "./routes/job.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

//////////////////////////////////Declare Routes//////////////////////////////////////////

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);


////////////////////////////////////////////////////////////
app.use("*", (req, res) => {
    res.status(404).json({ msg: "Page not found" });
});

//needs to be the last middleware in the chain 
app.use(errorHandlerMiddleware); // error handler middleware
///////////////////////////////////////////////////////////////////////////

export default app;