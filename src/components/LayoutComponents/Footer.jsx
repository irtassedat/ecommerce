import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return (
        <div className="w-screen bg-[#2A7CC7] text-white h-[414px]">
            <div className="max-w-[1050px] h-[338px] flex justify-between mx-auto my-0 pt-20">
                <div className="w-[250px] ">
                    <h3 className='text-2xl font-bold leading-8 pb-5'>Get In Touch</h3>
                    <p className='text-[#8EC2F2]'>The quick fox jumps over the lazy dog</p>
                    <div className='flex gap-5 pt-5 text-[24px]'>
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
                <div className="w-[250px]">
                    <h3 className='text-2xl font-bold leading-8 pb-5'>Company info</h3>
                    <ul className='flex flex-col gap-2 text-[#8EC2F2]'>
                        <li>About Us</li>
                        <li>Carrier</li>
                        <li>We are hiring</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="w-[250px]">
                    <h3 className='text-2xl font-bold leading-8 pb-5'>Features</h3>
                    <ul className='flex flex-col gap-2 text-[#8EC2F2]'>
                        <li>Bussiness Marketing</li>
                        <li>User Analytic</li>
                        <li>Live Chat</li>
                        <li>Unlimited Support</li>
                    </ul>
                </div>
            </div>
            <div className='w-full flex justify-center items-center h-[75px] text-sm leading-6 font-bold'>Made With Love By Figmaland All Right Reserved</div>
        </div>
    )
}