import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart, addToFavorites } from '../../store/actions/shoppingCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faEye, faStar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ data }) => {
    const dispatch = useDispatch();
    
    const productNameSlug = data.name ? data.name.replace(/\s+/g, '-').toLowerCase() : '';
    const productImageUrl = data.images && data.images.length > 0 ? data.images[0].url : '';

    const handleAddToCart = () => {
        dispatch(addToCart(data));
    };

    const handleAddToFavorites = () => {
        dispatch(addToFavorites(data));
    };

    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl transform transition-transform duration-300 hover:scale-105 relative">
            <div className="relative aspect-w-1 aspect-h-1">
                <img className="w-full h-full object-cover" src={productImageUrl} alt={data.name} />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">Sale</span>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <button className="bg-white dark:bg-zinc-700 p-2 rounded-full shadow-md opacity-75 hover:opacity-100" onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                    <Link to={`/${data.category_id}/${data.id}/${productNameSlug}`} className="bg-white dark:bg-zinc-700 p-2 rounded-full shadow-md opacity-75 hover:opacity-100">
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <button className="bg-white dark:bg-zinc-700 p-2 rounded-full shadow-md opacity-75 hover:opacity-100" onClick={handleAddToFavorites}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <div className="text-blue-500 dark:text-blue-300 text-sm font-semibold">{data.category}</div>
                <div className="flex items-center justify-between">
                    <Link to={`/${data.category_id}/${data.id}/${productNameSlug}`} className="text-lg font-bold text-zinc-900 dark:text-gray-300">{data.name}</Link>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                        <span className="ml-1 text-sm text-zinc-600 dark:text-zinc-400">4.9</span>
                    </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">{data.description}</p>
                <div className="flex items-center mt-4">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-green-500" />
                    <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">41 Sales</span>
                    <span className="ml-2 text-green-500 dark:text-orange-400 font-semibold">${data.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
