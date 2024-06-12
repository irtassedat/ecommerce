import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/actions/userActions';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { faPhone, faEnvelope, faUser, faHeart, faCartShopping, faCaretDown, faTrash, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useGravatar } from 'use-gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { incrementProductCount, decrementProductCount, removeFromCart, removeFromFavorites, setCartItems, setFavoriteItems } from '../../store/actions/shoppingCartAction';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.userInfo);
    const categories = useSelector(state => state.global.categories);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const gravatarUrl = useGravatar(user?.email);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
    const [isFavoritesDropdownOpen, setIsFavoritesDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.shoppingCart.cartList);
    const favoriteItems = useSelector(state => state.shoppingCart.favoritesList);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [user]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            dispatch(setCartItems(storedCartItems));
        }

        const storedFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems'));
        if (storedFavoriteItems) {
            dispatch(setFavoriteItems(storedFavoriteItems));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }, [favoriteItems]);

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

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const toggleCartDropdown = () => {
        if (cartItems.length > 0) {
            setIsCartDropdownOpen(!isCartDropdownOpen);
        } else {
            toast.info("Sepetinizde ürün bulunmamaktadır.");
        }
    };

    const toggleFavoritesDropdown = () => {
        if (favoriteItems.length > 0) {
            setIsFavoritesDropdownOpen(!isFavoritesDropdownOpen);
        } else {
            toast.info("Favori listenizde ürün bulunmamaktadır.");
        }
    };

    const closeDropdown = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDropdownOpen(false);
            setIsUserMenuOpen(false);
            setIsCartDropdownOpen(false);
            setIsFavoritesDropdownOpen(false);
        }
    };

    const handleCategoryClick = (category) => {
        history.push(`/shop?category=${category.id}`);
        setIsDropdownOpen(false);
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
    const totalFavoritesItems = favoriteItems.length;

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

    useEffect(() => {
        if (favoriteItems.length === 0) {
            setIsFavoritesDropdownOpen(false);
        }
    }, [favoriteItems]);

    const handleShopClick = () => {
        history.push('/shop');
        setIsDropdownOpen(true);
    };

    return (
        <>
            <div className='w-screen h-[60px] bg-[#252B42] text-white px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center text-sm font-bold leading-6'>
                    <div className='hidden md:flex items-center gap-10'>
                        <FontAwesomeIcon icon={faPhone} /><h6>(225) 555-0118</h6>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-1' /><h6>michelle.rivera@example.com</h6>
                    </div>
                    <h6 className='hidden md:block'>Follow Us and get a chance to win 80% off</h6>
                    <div className='hidden md:flex items-center gap-3'>
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
            </div>
            <div className='w-screen h-[90px] px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center'>
                    <h6 className='font-bold text-2xl leading-8'>Bandage</h6>
                    <nav className='hidden md:flex gap-3 text-sm leading-6 items-center'>
                        <Link to="/">Home</Link>
                        <div className="relative" onBlur={closeDropdown}>
                            <div onClick={toggleDropdown} className="flex items-center space-x-2 cursor-pointer">
                                <span className="text-sm text-black">Shop</span>
                                <FontAwesomeIcon icon={faCaretDown} className="text-[#23A6F0]" />
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 overflow-y-auto max-h-60">
                                    {Object.keys(groupedCategories).map((gender, index) => (
                                        <div key={index}>
                                            <div className="px-4 py-2 text-sm text-gray-700 font-bold">{gender}</div>
                                            {groupedCategories[gender].map((category, categoryIndex) => (
                                                <button
                                                    key={categoryIndex}
                                                    onClick={() => handleCategoryClick(category)}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    {category.title}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link to="/about" className="text-sm text-black">About</Link>
                        <Link to="/blog" className="text-sm text-black">Blog</Link>
                        <Link to="/contact" className="text-sm text-black">Contact</Link>
                        <Link to="/" className="text-sm text-black">Pages</Link>
                    </nav>
                    <div className='hidden md:flex gap-4 items-center text-sm leading-4 text-[#23A6F0]'>
                        {isLoggedIn ? (
                            <div className="relative" onBlur={closeDropdown}>
                                <div onClick={toggleUserMenu} className="flex items-center space-x-2 cursor-pointer">
                                    <img src={gravatarUrl} alt="User Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                    <span>Hello, {user.name || user.email}</span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                        <Link to="/previous-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Siparişlerim</Link>
                                        <Link to="/previous-orders#favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favorilerim</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Çıkış Yap</button>
                                    </div>
                                )}
                            </div>
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
                                        <div className="p-4">
                                            <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                                {cartItems.map((item, index) => (
                                                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg relative">
                                                        <img src={item.product.images[0].url} alt={item.product.name} className="object-scale-down h-12 w-12 rounded-lg" />
                                                        <div className="ml-4">
                                                            <h2 className="text-sm font-medium text-gray-900">{item.product.name}</h2>
                                                            <p className="text-sm text-gray-500">{item.product.description}</p>
                                                            <p className="text-sm font-medium text-blue-500">{item.product.price.toFixed(2)} TL</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button onClick={() => dispatch(decrementProductCount(item.product.id))} className="text-gray-500 hover:text-gray-700">-</button>
                                                            <span className="mx-2">{item.count}</span>
                                                            <button onClick={() => dispatch(incrementProductCount(item.product.id))} className="text-gray-500 hover:text-gray-700">+</button>
                                                        </div>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            dispatch(removeFromCart(item.product.id));
                                                        }} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 text-sm">
                                                <div className="flex justify-between text-gray-900">
                                                    <span>Ürün Toplamı:</span>
                                                    <span>{totalPrice.toFixed(2)} TL</span>
                                                </div>
                                                <div className="flex justify-between text-gray-900">
                                                    <span>Kargo Ücreti:</span>
                                                    <span>{isEligibleForFreeShipping ? 'Ücretsiz' : `${shippingCost.toFixed(2)} TL`}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                                                    <span>Toplam:</span>
                                                    <span>{grandTotal.toFixed(2)} TL</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-4 space-x-4">
                                                <Link to="/shopping-cart" className="flex-1 bg-gray-200 text-black py-2 rounded-lg text-center">Sepete Git</Link>
                                                <button onClick={handleCompleteOrder} className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center">Siparişi Tamamla</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div onClick={toggleFavoritesDropdown} className="relative cursor-pointer">
                            <FontAwesomeIcon icon={faHeart} />
                            <span> ({totalFavoritesItems})</span>
                            {isFavoritesDropdownOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-20">
                                    <div className="relative max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden mt-10 mr-10">
                                        <div className="p-4">
                                            <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                                {favoriteItems.map((item, index) => (
                                                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg relative">
                                                        <img 
                                                            src={item.images && item.images.length > 0 ? item.images[0].url : 'default_image_url'} 
                                                            alt={item.name} 
                                                            className="object-scale-down h-12 w-12 rounded-lg" 
                                                        />
                                                        <div className="ml-4">
                                                            <h2 className="text-sm font-medium text-gray-900">{item.name}</h2>
                                                            <p className="text-sm text-gray-500">{item.description}</p>
                                                            <p className="text-sm font-medium text-blue-500">{item.price.toFixed(2)} TL</p>
                                                        </div>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            dispatch(removeFromFavorites(item.id));
                                                        }} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='md:hidden flex items-center' onBlur={closeDropdown}>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-blue-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faBars} size="lg" />
                        </button>
                        {isMobileMenuOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-20">
                                <div className="relative max-w-xs w-full bg-white rounded-xl shadow-md overflow-hidden mt-10 mr-10">
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-2xl font-bold text-blue-900">Menu</span>
                                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                        <nav className="flex flex-col items-start space-y-4">
                                            <Link to="/" className="text-gray-700 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                                            <button onClick={handleShopClick} className="flex items-center justify-between w-full text-lg text-gray-700">
                                                Shop <FontAwesomeIcon icon={faCaretDown} />
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="w-full mt-2 py-2 bg-white rounded-md shadow-xl z-20 max-h-60 overflow-y-auto">
                                                    {Object.keys(groupedCategories).map((gender, index) => (
                                                        <div key={index}>
                                                            <div className="px-4 py-2 text-sm text-gray-700 font-bold">{gender}</div>
                                                            {groupedCategories[gender].map((category, categoryIndex) => (
                                                                <button
                                                                    key={categoryIndex}
                                                                    onClick={() => handleCategoryClick(category)}
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                                >
                                                                    {category.title}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <Link to="/about" className="text-gray-700 text-lg" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                                            <Link to="/blog" className="text-gray-700 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                                            <Link to="/contact" className="text-gray-700 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                                            <Link to="/" className="text-gray-700 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Pages</Link>
                                        </nav>
                                        <div className="mt-4">
                                            <div className="flex items-center space-x-4">
                                                <div onClick={toggleCartDropdown} className="relative cursor-pointer text-blue-500">
                                                    <FontAwesomeIcon icon={faCartShopping} />
                                                    <span> ({totalCartItems})</span>
                                                    {isCartDropdownOpen && (
                                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-20">
                                                            <div className="relative max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden mt-10 mr-10">
                                                                <div className="p-4">
                                                                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                                                        {cartItems.map((item, index) => (
                                                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg relative">
                                                                                <img src={item.product.images[0].url} alt={item.product.name} className="object-scale-down h-12 w-12 rounded-lg" />
                                                                                <div className="ml-4">
                                                                                    <h2 className="text-sm font-medium text-gray-900">{item.product.name}</h2>
                                                                                    <p className="text-sm text-gray-500">{item.product.description}</p>
                                                                                    <p className="text-sm font-medium text-blue-500">{item.product.price.toFixed(2)} TL</p>
                                                                                </div>
                                                                                <div className="flex items-center">
                                                                                    <button onClick={() => dispatch(decrementProductCount(item.product.id))} className="text-gray-500 hover:text-gray-700">-</button>
                                                                                    <span className="mx-2">{item.count}</span>
                                                                                    <button onClick={() => dispatch(incrementProductCount(item.product.id))} className="text-gray-500 hover:text-gray-700">+</button>
                                                                                </div>
                                                                                <button onClick={(event) => {
                                                                                    event.stopPropagation();
                                                                                    dispatch(removeFromCart(item.product.id));
                                                                                }} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="mt-4 text-sm">
                                                                        <div className="flex justify-between text-gray-900">
                                                                            <span>Ürün Toplamı:</span>
                                                                            <span>{totalPrice.toFixed(2)} TL</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-gray-900">
                                                                            <span>Kargo Ücreti:</span>
                                                                            <span>{isEligibleForFreeShipping ? 'Ücretsiz' : `${shippingCost.toFixed(2)} TL`}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                                                                            <span>Toplam:</span>
                                                                            <span>{grandTotal.toFixed(2)} TL</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-between mt-4 space-x-4">
                                                                        <Link to="/shopping-cart" className="flex-1 bg-gray-200 text-black py-2 rounded-lg text-center">Sepete Git</Link>
                                                                        <button onClick={handleCompleteOrder} className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center">Siparişi Tamamla</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div onClick={toggleFavoritesDropdown} className="relative cursor-pointer text-blue-500">
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    <span> ({totalFavoritesItems})</span>
                                                    {isFavoritesDropdownOpen && (
                                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-20">
                                                            <div className="relative max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden mt-10 mr-10">
                                                                <div className="p-4">
                                                                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                                                        {favoriteItems.map((item, index) => (
                                                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg relative">
                                                                                <img 
                                                                                    src={item.images && item.images.length > 0 ? item.images[0].url : 'default_image_url'} 
                                                                                    alt={item.name} 
                                                                                    className="object-scale-down h-12 w-12 rounded-lg" 
                                                                                />
                                                                                <div className="ml-4">
                                                                                    <h2 className="text-sm font-medium text-gray-900">{item.name}</h2>
                                                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                                                    <p className="text-sm font-medium text-blue-500">{item.price.toFixed(2)} TL</p>
                                                                                </div>
                                                                                <button onClick={(event) => {
                                                                                    event.stopPropagation();
                                                                                    dispatch(removeFromFavorites(item.id));
                                                                                }} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {isLoggedIn ? (
                                                    <div className="relative" onBlur={closeDropdown}>
                                                        <div onClick={toggleUserMenu} className="flex items-center space-x-2 cursor-pointer text-blue-500">
                                                            <img src={gravatarUrl} alt="User Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                                            <span>{user.name || user.email}</span>
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </div>
                                                        {isUserMenuOpen && (
                                                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                                                <Link to="/previous-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Siparişlerim</Link>
                                                                <Link to="/previous-orders#favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favorilerim</Link>
                                                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Çıkış Yap</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-start space-y-2">
                                                        <Link to="/login" className="text-blue-500">Login</Link>
                                                        <Link to="/signup" className="text-blue-500">Register</Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="relative ml-4" onBlur={closeDropdown}>
                                <div onClick={toggleUserMenu} className="flex items-center space-x-2 cursor-pointer">
                                    <img src={gravatarUrl} alt="User Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                        <Link to="/previous-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Siparişlerim</Link>
                                        <Link to="/previous-orders#favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favorilerim</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Çıkış Yap</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
