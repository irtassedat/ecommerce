import React, { useState, useEffect } from 'react';
import axiosInstance from '../mock/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddresses, addAddress, deleteAddress, addAddressAndUpdateList, updateAddress} from '../store/actions/shoppingCartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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


  useEffect(() => {
    dispatch(fetchAddresses());
    // totalPrice 150'den büyükse, kullanıcı ücretsiz kargoya uygun olur
    setEligibleForFreeShipping(totalPrice > 150);
  }, [dispatch, totalPrice]);  

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const formattedAddress = {
      title: newAddress.title,
      name: newAddress.name,
      surname: newAddress.surname,
      phone: newAddress.phone,
      city: newAddress.city,
      district: newAddress.district,
      neighborhood: newAddress.neighborhood,
      address: newAddress.address,
    };
    // addAddress yerine addAddressAndUpdateList action'ını dispatch edin
    dispatch(addAddressAndUpdateList(formattedAddress));
    setShowAddAddressForm(false);
  };

  const handleDeleteAddress = (addressId) => {
    // Adres silme işlemi için Redux action'ı dispatch et
    dispatch(deleteAddress(addressId));
  };

  const handleEditAddressClick = (address) => {
    // Adres bilgilerini form alanlarına doldur
    setNewAddress(address);
    // Düzenleme modunu ve form görünümünü etkinleştir
    setIsEditing(true);
    setShowAddAddressForm(true);
    setEditingAddressId(address.id);  
  };
  
  

  const handleSaveEditedAddress = async (e) => {
    e.preventDefault();
    // Yeni adres bilgileriyle updateAddress action'ını çağır
    await dispatch(updateAddress(editingAddressId, newAddress));
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddAddressForm(false);
    // Adres listesini yenilemek için fetchAddresses çağrılabilir veya kullanıcıyı adres listesine yönlendirebilirsiniz
    dispatch(fetchAddresses());
  };

  

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4 p-4">
          <div class="flex flex-col">
            <div class=" mb-6 p-6 bg-white rounded shadow flex flex-col ">
                <h2 class="text-xl font-semibold mb-3">Teslimat Adresi</h2>
                <div onClick={() => { setShowAddAddressForm(true); setIsEditing(false); }} className="p-4 mb-4 bg-white rounded shadow cursor-pointer flex justify-center items-center flex-col">
                  <div className="text-3xl">+</div>
                  <div className="text-md mt-2">Add New Address</div>
                </div>
          { (showAddAddressForm || isEditing) && (
          <div className="flex flex-col md:flex-row">
            <form onSubmit={isEditing ? handleSaveEditedAddress : handleAddNewAddress} className="space-y-4 md:w-1/2">
              <input type="text" name="title" placeholder="Adres Başlığı" onChange={handleChange} value={newAddress.title} className="border rounded p-2 w-full" />
              <input type="text" name="name" placeholder="Ad" onChange={handleChange} value={newAddress.name} className="border rounded p-2 w-full"/>
              <input type="text" name="surname" placeholder="Soyad" onChange={handleChange} value={newAddress.surname}className="border rounded p-2 w-full" />
              <input type="text" name="phone" placeholder="Telefon Numarası" onChange={handleChange} value={newAddress.phone}className="border rounded p-2 w-full" />
              <select name="city" onChange={handleChange} value={newAddress.city} className="border rounded p-2 w-full">
                <option value="">Şehir Seçiniz</option>
                {/* Şehir seçenekleri */}
              </select>
              <input type="text" name="district" placeholder="İlçe" onChange={handleChange} value={newAddress.district} />
              <input type="text" name="neighborhood" placeholder="Mahalle" onChange={handleChange} value={newAddress.neighborhood} />
              <textarea name="address" placeholder="Adres" onChange={handleChange} value={newAddress.address}></textarea>
              <div className="flex justify-between items-center">
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  {isEditing ? 'Düzenlemeyi Kaydet' : 'Adres Ekle'}
                </button>
                <button onClick={() => { setShowAddAddressForm(false); setIsEditing(false); }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  İptal
                </button>
              </div>
            </form>
          </div>
          )}
          <div class="flex flex-wrap ">
          {addressList.map((address, index) => (
            <div key={index} className="relative p-4 mb-10 w-1/2 bg-white rounded shadow">
              <input type="checkbox" className="form-checkbox h-5 w-5 absolute top-0 left-0 mt-2 ml-2" />
              {/* Display other address details */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <i className="fas fa-user-circle text-lg text-gray-400"></i> {/* Profil ikonu */}
                  <span className="ml-2 text-gray-500">{address.name} {address.surname}</span> {/* Ad ve soyad bilgileri */}
                </div>
                <span className="flex items-center text-xs font-semibold text-orange-600 bg-orange-200 rounded-full px-2 py-1">
                  <i className="fas fa-phone-alt mr-1"></i> {/* Telefon ikonu */}
                  {address.phone}
                </span>
              </div>
              <div><strong>City:</strong> {address.city || 'N/A'}</div>
              <div><strong>District:</strong> {address.district || 'N/A'}</div>
              <div><strong>Neighborhood:</strong> {address.neighborhood || 'N/A'}</div>
              <div><strong>Address:</strong> {address.address || 'N/A'}</div>
              <div className="flex space-x-2 py-2">
              <button onClick={() => handleEditAddressClick(address)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded">
                Düzenle
              </button>
              <button onClick={() => handleDeleteAddress(address.id)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded">
                Sil
              </button>
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default CreateOrderPage;
