import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                    ₹{product.price}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
