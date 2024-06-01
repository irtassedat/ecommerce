import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/actions/userActions';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { faPhone, faEnvelope, faUser, faHeart, faCartShopping, faCaretDown, faTrash, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useGravatar } from 'use-gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { incrementProductCount, decrementProductCount, removeFromCart } from '../../store/actions/shoppingCartAction';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.userInfo);
    const categories = useSelector(state => state.global.categories);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const gravatarUrl = useGravatar(user?.email);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.shoppingCart.cartList);
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [user]);

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        history.push('/login');
        toast.info("Çıkış yapıldı.");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleCartDropdown = () => {
        if (cartItems.length > 0) {
            setIsCartDropdownOpen(!isCartDropdownOpen);
        } else {
            toast.info("Sepetinizde ürün bulunmamaktadır.");
        }
    };

    const closeDropdown = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDropdownOpen(false);
        }
    };
    
    const groupedCategories = categories.reduce((acc, category) => {
        const genderKey = category.gender === 'k' ? 'Women' : 'Men';
        if (!acc[genderKey]) {
            acc[genderKey] = [];
        }
        acc[genderKey].push(category);
        return acc;
    }, {});

    const totalCartItems = cartItems.reduce((total, item) => total + item.count, 0);

    const handleCompleteOrder = () => {
        history.push('/create-order');
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.count * item.product.price), 0);
    const shippingFee = 29.99;
    const freeShippingThreshold = 150;
    const isEligibleForFreeShipping = totalPrice >= freeShippingThreshold;
    const shippingCost = totalPrice > 0 ? (totalPrice >= freeShippingThreshold ? 0 : shippingFee) : 0;
    const grandTotal = isEligibleForFreeShipping ? totalPrice : totalPrice + shippingCost;

    useEffect(() => {
        if (cartItems.length === 0) {
            setIsCartDropdownOpen(false);
        }
    }, [cartItems]);

    return (
        <>
            <div className='w-screen h-[60px] bg-[#252B42] text-white px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center text-sm font-bold leading-6'>
                    <div className='flex items-center gap-10'>
                        <FontAwesomeIcon icon={faPhone} /><h6>(225) 555-0118</h6>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-1' /><h6>michelle.rivera@example.com</h6>
                    </div>
                    <h6>Follow Us and get a chance to win 80% off</h6>
                    <div className='flex items-center gap-3'>
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
            </div>
            <div className='w-screen h-[90px] px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center'>
                    <div className='flex items-center justify-between w-[50%]'>
                        <h6 className='font-bold text-2xl leading-8'>Bandage</h6>
                        <nav className='flex gap-3 text-sm leading-6 items-center'>
                            <Link to="/">Home</Link>
                            <div className="relative" onBlur={closeDropdown}>
                                <div onClick={toggleDropdown} className="flex items-center space-x-2 cursor-pointer">
                                    <Link to="/shop" className="text-sm">Shop</Link>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                        {Object.keys(groupedCategories).map((gender, index) => (
                                            <div key={index}>
                                                <div className="px-4 py-2 text-sm text-gray-700 font-bold">{gender}</div>
                                                {groupedCategories[gender].map((category, categoryIndex) => (
                                                    <Link key={categoryIndex} to={`/shopping/${category.gender}/${category.code}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        {category.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Link to="/about">About</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/">Pages</Link>
                        </nav>
                    </div>
                    <div className='flex gap-4 items-center text-sm leading-4 text-[#23A6F0]'>
                        {isLoggedIn ? (
                            <>
                                <img src={gravatarUrl} alt="User Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                <span>Hello, {user.name || user.email}</span>
                                <button onClick={handleLogout}>Çıkış Yap</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><FontAwesomeIcon icon={faUser} /> Login</Link>
                                <Link to="/signup">Register</Link>
                            </>
                        )}
                        <div onClick={toggleCartDropdown} className="relative cursor-pointer">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span> ({totalCartItems})</span>
                            {isCartDropdownOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-20">
                                    <div className="relative max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden mt-10 mr-10">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h1 className="text-xl font-bold text-gray-900">Sepetim ({cartItems.length} Ürün)</h1>
                                                <button className="text-gray-500" onClick={toggleCartDropdown}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                                {cartItems.map((item, index) => (
                                                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg relative">
                                                        <img src={item.product.images[0].url} alt={item.product.name} className="object-scale-down h-32 w-32 rounded-lg" />
                                                        <div className="ml-4">
                                                            <h2 className="text-sm font-medium text-gray-900">{item.product.name}</h2>
                                                            <p className="text-sm text-gray-500">{item.product.description}</p>
                                                            <p className="text-sm font-medium text-blue-500">{item.product.price.toFixed(2)} TL</p>
                                                        </div>
                                                        <div className="ml-auto flex items-center">
                                                            <button onClick={(event) => {
                                                                event.stopPropagation();
                                                                dispatch(decrementProductCount(item.product.id));
                                                            }} className="text-sm text-gray-500 bg-gray-200 px-2 rounded-full">
                                                                -
                                                            </button>
                                                            <span className="mx-2 text-sm">{item.count}</span>
                                                            <button onClick={(event) => {
                                                                event.stopPropagation();
                                                                dispatch(incrementProductCount(item.product.id));
                                                            }} className="text-sm text-white bg-blue-500 px-2 rounded-full">
                                                                +
                                                            </button>
                                                        </div>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            dispatch(removeFromCart(item.product.id));
                                                        }} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                        <Link to={`/product/${item.product.id}`} className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-6">
                                                <div className="flex justify-between text-gray-900">
                                                    <span>Ürün Toplamı:</span>
                                                    <span>{totalPrice.toFixed(2)} TL</span>
                                                </div>
                                                <div className="flex justify-between text-gray-900">
                                                    <span>Kargo Ücreti:</span>
                                                    <span>{isEligibleForFreeShipping ? 'Ücretsiz' : `${shippingCost.toFixed(2)} TL`}</span>
                                                </div>
                                                <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
                                                    <span>Toplam:</span>
                                                    <span>{grandTotal.toFixed(2)} TL</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-6 space-x-4">
                                                <Link to="/shopping-cart" className="flex-1 bg-gray-200 text-black py-3 rounded-lg text-center">Sepete Git</Link>
                                                <button onClick={handleCompleteOrder} className="flex-1 bg-blue-500 text-white py-3 rounded-lg text-center">Siparişi Tamamla</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <FontAwesomeIcon icon={faHeart} /> 1
                    </div>
                </div>
            </div>
        </>
    );
}
