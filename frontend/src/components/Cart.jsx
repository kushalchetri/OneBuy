import { useCart } from '../context/CartContext';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
                <div className="text-center py-16">
                    <p className="text-gray-500 text-xl">Your cart is empty</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                {cart.map(item => (
                    <div key={item._id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-blue-600 font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-lg font-bold"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-lg font-bold"
                            >
                                +
                            </button>
                        </div>
                        <div className="text-lg font-bold text-gray-800 w-24 text-right">
                            ₹{item.price * item.quantity}
                        </div>
                        <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-2xl font-bold text-gray-800">Total:</span>
                        <span className="text-3xl font-bold text-blue-600">₹{getTotal()}</span>
                    </div>
                    <button
                        onClick={async () => {
                            try {
                                await axios.post('http://localhost:5000/checkout');
                                clearCart();
                                alert('Checkout successful');
                            } catch (error) {
                                console.error('Checkout error:', error);
                                alert('Checkout failed');
                            }
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
