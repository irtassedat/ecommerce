import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/shoppingCartAction'; // Yolunuz projenize göre değişebilir

export default function ProductCard({ data, size }) {
    const dispatch = useDispatch();
    const imageSizeStyle = {
        width: size[0] + 'px',
        height: size[1] + 'px',
    };

    // Ürün adından slug oluşturun (basit bir örnek)
    const productNameSlug = data.name.replace(/\s+/g, '-').toLowerCase();

    // Sepete ekle butonu için event handler
    const handleAddToCart = () => {
        dispatch(addToCart(data)); // Sepete ekleme action'ı
    };

    return (
        <div className="product-card flex flex-col items-center no-underline">
            <Link to={`/${data.category_id}/${data.id}/${productNameSlug}`} className="flex flex-col items-center no-underline">
                <img src={data.images[0].url} alt={data.name} style={imageSizeStyle} className="object-cover object-center" />
                <div className="flex flex-col items-center gap-2.5 pt-6 pb-7">
                    <h4 className="text-[#252B42] text-base font-bold leading-6">{data.name}</h4>
                    <p className="text-[#737373] text-sm font-bold leading-6">{data.description}</p>
                    <div className="flex gap-1.5">
                        <p className="text-[#737373] text-base font-bold leading-6">${data.price}</p>
                        {/* İndirimli fiyat ve renk seçenekleri burada olabilir */}
                        {/* <p className="text-[#23856D] text-base font-bold leading-6">$5</p> */}
                        {/* Renk seçenekleri varsa gösterilecek kısım */}
                        {/* <div className="flex gap-1.5">
                            {data.colorOptions.map((item, index) => {
                                return <div key={index} className={`h-4 w-4 rounded-full ${item}`}></div>
                            })}
                        </div> */}
                    </div>
                </div>
            </Link>
            {/* Sepete Ekle butonu */}
            <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sepete Ekle
            </button>
        </div>
    );
}
