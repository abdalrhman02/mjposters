import React from 'react';
import { useCart } from '../Components/CartContext';
import { useAuth } from '../Components/AuthContext';

function ProductCom({
  prName,
  prPrice,
  prType,
  prDescription,
  prImg,
  productId,
}) {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (currentUser) {
      const product = {
        id: productId,
        name: prName,
        price: prPrice,
        type: prType,
        description: prDescription,
        imageUrl: prImg,
        quantity: 1,
      };
      addToCart(product);
    } else {
      alert('يرجى تسجيل الدخول لإضافة المنتج إلى السلة.');
    }
  };

  return (
    <div className="productPage">
      <div className="container">
        <div className="product-info">
          <div className="poster-image">
            <p>قسم ال{prType}</p>
            <img src={prImg} alt={prName} />
          </div>

          <div className="poster-info">
            <h2 className="poster-name">{prName}</h2>
            <p className="price">
              <b>{prPrice}₪</b> | طرق دفع متعددة
            </p>

            <div className="buy">
              <button className="btn" onClick={handleAddToCart}>
                اضف للسلة
              </button>
              <i className="fa-regular fa-heart"></i>
            </div>

            <p className="description">{prDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCom;