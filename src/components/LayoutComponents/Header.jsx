import React, { useEffect, useState,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/actions/userActions';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { faPhone, faEnvelope, faUser, faHeart, faCartShopping, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useGravatar } from 'use-gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { incrementProductCount, decrementProductCount } from '../../store/actions/shoppingCartAction';


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
        // Kullanıcının giriş yapıp yapmadığını kontrol et
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [user]);


    const handleLogout = () => {
        // Kullanıcı çıkış işlemi
        dispatch(clearUser());
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        history.push('/login');
        toast.info("Çıkış yapıldı.");
    };

    const toggleDropdown = () => {
        // Kategori düşme menüsünü aç/kapat
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleCartDropdown = () => {
        // Sepet düşme menüsünü aç/kapat
        setIsCartDropdownOpen(!isCartDropdownOpen);
    };

    const closeDropdown = (event) => {
        // Menü dışında bir yere tıklandığında menüyü kapat
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDropdownOpen(false);
        }
    };
    
    const groupedCategories = categories.reduce((acc, category) => {
        // Kategorileri cinsiyetlerine göre grupla
        const genderKey = category.gender === 'k' ? 'Women' : 'Men';
        if (!acc[genderKey]) {
          acc[genderKey] = [];
        }
        acc[genderKey].push(category);
        return acc;
    }, {});

    // Sepetteki toplam ürün sayısını hesapla
    const totalCartItems = cartItems.reduce((total, item) => total + item.count, 0);

    const handleCompleteOrder = () => {
        history.push('/create-order'); // Kullanıcıyı CreateOrderPage sayfasına yönlendir
    };

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
                                <img src={gravatarUrl} alt="User Avatar" style={{ width: 30, height: 30, borderRadius: '50%' }} />
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
                                <div className="absolute right-0 mt-2 py-4 w-96 bg-white rounded-lg shadow-lg z-20 divide-y divide-gray-200">
                                    <div className="font-bold text-xl mb-4 p-4">Sepetim ({cartItems.length} Ürün)</div>
                                    <div className="flex flex-col divide-y divide-gray-200">
                                        {cartItems.map((item, index) => (
                                            <div key={index} className="flex gap-4 items-center p-4">
                                                <img src={item.product.images[0].url} alt={item.product.name} className="object-scale-down max-w-24 max-h-full" />
                                                <div className="ml-4 text-center">
                                                    <div className="font-bold text-l text-black">{item.product.name}</div>
                                                    <div className="text-sm text-slate-950/25">{item.product.description}</div>
                                                    <div className="font-bold text-base text-orange-600 mt-1.5">{item.product.price * item.count} TL</div>
                                                    <div className="flex items-center mt-3">
                                                        <span className="text-gray-700 mr-4    ">Adet:</span>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            dispatch(decrementProductCount(item.product.id));
                                                        }} className="text-white bg-red-500 hover:bg-red-600 font-bold py-1 px-3 rounded">
                                                            -
                                                        </button>
                                                        <span className="mx-2">{item.count}</span>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            dispatch(incrementProductCount(item.product.id));
                                                        }} className="text-white bg-green-500 hover:bg-green-600 font-bold py-1 px-3 rounded">
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                    <div className="p-4 flex justify-between items-center">
                                        <Link to="/shopping-cart" className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-3.5 px-11 rounded">
                                            Sepete Git
                                        </Link>
                                        <button onClick={handleCompleteOrder} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded">
                                            Siparişi Tamamla
                                        </button>
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
