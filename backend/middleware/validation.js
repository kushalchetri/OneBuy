export const validateCartItem = (req, res, next) => {
    const { productId, quantity } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    if (quantity && (typeof quantity !== 'number' || quantity < 1)) {
        return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    next();
};
