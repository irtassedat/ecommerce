import React, { useState, useEffect } from 'react';
import axiosInstance from '../mock/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddresses, addAddress, deleteAddress, addAddressAndUpdateList, updateAddress} from '../store/actions/shoppingCartAction';


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
          <div class="mb-6 md:mr-4 md:w-1/2">
            <div class="mb-4">
                <h2 class="text-xl font-semibold mb-3">Adres Bilgileri</h2>
          <div className="mb-4">
            <button onClick={() => setShowAddAddressForm(!showAddAddressForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {showAddAddressForm ? 'Cancel' : 'Add New Address'}
            </button>
          </div>
          { (showAddAddressForm || isEditing) && (
            <form onSubmit={isEditing ? handleSaveEditedAddress : handleAddNewAddress} className="space-y-4">
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
              <button type="submit">{isEditing ? 'Düzenlemeyi Kaydet' : 'Adres Ekle'}</button>
            </form>
          )}
          {addressList.map((address, index) => (
            <div key={index} className="p-4 mb-4 bg-white rounded shadow ">
              <div className="flex justify-between items-center">
                <strong>Title:</strong> {address.title || 'N/A'}  
              </div>
              {/* Display other address details */}
              <div><strong>Name:</strong> {address.name || 'N/A'} {address.surname || ''}</div>
              <div><strong>Phone:</strong> {address.phone || 'N/A'}</div>
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
