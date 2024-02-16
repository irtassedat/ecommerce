import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { faPhone, faPhone as faSolidPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as faRegularEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faUser as faRegularUser, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass as faSolidMagnifyingGlass, faCartShopping as faSolidCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';



export default function Header() {

    return (
        <>
            <div className='w-screen h-[60px] bg-[#252B42] text-white px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center text-sm font-bold leading-6'>
                    <div className='flex items-center gap-10 '>
                        <div className='flex items-center gap-1'><FontAwesomeIcon icon={faPhone} /><h6>(225) 555-0118</h6></div>
                        <div className='flex items-center gap-1'><FontAwesomeIcon icon={faRegularEnvelope} className='mr-1' /> <h6 >michelle.rivera@example.com</h6></div>
                    </div>
                    <h6>Follow Us and get a chace to win 80% off</h6>
                    <div className='flex items-center gap-3'>
                        <h6>Follow Us : </h6>
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
            </div>
            <div className='w-screen h-[90px] px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center '>
                    <div className='flex items-center justify-between w-[50%]'>
                        <h6 className='font-bold text-2xl leading-8' >Bandage</h6>
                        <nav className='flex gap-3 text-sm leading-6 '>
                            <Link to="/">Home</Link>
                            <Link to="/shop">Shop</Link>
                            <Link to="/about">About</Link>
                            <Link to="/">Blog</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/">Pages</Link>
                        </nav>
                    </div>
                    <div className='flex gap-5 text-sm leading-6 text-[#23A6F0]'>
                        <a><FontAwesomeIcon icon={faRegularUser} /> Login / Register</a>
                        <div><FontAwesomeIcon icon={faSolidMagnifyingGlass} /></div>
                        <div><FontAwesomeIcon icon={faSolidCartShopping} /> 1</div>
                        <div><FontAwesomeIcon icon={faRegularHeart} /> 1</div>
                    </div>
                </div>
            </div>
        </>
    )
}