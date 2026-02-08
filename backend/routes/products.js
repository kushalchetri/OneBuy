import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

export default router;
