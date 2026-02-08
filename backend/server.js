import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';
import { errorHandler } from './middleware/errorHandler.js';
import { seedDatabase } from './utils/seeder.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);

app.use(errorHandler);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ MongoDB connected successfully');

        await seedDatabase();

        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
