import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementProductCount, decrementProductCount, removeFromCart, toggleProductChecked } from '../store/actions/shoppingCartAction';
import { useHistory } from 'react-router-dom';
import { confirmCart } from '../store/actions/shoppingCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesomeIcon import ediliyor
import { faLiraSign } from '@fortawesome/free-solid-svg-icons';


const getRandomSize = () => {
    const sizes = Array.from({ length: 9 }, (_, i) => 24 + i * 2); // 24'ten 40'a kadar 2'şerli
    return sizes[Math.floor(Math.random() * sizes.length)];
};

const getRandomMinutes = () => {
    const minutes = Array.from({ length: 52 }, (_, i) => i + 8);
    return minutes[Math.floor(Math.random() * minutes.length)] + " dk";
};

const ShoppingCartPage = () => {
    const cartItems = useSelector(state => state.shoppingCart.cartList);
    const dispatch = useDispatch();
    
    const totalPrice = cartItems
        .filter(item => item.checked) // Sadece checked durumu true olanları filtrele
        .reduce((total, item) => total + (item.count * item.product.price), 0);

    const shippingFee = 29.99;
    const freeShippingThreshold = 150; // 150 TL ve üzeri için kargo bedava
    const isEligibleForFreeShipping = totalPrice >= freeShippingThreshold;
    const shippingCost = totalPrice > 0 ? (totalPrice >= freeShippingThreshold ? 0 : shippingFee) : 0;

    const grandTotal = isEligibleForFreeShipping ? totalPrice : totalPrice + shippingCost;

    const [discountCode, setDiscountCode] = useState('');
    const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);

    const handleDiscountCodeSubmit = () => {
        setIsCodeSubmitted(true);
        // İndirim kodunu doğrulama ve indirim uygulama işlemleri burada gerçekleştirilebilir.
    };

    const handleToggleChecked = (productId) => {
        dispatch(toggleProductChecked(productId));
    };

    const history = useHistory();

    const handleContinueShopping = () => {
        history.push('/shop');
    };

    const handleConfirmCart = () => {
        if (!cartItems || cartItems.length === 0) {
            toast.error("Sepetinizde ürün yok.");
            return;
        }
        
        const cartDetails = {
            totalPrice, // Ürün toplamı
            isEligibleForFreeShipping, // Ücretsiz kargo uygunluğu
            shippingCost, // Kargo toplamı
            grandTotal: totalPrice + (!isEligibleForFreeShipping ? shippingCost : 0), // Toplam tutar
            discountCode, // İndirim kodu (eğer uygulandıysa)
            products: cartItems.map(item => ({
                product_id: item.product.id,
                count: item.count,
                detail: item.product.detail
            })) // Ürün detayları
        };
    
        dispatch(confirmCart(cartDetails));
        history.push('/create-order');
    };
    
    
    
    
    return (
        <div className="container x mx-auto mt-10">
            <div className="flex shadow-md my-10 bg-white rounded-lg">
                <div className="w-3/4 p-10">
                    <h1 className="font-semibold text-4xl mb-8">Sepetim ({cartItems.length} Ürün)</h1>
                    {cartItems.map((item, index) => (
                        <div key={item.product.id} className="flex items-center hover:bg-gray-100 py-5">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleToggleChecked(item.product.id)}
                            />
                            <div className="flex w-2/3">
                                <div className="h-48 w-48 mr-8 overflow-hidden rounded">
                                    <img src={item.product.images[0].url} alt={item.product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="ml-8 flex-grow">
                                    <span className="block font-bold text-lg mb-2">{item.product.name}</span>
                                    <span className="block text-gray-500 text-sm mb-2">{item.product.description}</span>
                                    <span className="block text-green-600 text-sm mb-2">{getRandomMinutes()} içinde sipariş verirsen en geç yarın kargoda!</span>
                                    <span className="block text-gray-500 text-sm mb-2">Beden: {getRandomSize()}</span>
                                    <span className="block text-gray-500 text-sm mb-2">Puan: {item.product.rating.toFixed(1)} ⭐</span>
                                    <button onClick={(e) => {e.preventDefault(); dispatch(removeFromCart(item.product.id));}} className="text-red-500 hover:text-red-600 text-sm">Ürünü Kaldır</button>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center items-center w-1/3">
                                <button onClick={() => dispatch(decrementProductCount(item.product.id))} className="text-black bg-gray-200 font-bold py-1 px-3 rounded">-</button>
                                <span className="mx-3 border p-2 rounded">{item.count}</span>
                                <button onClick={() => dispatch(incrementProductCount(item.product.id))} className="text-white bg-[#2A7CC7] hover:bg-blue-800 font-bold py-1 px-3 rounded">+</button>
                            </div>
                            <div className="mx-2 text-lg font-semibold text-orange-500 flex items-center">
                                  <span>{item.product.price.toFixed(2)}</span>
                                  <FontAwesomeIcon icon={faLiraSign} className="ml-2" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-1/4 bg-gray-100 px-8 py-4">
                     <div className="h-auto sticky top-20">
                        <h1 className="font-semibold text-2xl border-b p-4 mt-10">Sipariş Özeti</h1>
                        <div className="mt-10 p-4">
                            <div className="flex justify-between py-2 text-gray-600">
                                <span>Ürün Toplamı</span>
                                <span>{totalPrice.toFixed(2)} TL</span>
                            </div>
                            <div className="flex justify-between py-2 text-gray-600">
                                <span>Kargo Toplam</span>
                                <span>{isEligibleForFreeShipping ? 'Ücretsiz' : `${shippingCost.toFixed(2)} TL`}</span>
                            </div>
                            {isEligibleForFreeShipping && (
                                <div className="flex justify-between py-2 text-green-600">
                                    <span>150 TL ve Üzeri <br />Kargo Bedava br(Satıcı Karşılar)</span>
                                    <span>-{shippingFee.toFixed(2)} TL</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2 text-gray-900 font-bold">
                                <span>Toplam</span>
                                <span>{grandTotal.toFixed(2)} TL</span>
                            </div>
                            <div className="mt-8">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount-code">İndirim Kodu Gir</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="discount-code"
                                    type="text"
                                    placeholder="Kodu buraya giriniz"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                {!isCodeSubmitted && discountCode && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 w-full"
                                        onClick={handleDiscountCodeSubmit}
                                    >
                                        Kodu Onayla
                                    </button>
                                )}
                            </div>
                            <div className="mt-4">
                                <button onClick={handleConfirmCart} className="bg-[#2A7CC7] hover:bg-indigo-600 text-white font-bold py-3 text-sm uppercase w-full rounded focus:outline-none focus:shadow-outline my-2" type="button">
                                    Sepeti Onayla
                                </button>
                                <button onClick={handleContinueShopping} className="bg-white text-black font-bold py-3 text-sm uppercase w-full rounded focus:outline-none focus:shadow-outline" type="button">
                                    Alışverişe Devam Et
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;
