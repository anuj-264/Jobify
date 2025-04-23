import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import connectDB from "./db/db.js";
import app from './app.js';

const port = process.env.PORT || 5000;


import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

connectDB() .then(() => {
    app.listen(port, (err) => {
        if (err) {
            console.error(`Error while starting the server: ${err.message}`);
            process.exit(1); // Exit the process if the server fails to start
        }
        
    });
})
.catch((error) => {
    console.error(`Error while connecting to DB: ${error.message}`);
    process.exit(1); // Exit the process if DB connection fails
});
;
