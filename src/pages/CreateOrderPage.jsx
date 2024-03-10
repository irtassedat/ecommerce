import React, { useState, useEffect } from 'react';
import axiosInstance from '../mock/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAddressAction, fetchAddresses } from '../store/actions/shoppingCartAction';

const CreateOrderPage = () => {
    
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [isEligibleForFreeShipping, setIsEligibleForFreeShipping] = useState(false);
    const [shippingCost, setShippingCost] = useState(29.99);
    const [grandTotal, setGrandTotal] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);

    const cartItems = useSelector(state => state.shoppingCart.cartList);
    const [activeTab, setActiveTab] = useState('address');
    

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleConfirmCart = () => {
        // Sepeti onaylama ve ödeme sayfasına yönlendirme işlemi
        history.push('/payment-options');
    };

    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);


    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => total + (item.count * item.product.price), 0);
        setTotalPrice(newTotalPrice);

        const eligibleForFreeShipping = newTotalPrice >= 150;
        setIsEligibleForFreeShipping(eligibleForFreeShipping);
        setShippingCost(eligibleForFreeShipping ? 0 : 29.99);

        const calculatedGrandTotal = eligibleForFreeShipping ? newTotalPrice : newTotalPrice + shippingCost;
        setGrandTotal(calculatedGrandTotal);
    }, [cartItems, shippingCost]);

    const handleDiscountCodeSubmit = () => {
        setIsCodeSubmitted(true);
        // Discount code validation logic can be implemented here.
    };

    useEffect(() => {
        const loadAddresses = async () => {
            dispatch(fetchAddresses());
        };
        loadAddresses();
    }, [dispatch]);

    return (
        <div className="container mx-auto flex flex-wrap my-10">
            <div className="flex flex-col md:mx-auto w-full md:w-3/4">
                {/* Adres Bilgileri Kartı */}
                <div className="flex">
                    <div className={`w-full md:w-1/2 p-4 ${activeTab === 'address' ? 'bg-blue-100' : 'bg-gray-100'} cursor-pointer`} onClick={() => setActiveTab('address')}>
                        <h2 className="text-xl font-bold mb-3">Adres Bilgileri</h2>
                        {/* Adres bilgileri içeriği */}
                    </div>
                <div className={`w-full md:w-1/2 p-4 ${activeTab === 'payment' ? 'bg-blue-100' : 'bg-gray-100'} cursor-pointer`} onClick={() => setActiveTab('payment')}>
                        <h2 className="text-xl font-bold mb-3">Ödeme Seçenekleri</h2>
                        <h3 className="text-xs text-gray-500">Banka/Kredi Kartı veya Alışveriş Kredisi ile ödemenizi güvenle yapabilirsiniz.</h3>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/4 p-4">
                <div className="bg-white shadow rounded h-auto sticky top-0">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">Sipariş Özeti</h3>
                        <div className="border-t-2 border-gray-300"></div>
                        <div className="mt-4">
                            <div className="flex justify-between py-2 text-gray-600">
                                <span>Ürün Toplamı</span>
                                <span>{totalPrice.toFixed(2)} TL</span>
                            </div>
                            <div className="flex justify-between py-2 text-gray-600">
                                <span>Kargo Toplam</span>
                                <span>{isEligibleForFreeShipping ? 'Ücretsiz' : `${shippingCost.toFixed(2)} TL`}</span>
                            </div>
                            <div className="flex justify-between py-2 text-gray-900 font-bold">
                                <span>Toplam</span>
                                <span>{grandTotal.toFixed(2)} TL</span>
                            </div>
                            <div className="flex justify-between py-2 text-green-600">
                                <span>150 TL ve Üzeri <br />Kargo Bedava br(Satıcı Karşılar)</span>
                                <span>-{shippingCost.toFixed(2)} TL</span>
                            </div>
                            {/* Discount code input and confirmation button */}
                        </div>
                        <div className="flex justify-end mt-5">
                            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2.5  rounded">
                                Kaydet ve Devam Et
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default CreateOrderPage;

