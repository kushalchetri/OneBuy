import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

export default mongoose.model('Checkout', checkoutSchema);
