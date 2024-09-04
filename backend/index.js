import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.route.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to DB")
    app.listen(5001, () => {
        console.log('server running on port 5001...')
    });
    
}).catch((err) => {
    console.log('cannot connect to DB');
});

app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ success: false, statusCode, message });
})