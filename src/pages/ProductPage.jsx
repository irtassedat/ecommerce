import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { thirdCarouselContent } from "../mock/carouselContentsData";
import { useState } from "react";
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductDetails from "../components/ProductPage/ProductDetails";
import CarouselComponent from "../components/HomePage/Carousel";
import { imageBasePath } from "../../public/imgBasePath";
import { bestseller } from "../mock/bestSellerData";
import ProductCardSecond from "../components/ProductPage/ProductCardSecond";
import Clients from "../components/AboutPage/Clients";
import React from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'; // Regular kalp
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons'; // Solid alışveriş sepeti ve göz ikonları


const colors = ["23A6F0", "2DC071", "E77C40", "252B42"];



export default function ProductPage() {
    const [currIndex, setCurrIndex] = useState(0);

    return (
        <>
            <section className="width-screen bg-[#FAFAFA]">
                <div className="max-w-[1050px] mx-auto py-6">
                    <div className="flex items-center gap-3.5 font-bold text-sm leading-6">
                        <Link to="/" className="text-main">Home</Link>
                        <p className="text-[#BDBDBD] font-thin text-4xl">{">"}</p>
                        <p className="text-[#BDBDBD]">Shop</p>
                    </div>
                </div>
                <div className="max-w-[1050px] mx-auto flex gap-[30px] pb-12">
                    <div>
                        <div className="w-[506px] h-[450px]">
                            <CarouselComponent items={thirdCarouselContent} setCurrIndex={setCurrIndex} currIndex={currIndex} />
                        </div>
                        <div className="flex gap-[19px] pt-5">
                            {thirdCarouselContent.slice(currIndex, currIndex + 2).map((item, index) => {
                                return <img className="w-[100px] h-[75px] object-cover" key={index} src={imageBasePath + item.src} />
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 px-6">
                        <p className="leading-[30px] text-xl text-main">Floating Phone</p>
                        <div className="flex gap-2">
                            <Rating name="read-only" value="4" readOnly />
                            <p className="text-sm leading-6 font-bold">10 Reviews</p>
                        </div>

                        <p className="text-main text-2xl leading-8">$1,139.33</p>
                        <p className="text-sm leading-6 text-[#737373] font-bold">Availability: <span className="text-[#23A6F0]">In Stock </span></p>
                        <p className="text-[#737373] text-sm leading-5 max-w-[455]">Met minim Mollie non desert Alamo est sit cliquey dolor
                            do met sent. RELIT official consequent door ENIM RELIT Mollie.
                            Excitation venial consequent sent nostrum met.</p>
                        <hr />
                        <div className="flex gap-2.5">
                            {colors.map((item, index) => {
                                return <div key={index} className={`bg-[#${item}] w-[30px] h-[30px] rounded-full`}></div>
                            })}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            <div>
                                <button className="rounded bg-[#23A6F0] px-5 py-2.5 text-white text-sm leading-6">Select Options</button>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><FontAwesomeIcon icon={farHeart} /></button>
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><FontAwesomeIcon icon={faCartShopping} /></button>
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <ProductDetails />

            <section className="w-screen bg-[#FAFAFA]">
                <div className="mx-auto max-w-[1050px] flex flex-col items-center">
                    <h3 className="self-stretch pt-12 pb-6">BESTSELLER PRODUCTS</h3>
                    <hr className="h-[4px] border-0 mb-6 bg-[#ECECEC] self-stretch" />
                    <div className="flex flex-wrap justify-between gap-y-6 pb-12">
                        {bestseller.map((item, index) => {
                            return <ProductCardSecond key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>

            <Clients />
        </>
    )
}