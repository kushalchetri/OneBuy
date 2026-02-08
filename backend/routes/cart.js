import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { validateCartItem } from '../middleware/validation.js';

const router = express.Router();

// GET /cart - Return items populated with productId
router.get('/', async (req, res, next) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.status(200).json(cartItems);
    } catch (error) {
        next(error);
    }
});

// POST /cart - Add item or increment quantity
router.post('/', validateCartItem, async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if item already in cart
        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ productId, quantity });
        }

        // Return populated item
        await cartItem.populate('productId');
        res.status(201).json(cartItem);
    } catch (error) {
        next(error);
    }
});

// PATCH /cart/:productId - Update quantity
router.patch('/:productId', async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        if (!quantity || typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ error: 'Quantity must be a positive number' });
        }

        const cartItem = await Cart.findOneAndUpdate(
            { productId },
            { quantity },
            { new: true, runValidators: true }
        ).populate('productId');

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json(cartItem);
    } catch (error) {
        next(error);
    }
});

// DELETE /cart/:productId - Remove item
router.delete('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cartItem = await Cart.findOneAndDelete({ productId });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error);
    }
});

export default router;
