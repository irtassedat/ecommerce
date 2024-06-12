import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "./ProductCard";

export default function BestSellerProducts() {
    const dispatch = useDispatch();
    const { productList } = useSelector(state => state.product);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const fetchBestSellers = async () => {
            await dispatch(fetchProducts("", "", "rating:desc", 8, 0));
        };

        fetchBestSellers();
    }, [dispatch]);

    useEffect(() => {
        if (productList.length > 0) {
            setBestSellers(productList.slice(0, 8));
        }
    }, [productList]);

    return (
        <section className="w-screen">
            <div className="my-0 mx-auto max-w-[1050px] flex flex-col items-center py-20">
                <div className="flex flex-col items-center gap-2.5 pb-20">
                    <h4 className="text-[#737373] text-xl">Featured Products</h4>
                    <h3 className="text-[#252B42] text-2xl font-bold leading-8">BESTSELLER PRODUCTS</h3>
                    <p className="text-sm text-[#737373] leading-5">Problems trying to resolve the conflict between</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-20 justify-center">
                    {bestSellers.map((item, index) => {
                        return <ProductCard key={index} data={item} />
                    })}
                </div>
            </div>
        </section>
    );
}
