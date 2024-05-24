
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, addCard, updateCard, deleteCard } from '../store/actions/shoppingCartAction';
import { useEffect } from 'react';
import { useState } from 'react';



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
    };


    return (
        <div className="container mx-auto px-4">
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Ödeme Kartları</h2>
                <button onClick={() => setShowAddCardForm(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Yeni Kart Ekle
                </button>
                {cards.map(card => (
                    <div key={card.id} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-2">
                        <div>
                        <p className='text-sm'>Kart Numarası: **** **** **** {card.card_no ? card.card_no.slice(-4) : 'N/A'}</p>
                            <p className='text-sm'>Son Kullanma Tarihi: {card.expire_month}/{card.expire_year}</p>
                            <p className="text-sm"><b>Kart Üzerindeki İsim:</b> {card.name_on_card}</p>
                            <button onClick={() => handleEdit(card)}>Düzenle</button>
                        </div>
                        <div>
                            <button onClick={() => handleDeleteCard(card.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Sil</button>
                        </div>
                    </div>
                ))}
                {showAddCardForm && (
                    <form onSubmit={handleAddCard} className="mt-4 bg-gray-200 p-4 rounded-lg">
                        <input type="text" placeholder="Kart Numarası" name="card_no" value={newCard.card_no} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                        <input type="text" placeholder="Son Kullanma Ayı" name="expire_month" value={newCard.expire_month} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                        <input type="text" placeholder="Son Kullanma Yılı" name="expire_year" value={newCard.expire_year} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                        <input type="text" placeholder="Kart Üzerindeki İsim" name="name_on_card" value={newCard.name_on_card} onChange={handleInputChange} required className="p-2 rounded border-2 border-gray-300 w-full mb-2" />
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">{editMode ? 'Kartı Güncelle' : 'Kart Ekle'}</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PaymentOptions;
