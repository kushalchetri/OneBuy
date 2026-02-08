import express from 'express';
import Checkout from '../models/Checkout.js';
import Cart from '../models/Cart.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        // 1. Fetch all cart items populated with productId to get prices
        const cartItems = await Cart.find().populate('productId');

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // 2. Calculate total amount and prepare items for Checkout model
        let totalAmount = 0;
        const items = [];

        for (const item of cartItems) {
            // Handle case where product might have been deleted but cart item remains
            if (item.productId) {
                const amount = item.quantity * item.productId.price;
                totalAmount += amount;

                items.push({
                    productId: item.productId._id,
                    quantity: item.quantity
                });
            }
        }

        if (items.length === 0) {
            return res.status(400).json({ error: 'No valid products in cart' });
        }

        // 3. Create Checkout document
        const checkout = await Checkout.create({
            items,
            totalAmount
        });

        // 4. Clear Cart
        await Cart.deleteMany({});

        // 5. Return success
        res.status(201).json({
            message: 'Checkout successful',
            order: checkout
        });

    } catch (error) {
        next(error);
    }
});

export default router;
