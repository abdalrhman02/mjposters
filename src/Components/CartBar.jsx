import React, { useRef, useState } from 'react';
import { useCart } from '../Components/CartContext';
import emailjs from 'emailjs-com';
import { useAuth } from '../Components/AuthContext';

function CartBar() {
  const { currentUser } = useAuth(); // Check if user is logged in

  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

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
      total_price: totalPrice 
    };

    emailjs.send('service_4ecmwl9', 'template_ysxvoal', templateParams, 'VbqH9pjNBo8llwQFr')
      .then((response) => {
        console.log('Email sent:', response);
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  // Area Delivery
  const [selectedArea, setSelectedArea] = useState('40');
  const areaPrice = selectedArea ? parseInt(selectedArea) : 0;
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value); 
  };

  // Total Price
  const priceWithoutDelivery = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalPrice = priceWithoutDelivery + areaPrice

  // Check Cart List Count
  let cartList = useRef();
  console.log(cartList.current)

  return (
    <div className='cartbar'>
      {currentUser ? (
        <>
          <h1>سلة التسوق</h1>
          <p>عدد المنتجات في السلة: {cartItems.length}</p>
          {cartItems.length === 0 ? (
            <div className='empty-cart'>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className='cart-list' ref={cartList}>
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

              <div className='totalPrice'>
                <p>السعر النهائي: <b>{totalPrice}₪</b></p>
              </div>

              <div className='the-form'>
                <div className="text">
                  <h2>ادخل معلوماتك هنا</h2>
                  <p>تأكد من ادخال المعلومات بشكل صحيح لنوصل اليك طلبك بشكل صحيح و في اسرع وقت ممكن</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name">اسمك الشخصي</label>
                    <input type="text" id="name" value={name}
                      onChange={(e) => setName(e.target.value)} required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">رقم هاتفك</label>
                    <input type="number" id="phone" value={phone}
                      onChange={(e) => setPhone(e.target.value)} required
                    />
                  </div>

                  <div>
                    <label htmlFor="address">البلد</label>
                    <input type="text" id="address" value={address}
                      onChange={(e) => setAddress(e.target.value)} required />
                  </div>

                  <button type="submit" className='btn'>ارسال طلبيتك</button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className='loginCart'>
            <div className="container">
              <h1>سجل دخولك الان و احصل على البوستر الخاص بك!</h1>

              <div className="btns">
                <a href="Login">
                  <button className='btn'>تسجيل الدخول</button>
                </a>

                <a href="Signup">
                  <button className='btn'>انشاء حساب جديد</button>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartBar;