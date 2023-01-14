import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

import testRoute from './routes/test.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/test", testRoute);

mongoose.set("strictQuery", false);

function connectDB() {
      mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log('\nDatabase connected!'))
      .catch((error) => console.log('\nConnection failed ; '+error.message))
}
connectDB()

app.get("/", (req, res) => {
      // res.download("server.js"); //download pop-up
      res.status(200).json({
        success: true,
        message: `Delta is running!`
      });
      // console.log("here");
    });

const PORT = process.env.PORT || "6000";
app.listen(PORT, ()=>console.log(`\nServer is running at http://localhost:${PORT} with environment: ${process.env.NODE_ENV}`));

