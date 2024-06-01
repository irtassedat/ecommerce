import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../mock/axiosInstance';
import { fetchAddresses, fetchCards } from '../store/actions/shoppingCartAction';

const PreviousOrderPage = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const addressList = useSelector((state) => state.shoppingCart.addressList);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/order", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    dispatch(fetchAddresses());
    dispatch(fetchCards());
  }, [dispatch]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const getOrderAddress = (addressId) => {
    return addressList.find(address => address.id === addressId);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className={`relative ${selectedOrder ? 'overflow-hidden' : ''}`}>
      <div className={`container mx-auto p-4 transition duration-500 ${selectedOrder ? 'filter blur-sm' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <button className="p-2 rounded-full bg-zinc-200">
            <svg
              className="w-6 h-6 text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex border-b mb-4">
          <button className="flex-1 py-2 border-b-2 border-indigo-500 text-indigo-500">Past Orders</button>
          <button className="flex-1 py-2 text-zinc-500">Upcoming Orders</button>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">January</h2>
          <span className="text-zinc-500">{orders.length} Orders</span>
        </div>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-zinc-500">{new Date(order.order_date).toLocaleDateString()} | {new Date(order.order_date).toLocaleTimeString()}</p>
                </div>
                <button className="text-zinc-400" onClick={() => handleOrderClick(order)}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {order.products.slice(0, 5).map((product, index) => (
                  <img key={index} src={product.images[0].url} alt={product.name} className="w-8 h-8 rounded-full" />
                ))}
                {order.products.length > 5 && <span className="text-zinc-500">+{order.products.length - 5}</span>}
              </div>
              <div className="flex justify-between items-center text-zinc-500">
                <div className="flex items-center">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2">Order Rate</span>
                </div>
                <div>
                  <span className="font-semibold">{order.products.length} Products</span>
                </div>
                <div>
                  <span className="font-semibold">£ {order.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeModal}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details for Order #{selectedOrder.id}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {selectedOrder.products.map((product, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                  <img src={product.images[0].url} alt={product.name} className="w-16 h-16 rounded-full mb-2 mx-auto" />
                  <h3 className="text-md font-semibold text-center">{product.name}</h3>
                  <p className="text-sm text-center text-gray-500">{product.description}</p>
                  <p className="text-center font-semibold">Price: £{product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <div className="p-4 bg-gray-100 rounded-lg">
              {(() => {
                const address = getOrderAddress(selectedOrder.address_id);
                return address ? (
                  <div>
                    <p><strong>{address.title}</strong></p>
                    <p>{address.name} {address.surname}</p>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.district}, {address.neighborhood}</p>
                    <p>{address.phone}</p>
                  </div>
                ) : (
                  <p>Address not found</p>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousOrderPage;
