import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/actions/userActions';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { faPhone, faEnvelope, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebook, faTwitter,} from '@fortawesome/free-brands-svg-icons';
import { useGravatar } from 'use-gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.userInfo);
    const categories = useSelector(state => state.global.categories);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const gravatarUrl = useGravatar(user?.email);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const closeDropdown = () => setIsDropdownOpen(false);
    
    const groupedCategories = categories.reduce((acc, category) => {
        const genderKey = category.gender === 'k' ? 'Women' : 'Men';
        if (!acc[genderKey]) {
          acc[genderKey] = [];
        }
        acc[genderKey].push(category);
        return acc;
    }, {});


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
                            <div className="relative">
                                <div onClick={toggleDropdown} className="flex items-center space-x-2 cursor-pointer">
                                    <Link to="/shop" className="text-sm">Shop</Link>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                        {Object.keys(groupedCategories).map((gender, index) => (
                                            <div key={index} onMouseLeave={() => setIsDropdownOpen(false)}>
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
                                <button className=""onClick={handleLogout}>Çıkış Yap</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><FontAwesomeIcon icon={faUser} /> Login</Link>
                                <Link to="/signup">Register</Link>
                            </>
                        )}
                        <FontAwesomeIcon icon={faCartShopping} /> 1
                        <FontAwesomeIcon icon={faHeart} /> 1
                    </div>
                </div>
            </div>
        </>
    );
}
