import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useCart } from './context/CartContext';

function App() {
    const [currentPage, setCurrentPage] = useState('products');
    const { cart } = useCart();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-blue-600">OneBuy</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentPage('products')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 'products'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setCurrentPage('cart')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${currentPage === 'cart'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                            >
                                Cart
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                {currentPage === 'products' ? <ProductList /> : <Cart />}
            </main>
        </div>
    );
}

export default App;
