import React, { useRef, useState } from 'react';
import { useCart } from '../Components/CartContext';
import { useAuth } from '../Components/AuthContext';

function ProductCom({
  prName,
  prPrice,
  prType,
  prDescription,
  prImg,
  productId,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}) {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const errorNoti = useRef();
  const successNoti = useRef();

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
      
        successNoti.current.classList.add('disFlex');
        successNoti.current.classList.remove('disNone');
        setTimeout(() => {
          successNoti.current.classList.remove('disFlex');
          successNoti.current.classList.add('disNone');
        }, 3000)
    } else {
      errorNoti.current.classList.add('disFlex');
      errorNoti.current.classList.remove('disNone');
      setTimeout(() => {
        errorNoti.current.classList.remove('disFlex');
        errorNoti.current.classList.add('disNone');
      }, 3000)
    }
  };

  // const handleToggleFavorite = () => {
  //   if (currentUser) {
  //     if (isFavoriteState) {
  //       removeFromFavorites(productId);
  //     } else {
  //       addToFavorites({
  //         id: productId,
  //         name: prName,
  //         price: prPrice,
  //         type: prType,
  //         description: prDescription,
  //         imageUrl: prImg,
  //       });
  //     }
  //     setIsFavoriteState(!isFavoriteState); 
  //   } else {
  //     alert('يرجى تسجيل الدخول لإضافة المنتج إلى المفضلة.');
  //   }
  // };

  return (
    <div className="productPage">
        
      <div className='addProduct-Noti'>
        <div className="success disNone" ref={successNoti}>
          <img src={require('../Images/Icons/success.png')} />
          <h3>تمت اضافة البوستر الى سلة الشراء</h3>
        </div>

        <div className="error disNone" ref={errorNoti}>
          <img src={require('../Images/Icons/error.png')} />
          <h3>يرجى تسجيل الدخول اولا</h3>
        </div>

      </div>

      <div className="container">
        <div className="product-info">
          <div className="poster-image">
            <p>قسم ال{prType}</p>
            <img src={prImg} alt={prName} />
          </div>

          <div className="poster-info">
            <h2 className="poster-name">{prName}</h2>
            <p className="price">
              <b>{prPrice}₪</b> | الدفع عند التوصيل
            </p>

            <div className="buy">
              <button className="btn" onClick={handleAddToCart}>
                اضف للسلة
              </button>

              {/* <i
                className={isFavoriteState ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                onClick={handleToggleFavorite}
              ></i> */}
            </div>

            <p className="description">{prDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCom;