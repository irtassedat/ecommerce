it('should place an order successfully with selected address and payment method', () => {
    // Mocking necessary dependencies and setting up initial state
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    const mockState = {
        shoppingCart: {
            addressList: [{ id: 1, title: 'Home', name: 'John', surname: 'Doe', phone: '5555555555', city: '34', district: 'Beşiktaş', neighborhood: 'Levent', address: '123 Main St' }],
            totalPrice: 200,
            currentAddress: { id: 1 },
            payment: { card_no: '1234567890123456', expire_month: '12', expire_year: '25', name_on_card: 'John Doe', ccv: '123' },
            cartDetails: { totalPrice: 200, isEligibleForFreeShipping: true, shippingCost: 0, products: [{ id: 1, count: 2, detail: 'Product details' }] }
        }
    };
    const mockUseSelector = jest.spyOn(reactRedux, 'useSelector').mockImplementation(selector => selector(mockState));

    // Rendering the component
    const { getByText, getByLabelText } = render(<CreateOrderPage />);

    // Simulating user actions
    fireEvent.click(getByText('Ödeme Seçenekleri'));

    // Triggering the order submission
    fireEvent.click(getByText('Ödeme Yap'));

    // Expectations
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CREATE_ORDER_SUCCESS',
        payload: {
            address_id: 1,
            order_date: expect.any(String),
            card_no: '************3456',
            card_name: 'John Doe',
            card_expire_month: '12',
            card_expire_year: '25',
            card_ccv: '***',
            price: 200,
            products: [{ product_id: 1, count: 2, detail: 'Product details' }]
        }
    });
});