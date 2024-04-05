import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddresses, setAddressAction, deleteAddress, addAddressAndUpdateList, updateAddress} from '../store/actions/shoppingCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  getCities,
  getDistrictsByCityCode,
  getNeighbourhoodsByCityCodeAndDistrict,
  castCityCode
} from 'turkey-neighbourhoods';



const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: '',
  });  
  const { addressList, totalPrice, shippingCost,} = useSelector((state) => state.shoppingCart);
  const cartDetails = useSelector((state) => state.shoppingCart.cartDetails);
  const [isEligibleForFreeShipping, setEligibleForFreeShipping] = useState(false);
  const currentAddress = useSelector(state => state.shoppingCart.currentAddress);
  const [activeTab, setActiveTab] = useState('addressInfo');
  const isValidPhone = (phone) => phone.length === 10;
  const isValidAddress = (address) => address.length >= 3;


  useEffect(() => {
    dispatch(fetchAddresses());
    setEligibleForFreeShipping(totalPrice > 150);
  }, [dispatch, totalPrice]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevState => ({ ...prevState, [name]: value }));
  
    if (name === 'city') {
      setNewAddress(prevState => ({ ...prevState, district: '', neighborhood: '' }));
    } else if (name === 'district') {
      setNewAddress(prevState => ({ ...prevState, neighborhood: '' }));
    }
  };
  
  const handleAddNewAddress = (e) => {
    e.preventDefault();
    
    if (!newAddress.phone) {
      toast.error("Telefon numarası gerekli.");
      return;
    }

    const formattedAddress = {
      title: newAddress.title,
      name: newAddress.name,
      surname: newAddress.surname,
      phone: newAddress.phone.replace(/^0+/, ''),
      city: newAddress.city,
      district: newAddress.district,
      neighborhood: newAddress.neighborhood,
      address: newAddress.address,
    };
    if (!isValidPhone(newAddress.phone)) {
      toast.error("Telefon numarası tam olarak 10 karakter olmalıdır.");
      return;
    }
    if (!isValidAddress(newAddress.address)) {
      toast.error("Adres en az 3 karakter olmalıdır.");
      return;
    }
    dispatch(addAddressAndUpdateList(formattedAddress));
    setShowAddAddressForm(false);
  };

  const handleDeleteAddress = (addressId) => {
    if (addressId === selectedAddressId) {
      setSelectedAddressId(null); // Seçimi kaldır
      dispatch(setAddressAction({})); // Redux state'ini sıfırla
    }
    dispatch(deleteAddress(addressId));
  };
  

  const handleEditAddressClick = (address) => {
    setNewAddress(address);
    setIsEditing(true);
    setShowAddAddressForm(true);
    setEditingAddressId(address.id);  
  };

  const handleSaveEditedAddress = async (e) => {
    e.preventDefault();
    if (!isValidPhone(newAddress.phone)) {
      toast.error("Telefon numarası tam olarak 10 karakter olmalıdır.");
      return;
    }
    if (!isValidAddress(newAddress.address)) {
      toast.error("Adres en az 15 karakter olmalıdır.");
      return;
    }
    await dispatch(updateAddress(editingAddressId, newAddress));
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddAddressForm(false);
    dispatch(fetchAddresses());
  };
  const handleSelectAddress = (selectedId) => {
    setSelectedAddressId(selectedId); 
    const selectedAddress = addressList.find(address => address.id === selectedId);
    dispatch(setAddressAction(selectedAddress));
  };
  

  
  const cityOptions = getCities();
  const districtOptions = newAddress.city ? getDistrictsByCityCode(newAddress.city) : [];
  const neighborhoodOptions = newAddress.district ? getNeighbourhoodsByCityCodeAndDistrict(newAddress.city, newAddress.district) : [];
  
  const paymentTabClassName = `px-10 py-4 ${activeTab === 'paymentOptions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-tr-lg ${!selectedAddressId ? 'cursor-not-allowed opacity-50' : ''}`;


  const handleSaveAndContinue = () => {
    console.log("handleSaveAndContinue başladı", currentAddress);
  
    if (!selectedAddressId) {
      toast.error("Lütfen ödeme seçeneklerine geçmeden önce bir adres seçin..");
      return;
    }    
  
    console.log("Ödeme seçeneklerine geçiliyor");
    setActiveTab('paymentOptions');
    console.log("setActiveTab çağrıldı");
  };
  
  const handleTabChangeToPayment = (e) => {
    e.preventDefault();
    if (!selectedAddressId) {
      toast.error("Lütfen ödeme seçeneklerine geçmeden önce bir adres seçin.");
      return;
    } else {
      setActiveTab('paymentOptions');
    }
  };

  const handleMouseEnterPaymentTab = () => {
    if (!selectedAddressId) {
      toast.info("Ödeme seçeneklerine geçiş yapabilmek için önce bir adres seçmelisiniz.");
    }
  };

  const renderAddressInfo = () => {
    return (
      <div className="container bg-gray-100">
        <div className="flex flex-col"> 
          <div className="mb-6 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Teslimat Adresi</h2>
            <div className="py-5">
              <div onClick={() => { setShowAddAddressForm(true); setIsEditing(false); }} className="p-4 mb-4 bg-white rounded shadow cursor-pointer flex justify-center items-center flex-col">
                <div className="text-3xl">+</div>
                <div className="text-md mt-2">Add New Address</div>
              </div>
              { (showAddAddressForm || isEditing) && (
            <div className="flex flex-col md:flex-row justify-center">
            <form onSubmit={isEditing ? handleSaveEditedAddress : handleAddNewAddress} className="space-y-4 md:w-3/4 lg:w-1/2">
              <div className="flex flex-wrap mb-6">
                <div className="flex flex-wrap w-full mb-4">
                  <div className="px-2 w-full md:w-1/2">
                    <input type="text" name="name" placeholder="Ad" onChange={handleChange} value={newAddress.name} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength="20" />
                  </div>
                  <div className="px-2 w-full md:w-1/2">
                    <input type="text" name="surname" placeholder="Soyad" onChange={handleChange} value={newAddress.surname} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength="20" />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <div className="px-2 w-full md:w-1/4">
                    <input type="text" name="title" placeholder="Adres Başlığı" onChange={handleChange} value={newAddress.title} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength="10" />
                  </div>
                  <div className="px-2 w-full md:w-3/4">
                    <input type="text" name="phone" placeholder="Telefon Numarası" onChange={handleChange} value={newAddress.phone} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength="10" />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <div className="px-2 w-full md:w-1/2 lg:w-1/4">
                    <select name="city" onChange={handleChange} value={newAddress.city} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Şehir Seçiniz</option>
                      {cityOptions.map(city => (
                        <option key={city.code} value={city.code}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="px-2 w-full md:w-1/4">
                    <select name="district" onChange={handleChange} value={newAddress.district} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={!newAddress.city}>
                      <option value="">İlçe Seçiniz</option>
                      {districtOptions.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                  <div className="px-2 w-full md:w-1/4">
                    <select name="neighborhood" onChange={handleChange} value={newAddress.neighborhood} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={!newAddress.district}>
                      <option value="">Mahalle Seçiniz</option>
                      {neighborhoodOptions.map(neighborhood => (
                        <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="px-2 w-full">
                  <textarea name="address" placeholder="Adres" onChange={handleChange} value={newAddress.address} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength="255"></textarea>
                </div>
                  <div className="flex justify-between items-center mx-auto">
                    <button onClick={() => { setShowAddAddressForm(false); setIsEditing(false); }} className="bg-gray-200 text-black font-bold py-2 px-3 rounded">
                      İptal
                    </button>
                    <button type="submit" className="bg-[#2A7CC7] hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
                      {isEditing ? 'Düzenlemeyi Kaydet' : 'Adres Ekle'}
                    </button>
                </div>
                </div>
              </form>
            </div>
            )}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {addressList.map((address) => (
                <div className={`p-4 shadow-lg rounded-lg bg-white overflow-hidden ${currentAddress?.id === address.id ? 'border-2 border-gray-700' : 'border-2 border-gray-300'} hover:bg-gray-100`} key={address.id}>
                  <div className='flex justify-end items-center space-x-2 text-xs'> {/* Düzenle ve Sil butonları için ortak konteyner */}
                    <button onClick={() => handleEditAddressClick(address)} className="bg-gray-300 hover:bg-[#2A7CC7] text-white font-bold py-1.5 px-1.5 rounded flex items-center m-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteAddress(address.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-1.5 rounded flex items-center m-1">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                  <div className="flex items-center mx-auto justify-center p-1.5">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={address.id}
                      onChange={() => handleSelectAddress(address.id)}
                      checked={currentAddress && currentAddress.id === address.id}
                      className="form-radio h-4 w-4 oppacity-500"
                    />
                    {console.log("Radio checked durumu: ", currentAddress?.id === address.id, "Adres ID: ", address.id)}
                    <label htmlFor={`address_${address.id}`} className="ml-1 text-xs text-gray-500 max-w-xs break-words">
                      {address.title}
                    </label>
                  </div>
                  <div className="p-4 shadow-lg rounded-lg bg-white overflow-hidden border-t-2 border-gray-300 w-full max-w-screen-lg mx-auto" key={address.id}>
                    
                    <div className="flex items-center mx-auto justify-start">
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-user-circle text-lg text-gray-400"></i>
                      <span className="ml-2 text-gray-500 ">{address.name} {address.surname}</span>
                    </div>
                    <span className="flex items-center text-xs font-semibold text-orange-600 bg-gray-200 rounded-full px-2 py-1">
                      <i className="fas fa-phone-alt mr-1"></i>
                      {address.phone}
                    </span>
                  </div>
                  <div className="mb-3 pt-2 max-w-xs break-words text-md"><strong>Adres:</strong> {address.address || 'N/A'}</div>
                  <div className="mb-2 flex space-x-6">
                    <div className='text-sm'><strong>Şehir:</strong> {address.city || 'N/A'}</div>
                    <div className='text-sm'><strong>İlçe:</strong> {address.district || 'N/A'}</div>
                    <div className='text-sm'><strong>Mahalle:</strong> {address.neighborhood ? address.neighborhood.replace('Mah', '').trim() : 'Belirtilmemiş'}</div>
                  </div>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentOptions = () => {
    return (
      <div>
        {/* Ödeme seçenekleri içeriği burada olacak */}
      </div>
    );
  };

  return (
    <div className="container xl mx-auto mt-10 p-6">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="flex-1 container px-3 bg-white-300">
        <div className="grid grid-cols-2 shadow-md">
        <button onClick={() => { if(currentAddress) setActiveTab('addressInfo'); else toast.error("Lütfen bir adres seçin."); }} className={`px-10 py-4 ${activeTab === 'addressInfo' ? 'bg-[#2A7CC7] text-white' : 'bg-gray-200 text-gray-800'} rounded-tl-lg`}>
          Adres Bilgileri
        </button>
          <button
            onClick={handleTabChangeToPayment}
            onMouseEnter={handleMouseEnterPaymentTab}
            className={paymentTabClassName}>
            Ödeme Seçenekleri
          </button>
        </div>
          {activeTab === 'addressInfo' && renderAddressInfo()}
          {activeTab === 'paymentOptions' && renderPaymentOptions()}
        </div>
        <div className="w-1/4 bg-zinc-100 px-8 py-10">
          <div className="h-auto sticky top-20">
            <div className="p-4">
            <h1 className="font-semibold text-2xl border-b pb-8">Sipariş Özeti</h1>
              <div className="border-t-2 border-gray-300"></div>
              <div className="mt-10">
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Ürün Toplamı</span>
                  <span>{cartDetails.totalPrice.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Kargo Toplam</span>
                  <span>{cartDetails.isEligibleForFreeShipping ? 'Ücretsiz' : `${cartDetails.shippingCost.toFixed(2)} TL`}</span>{/* Kargo ücreti */}
                </div>
                {cartDetails.isEligibleForFreeShipping && (
                  <div className="flex justify-between py-2 text-green-600">
                    <span>150 TL ve Üzeri <br />Kargo Bedava (Satıcı Karşılar)</span>
                    <span>-{cartDetails.shippingCost.toFixed(2)} TL</span>
                   </div>
                )}
                <div className="flex justify-between py-2 text-gray-900 font-bold">
                  <span>Toplam</span>
                  <span>{(cartDetails.totalPrice + (!cartDetails.isEligibleForFreeShipping ? cartDetails.shippingCost : 0)).toFixed(2)} TL</span>
                </div>
              </div>
              <div className="mt-10">
              <button onClick={handleSaveAndContinue} className="bg-[#2A7CC7] hover:bg-indigo-600 text-white font-bold py-3 text-sm uppercase w-full rounded focus:outline-none focus:shadow-outline">
                Kaydet ve Devam Et
              </button>
                <button className="bg-white hover:bg-orange-600 text-black font-bold py-3 text-sm uppercase w-full rounded focus:outline-none focus:shadow-outline my-2">
                  Geri Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
