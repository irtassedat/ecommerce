import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, addCard, updateCard, deleteCard, setPaymentAction } from '../store/actions/shoppingCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const PaymentOptions = () => {
  const cards = useSelector(state => state.shoppingCart.cardList);
  const dispatch = useDispatch();
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const selectedCardId = useSelector(state => state.shoppingCart.payment?.id);
  const cartDetails = useSelector((state) => state.shoppingCart.cartDetails);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleAddCard = async (e) => {
    e.preventDefault();
    const { cvv, ...cardData } = newCard; // Exclude CVV from the data to be submitted
    await dispatch(addCard(cardData));
    setNewCard({ card_no: '', expire_month: '', expire_year: '', name_on_card: '', cvv: '' });
    setShowAddCardForm(false);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { cvv, ...cardData } = newCard; // Exclude CVV from the data to be submitted
    if (editMode) {
      await dispatch(updateCard(editCardId, cardData));
    } else {
      await dispatch(addCard(cardData));
    }
    setNewCard({ card_no: '', expire_month: '', expire_year: '', name_on_card: '', cvv: '' });
    setEditMode(false);
    setShowAddCardForm(false);
  };

  const handleEdit = (card) => {
    setNewCard(card);
    setEditCardId(card.id);
    setEditMode(true);
    setShowAddCardForm(true);
  };

  const handleSelectCard = (cardId) => {
    const selectedCard = cards.find(card => card.id === cardId);
    dispatch(setPaymentAction(selectedCard)); // Seçili kartı dispatch et
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">Kart Bilgileri</h3>
          <p className="text-sm mb-4">Kullanacağınız kartı seçiniz</p>
          {cards.map(card => (
            <div key={card.id} 
              className={`mb-4 p-4 border-2 rounded-lg shadow-sm ${selectedCardId === card.id ? 'selected-card' : ''}`}
              onClick={() => handleSelectCard(card.id)}
            >
              <input type="radio" name="selectedCard" className="mr-2" checked={selectedCardId === card.id} readOnly />
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className='text-sm font-semibold'>Kart Numarası: **** **** **** {card.card_no ? card.card_no.slice(-4) : 'N/A'}</p>
                  <p className='text-sm'>Son Kullanma Tarihi: {card.expire_month}/{card.expire_year}</p>
                  <p className="text-sm"><b>Kart Üzerindeki İsim:</b> {card.name_on_card}</p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <button onClick={() => handleEdit(card)} className="bg-gray-300 hover:bg-[#2A7CC7] text-white font-bold py-1 px-2 rounded flex items-center">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDeleteCard(card.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showAddCardForm && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-zinc-400 dark:text-zinc-300" onClick={() => setShowAddCardForm(false)}>
                &times;
              </button>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{editMode ? 'Edit Card' : 'Add Card'}</h1>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">{editMode ? 'Edit your debit/credit card' : 'Add your debit/credit card'}</p>
              <div className="bg-gradient-to-r from-orange-400 to-red-400 p-4 rounded-lg mb-6">
                <div className="text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">MyPay</span>
                    <img src="https://placehold.co/30x30" alt="Card Logo" />
                  </div>
                  <div className="text-xl font-semibold tracking-widest mb-4">
                    {newCard.card_no ? `**** **** **** ${newCard.card_no.slice(-4)}` : 'XXXX XXXX XXXX XXXX'}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>{newCard.name_on_card || 'Cardholder Name'}</span>
                    <span>Valid Thru {newCard.expire_month ? newCard.expire_month.toString().padStart(2, '0') : 'MM'}/{newCard.expire_year ? newCard.expire_year.toString().slice(-2) : 'YY'}</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Card number</label>
                  <input
                    type="text"
                    name="card_no"
                    value={newCard.card_no}
                    onChange={handleInputChange}
                    placeholder="Card number"
                    className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Cardholder name</label>
                  <input
                    type="text"
                    name="name_on_card"
                    value={newCard.name_on_card}
                    onChange={handleInputChange}
                    placeholder="Cardholder name"
                    className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg p-2"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Expiration Date</label>
                    <input
                      type="text"
                      name="expire_month"
                      value={newCard.expire_month}
                      onChange={handleInputChange}
                      placeholder="MM"
                      className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Expiration Year</label>
                    <input
                      type="text"
                      name="expire_year"
                      value={newCard.expire_year}
                      onChange={handleInputChange}
                      placeholder="YYYY"
                      className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1"> (CVV/CVC)</label>
                    <input
                      type="text"
                      name="cvv"
                      value={newCard.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg p-2"
                      readOnly
                    />
                  </div>
                </div>
                <button type="submit" className="mt-6 w-full bg-[#2A7CC7] hover:bg-indigo-600 text-white font-bold py-3 text-sm uppercase rounded-lg">
                  {editMode ? 'Update' : 'Next'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div onClick={() => setShowAddCardForm(true)} className="mt-4 p-4 bg-white rounded shadow cursor-pointer flex justify-center items-center flex-col">
        <div className="text-3xl">+</div>
        <div className="text-md mt-2">Yeni Kart Ekle</div>
      </div>
    </div>
  );
};

export default PaymentOptions;
