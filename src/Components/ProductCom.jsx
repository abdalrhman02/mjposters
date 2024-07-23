import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../Components/CartContext';
import { useAuth } from '../Components/AuthContext';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';

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
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const errorNoti = useRef();
  const successNoti = useRef();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const favoriteRef = doc(userRef, 'favorites', productId);
        const favoriteSnap = await getDoc(favoriteRef);
        setIsFavoriteState(favoriteSnap.exists());
      }
    };

    fetchFavoriteStatus();
  }, [currentUser, productId]);

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
      }, 3000);
    } else {
      errorNoti.current.classList.add('disFlex');
      errorNoti.current.classList.remove('disNone');
      setTimeout(() => {
        errorNoti.current.classList.remove('disFlex');
        errorNoti.current.classList.add('disNone');
      }, 3000);
    }
  };

  const handleToggleFavorite = async () => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      const favoriteRef = doc(userRef, 'favorites', productId);

      try {
        if (isFavoriteState) {
          await deleteDoc(favoriteRef);
          setIsFavoriteState(false);
        } else {
          await setDoc(favoriteRef, {
            id: productId,
            name: prName,
            price: prPrice,
            type: prType,
            description: prDescription,
            imageUrl: prImg,
          });
          setIsFavoriteState(true);
        }
      } catch (error) {
        console.error('Error updating Firestore favorites:', error);
      }
    } else {
      alert('يرجى تسجيل الدخول لإضافة المنتج إلى المفضلة.');
    }
  };

  return (
    <div className="productPage">
      <div className='noti'>
        <div className="success disNone" ref={successNoti}>
          <img src={require('../Images/Icons/success.png')} alt="Success" />
          <h3>تمت اضافة البوستر الى سلة الشراء</h3>
        </div>

        <div className="error disNone" ref={errorNoti}>
          <img src={require('../Images/Icons/error.png')} alt="Error" />
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

              <i
                className={isFavoriteState ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                onClick={handleToggleFavorite}
              ></i>
            </div>

            <p className="description">{prDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCom;