import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductDetails from "../components/ProductPage/ProductDetails";
import { bestseller } from "../mock/bestSellerData";
import ProductCardSecond from "../components/ProductPage/ProductCardSecond";
import Clients from "../components/AboutPage/Clients";
import React, { useEffect, useState } from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axiosInstance from '../mock/axiosInstance';
import Carousel from '../pages/carousel.component.jsx'

const colors = ["23A6F0", "2DC071", "E77C40", "252B42"];



export default function ProductPage() {
    const [currIndex, setCurrIndex] = React.useState(0);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axiosInstance.get(`/products/${productId}`);
                // API'den gelen ürünü state'e kaydet
                setProduct(response.data);
            } catch (error) {
                console.error('Ürün detayları çekilirken bir hata oluştu:', error);
            }
        };
    
        fetchProductDetails();
    }, [productId]);

    

    if (!product) {
        return <p>Ürün yükleniyor...</p>;
    }

    const productImageUrls = product.images.map(img => img.url);
    const repeatedImageUrls = [...productImageUrls, ...productImageUrls];



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
                             <Carousel slides={repeatedImageUrls} />
                        </div>
                        <div className="flex gap-[19px] pt-5">
                            {/* Carousel altında küçük resim navigasyonu */}
                            {productImageUrls.slice(0, 2).map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrIndex(index)}
                                    className={`w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border ${currIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                                >
                                    <img src={url} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                                </button>
                            ))}  
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 px-6">
                        <p className="leading-[30px] text-xl text-main">{product.name}</p>
                        <div className="flex gap-2">
                            <Rating name="read-only" value={product.rating || 0} readOnly />
                            <p className="text-sm leading-6 font-bold">{product.sell_count} Reviews</p>
                        </div>

                        <p className="text-main text-2xl leading-8">${product.price}</p>
                        <p className="text-sm leading-6 text-[#737373] font-bold">Availability: <span className="text-[#23A6F0]">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                        <p className="text-[#737373] text-sm leading-5 max-w-[455px]">{product.description}</p>
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