import React, { useRef, useState } from 'react';
import { useCart } from '../Components/CartContext';
import emailjs from 'emailjs-com';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function CartBar() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payPalOrderId, setPayPalOrderId] = useState(null);

  const validCoupon = 'MJSUMMER';
  const errorNoti = useRef();
  const successNoti = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const completeOrder = () => {
    const templateParams = {
      user_name: name,
      user_phone: phone,
      user_address: address,
      cart_items: cartItems.map(item => `
        <div>
          <p><strong>البوستر:</strong> ${item.name}</p>
          <p><strong>السعر:</strong> ₪${item.price}</p>
          <p><strong>الكمية:</strong> ${item.quantity}</p>
          <img src="${item.imageUrl}" alt="${item.name}" width="100" />
          <hr />
        </div>
      `).join(''),
      total_price: discountedPrice,
      payment_method: paymentMethod === 'cash' ? 'Cash on Delivery' : paymentMethod,
    };

    emailjs.send('service_4ecmwl9', 'template_ysxvoal', templateParams, 'VbqH9pjNBo8llwQFr')
      .then(() => {
        successNoti.current.classList.add('disFlex');
        successNoti.current.classList.remove('disNone');
        setTimeout(() => {
          successNoti.current.classList.remove('disFlex');
          successNoti.current.classList.add('disNone');
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        errorNoti.current.classList.add('disFlex');
        errorNoti.current.classList.remove('disNone');
        setTimeout(() => {
          errorNoti.current.classList.remove('disFlex');
          errorNoti.current.classList.add('disNone');
        }, 3000);
      });
  };

  const handlePayPalSuccess = (details) => {
    console.log('Transaction completed by ', details.payer.name.given_name);
    completeOrder();
  };

  const [selectedArea, setSelectedArea] = useState('40');
  const areaPrice = selectedArea ? parseInt(selectedArea) : 0;
  const handleAreaChange = (e) => setSelectedArea(e.target.value);

  const priceWithoutDelivery = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const originalPrice = priceWithoutDelivery + areaPrice;
  const totalPrice = priceWithoutDelivery + areaPrice;
  const discount = coupon === validCoupon ? totalPrice * 0.25 : 0;
  const discountedPrice = originalPrice - discount;

  return (
    <div className='cartbar'>
      <h1>سلة التسوق</h1>
      <p>عدد المنتجات في السلة: {cartItems.length}</p>

      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className='cart-list'>
          <div className='cart-noti'>
            <div className="success disNone" ref={successNoti}>
              <img src={require('../Images/Icons/success.png')} alt="Success" />
              <h3>تم ارسال طلبيتك بنجاح!</h3>
            </div>
            <div className="error disNone" ref={errorNoti}>
              <img src={require('../Images/Icons/error.png')} alt="Error" />
              <h3>حدث خطأ ما , يرجى اعادة المحاولة</h3>
            </div>
          </div>

          {cartItems.map((product) => (
            <div key={product.id}>
              <div className='product-details'>
                <div className='poster-image'>
                  <i className="fa-solid fa-xmark" onClick={() => removeFromCart(product.id)}></i>
                  <img src={product.imageUrl} alt={product.name} width="100" />
                </div>
                <div className='product-info'>
                  <h3 className='product-name'>{product.name}</h3>
                  <p className='product-price'>السعر: ₪{product.price}</p>
                  <div className='quantity'>
                    <button className='quantity-btn btn' onClick={() => increaseQuantity(product.id)}>+</button>
                    <p>{product.quantity}</p>
                    <button className='quantity-btn btn' onClick={() => decreaseQuantity(product.id)}>-</button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}

          <div className='area'>
            <p>اختر منطقتك</p>
            <select onChange={handleAreaChange}>
              <option value="40">الشمال</option>
              <option value="40">المثلث</option>
              <option value="50">القدس</option>
              <option value="50">الجنوب</option>
              <option value="70">الضفة</option>
            </select>
          </div>

          <div className='coupon'>
            <label htmlFor="coupon">كود الخصم:</label>
            <input 
              type="text" 
              id="coupon" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)} 
            />
          </div>

          <div className='totalPrice'>
            <p>السعر الاصلي(شامل التوصيل): <b>{totalPrice}₪</b></p>
            {discount > 0 && <p>السعر بعد الخصم: <b>{Math.floor(discountedPrice)}₪</b></p>}
          </div>

          <div className='the-form'>
            <h2>ادخل معلوماتك هنا</h2>
            <form onSubmit={handleSubmit}>
              <div className='inp'>
                <label htmlFor="name">اسمك الشخصي</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className='inp'>
                <label htmlFor="phone">رقم هاتفك</label>
                <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className='inp'>
                <label htmlFor="address">البلد</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              {showPaymentModal && (
                <div className="payment-modal">
                  <h3>طرق الدفع</h3>

                  <div className='payment-methods'>
                    <div onClick={() => handlePaymentMethod('cash')}>
                      <img src={require('../Images/Icons/delivery.png')} />
                      <p>الدفع عند الاستلام</p>
                    </div>
                    <div onClick={() => handlePaymentMethod('paypal')}>
                      <img src={require('../Images/Icons/paypal.png')} style={{width:'6em'}} />
                    </div>
                  </div>

                  {paymentMethod === 'paypal' && (
                <PayPalScriptProvider options={{ "client-id": "Ab6v--oYzQax1BJYACCiUEOGXvmqHdbRnSTAwN638BJATZEGQen2LDw3u9zS0_YyUNsoWkSTWRlE9CXe" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: discountedPrice.toFixed(2),
                          },
                        }],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      await actions.order.capture();
                      handlePayPalSuccess(data);
                    }}
                  />
                </PayPalScriptProvider>
              )}

                  <button onClick={() => {
                    setShowPaymentModal(false);
                    if (paymentMethod === 'cash') {
                      completeOrder();
                    }
                  }} className='btn'>تأكيد الطلب</button>
                </div>
              )}

              <button type="submit" className='btn send'>اكمل الطلب</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartBar;
