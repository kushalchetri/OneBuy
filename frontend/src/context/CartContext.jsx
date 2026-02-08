import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Backend URL
    const API_URL = 'http://localhost:5000/cart';

    // Fetch initial cart
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(API_URL);
            const data = response.data;

            
            const formattedCart = data.map(item => {
                const product = item.productId;
                if (!product) return null;

                return {
                    ...product,
                    _id: product._id,
                    quantity: item.quantity
                };
            }).filter(Boolean);

            setCart(formattedCart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (product) => {
        // Optimistic update
        setCart(prev => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        // Sync with backend
        try {
            await axios.post(API_URL, {
                productId: product._id,
                quantity: 1
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            fetchCart(); // Revert on error
        }
    };

    const removeFromCart = async (productId) => {
        setCart(prev => prev.filter(item => item._id !== productId));
        try {
            await axios.delete(`${API_URL}/${productId}`);
        } catch (error) {
            console.error('Error removing from cart:', error);
            fetchCart();
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(prev =>
            prev.map(item =>
                item._id === productId
                    ? { ...item, quantity }
                    : item
            )
        );

        try {
            await axios.patch(`${API_URL}/${productId}`, { quantity });
        } catch (error) {
            console.error('Error updating quantity:', error);
            fetchCart();
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
