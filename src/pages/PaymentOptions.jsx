import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, addCard, updateCard, deleteCard } from '../store/actions/shoppingCartAction';

const PaymentOptions = () => {
    const cards = useSelector(state => state.shoppingCart.cardList);
    const dispatch = useDispatch();
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [newCard, setNewCard] = useState({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [editCardId, setEditCardId] = useState(null);
    const cartDetails = useSelector((state) => state.shoppingCart.cartDetails);

    useEffect(() => {
        dispatch(fetchCards());
    }, [dispatch]);

    const handleAddCard = (e) => {
        e.preventDefault();
        dispatch(addCard(newCard));
        setNewCard({ card_no: '', expire_month: '', expire_year: '', name_on_card: '' });
        setShowAddCardForm(false);
        alert("Kart başarıyla eklendi.");
    };

    const handleDeleteCard = (cardId) => {
        dispatch(deleteCard(cardId));
        alert("Kart başarıyla silindi.");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCard({ ...newCard, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editMode) {
            dispatch(updateCard(editCardId, newCard));
        } else {
            dispatch(addCard(newCard));
        }
        setNewCard({ card_no: '', expire_month: '', expire_year: '', name_on_card: '' });
        setEditMode(false);
    };

    const handleEdit = (card) => {
        setNewCard(card);
        setEditCardId(card.id);
        setEditMode(true);
        setShowAddCardForm(true);
    };

        return (
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-md font-semibold mb-4">Kart Bilgileri</h3>
                        <p className="text-sm mb-4">Kullanacağınız kartı seçiniz</p>
                        {cards.map(card => (
                            <div key={card.id} className="mb-4 p-4 border-2 rounded-lg shadow-sm">
                                <input type="radio" name="selectedCard" className="mr-2" />
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <p className='text-sm font-semibold'>Kart Numarası: **** **** **** {card.card_no ? card.card_no.slice(-4) : 'N/A'}</p>
                                        <p className='text-sm'>Son Kullanma Tarihi: {card.expire_month}/{card.expire_year}</p>
                                        <p className="text-sm"><b>Kart Üzerindeki İsim:</b> {card.name_on_card}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                        <button onClick={() => handleEdit(card)} className="bg-gray-300 hover:bg-[#2A7CC7] text-white font-bold py-1 px-2 rounded flex items-center">
                                            Düzenle
                                        </button>
                                        <button onClick={() => handleDeleteCard(card.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center">
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {showAddCardForm && (
                            <form onSubmit={handleAddCard} className="mt-4 bg-gray-200 p-4 rounded-lg shadow-md">
                                <input type="text" placeholder="Kart Numarası" name="card_no" value={newCard.card_no} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                                <input type="text" placeholder="Son Kullanma Ayı" name="expire_month" value={newCard.expire_month} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                                <input type="text" placeholder="Son Kullanma Yılı" name="expire_year" value={newCard.expire_year} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                                <input type="text" placeholder="Kart Üzerindeki İsim" name="name_on_card" value={newCard.name_on_card} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">{editMode ? 'Kartı Güncelle' : 'Kart Ekle'}</button>
                            </form>
                        )}
                    </div>
                    <div>
                        <h3 className="text-md font-semibold mb-4">Taksit Seçenekleri</h3>
                        <p className="text-sm mb-4">Kartınıza uygun taksit seçeneğini seçiniz</p>
                        <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <input type="radio" name="installmentOption" className="mr-2" />
                                <span className="text-sm">Tek Çekim</span>
                                <span className="text-sm">{(cartDetails.totalPrice + (!cartDetails.isEligibleForFreeShipping ? cartDetails.shippingCost : 0)).toFixed(2)} TL</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <input type="radio" name="installmentOption" className="mr-2" />
                                <span className="text-sm">2 Taksit</span>
                                <span className="text-sm">{((cartDetails.totalPrice + (!cartDetails.isEligibleForFreeShipping ? cartDetails.shippingCost : 0)) / 2).toFixed(2)} TL</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <input type="radio" name="installmentOption" className="mr-2" />
                                <span className="text-sm">3 Taksit</span>
                                <span className="text-sm">{((cartDetails.totalPrice + (!cartDetails.isEligibleForFreeShipping ? cartDetails.shippingCost : 0)) / 3).toFixed(2)} TL</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => setShowAddCardForm(true)} className="mt-4 p-4 bg-white rounded shadow cursor-pointer flex justify-center items-center flex-col">
                    <div className="text-3xl">+</div>
                    <div className="text-md mt-2">Yeni Kart Ekle</div>
                </div>
            </div>
        );
    };    

export default PaymentOptions;
