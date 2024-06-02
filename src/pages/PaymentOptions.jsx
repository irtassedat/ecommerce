import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, addCard, updateCard, deleteCard, setPaymentAction } from '../store/actions/shoppingCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    <div className="bg-white dark:bg-zinc-900 py-12 px-8 rounded-lg shadow relative z-20 flex flex-col justify-center">
      <div className="flex items-center mb-4 mt-4">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <img src="https://placehold.co/24x24" alt="check" />
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Kart ile Öde</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.
          </p>
        </div>
      </div>
      <div className="border-b border-zinc-300 dark:border-zinc-700 my-4"></div> {/* Çizgi ekleniyor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Kart Bilgileri</h3>
          {cards.map(card => (
            <div
              key={card.id}
              className={`mb-4 p-2 border-2 rounded-lg shadow-sm w-[100%] ${selectedCardId === card.id ? 'selected-card' : ''}`}
              onClick={() => handleSelectCard(card.id)}
            >
              <div className="flex items-center justify-between">
                <input type="radio" name="selectedCard" className="mr-2" checked={selectedCardId === card.id} readOnly />
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(card)} className="bg-gray-300 hover:bg-[#2A7CC7] text-white font-bold py-0.5 px-1 rounded flex items-center">
                    <FontAwesomeIcon icon={faEdit} size="xs" />
                  </button>
                  <button onClick={() => handleDeleteCard(card.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-1 rounded flex items-center">
                    <FontAwesomeIcon icon={faTrash} size="xs" />
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-red-400 p-4 rounded-lg text-xs mt-2">
                <div className="text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">MyPay</span>
                    <img src="https://placehold.co/20x20" alt="Card Logo" />
                  </div>
                  <div className="font-semibold tracking-widest mb-2">
                    {card.card_no ? `**** **** **** ${card.card_no.slice(-4)}` : 'XXXX XXXX XXXX XXXX'}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{card.name_on_card}</span>
                    <span>Valid Thru {card.expire_month}/{card.expire_year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div onClick={() => setShowAddCardForm(true)} className="mt-8 p-4 bg-white rounded shadow cursor-pointer flex justify-center items-center flex-col">
            <div className="text-3xl">+</div>
            <div className="text-md mt-2">Yeni Kart Ekle</div>
          </div>
          <label className="flex items-center mt-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-zinc-800 dark:text-zinc-200">3D Secure ile ödemek istiyorum.</span>
          </label>
        </div>
        <div className="relative"> {/* Relative position ekleniyor */}
          <div className="border-l border-zinc-300 dark:border-zinc-700 absolute left-0 top-0 bottom-0 ml-2"></div> {/* Dikey çizgi ekleniyor */}
          <div className="pl-8"> {/* Dikey çizgi ile aradaki boşluk ayarlanıyor */}
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Taksit Seçenekleri</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Kartınıza uygun taksit seçeneğini seçiniz</p>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-4">
                <input type="radio" name="installment" className="mr-2" />
                <span className="text-zinc-800 dark:text-zinc-200">Tek Çekim</span>
                <span className="text-orange-500 ml-auto">6.604,22 TL</span>
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" name="installment" className="mr-2" />
                <span className="text-zinc-800 dark:text-zinc-200">İki Taksit</span>
                <span className="text-orange-500 ml-auto">3.302,11 TL</span>
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" name="installment" className="mr-2" />
                <span className="text-zinc-800 dark:text-zinc-200">Üç Taksit</span>
                <span className="text-orange-500 ml-auto">2.201,41 TL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-300 dark:border-zinc-700 my-4"></div> {/* Çizgi ekleniyor */}
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
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1">CVV</label>
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
  );
};

export default PaymentOptions;
