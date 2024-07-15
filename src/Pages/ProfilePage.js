import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebaseconfig';
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseconfig';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ProfilePage() {
    const { currentUser, logout } = useAuth();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser('asd');
        }
        });

        return () => unsubscribe();
    }, []);
    
    const [favoritePosters, setFavoritePosters] = useState([]);
    const productsCollection = collection(db, 'products');
  
    const getFavoritePosters = async () => {
      try {
        const favoriteIds = localStorage.getItem('favoritePosters');
        if (favoriteIds) {
          const favoriteIdsArray = JSON.parse(favoriteIds);
          const favoriteProducts = await Promise.all(
            favoriteIdsArray.map(async (id) => {
              const productDoc = doc(db, 'products', id);
              const productData = await getDoc(productDoc);
              if (productData.exists()) {
                return { ...productData.data(), id: productData.id };
              }
              return null;
            })
          );
          setFavoritePosters(favoriteProducts.filter((product) => product !== null));
        }
      } catch (error) {
        console.error('Error fetching favorite posters: ', error);
      }
    };
  
    useEffect(() => {
      getFavoritePosters();
    }, []);
  
    const addToFavorites = (product) => {
      const updatedFavorites = [...favoritePosters, product];
      setFavoritePosters(updatedFavorites);
      updateLocalStorageFavorites(updatedFavorites);
    };

    const removeFromFavorites = (productId) => {
      const updatedFavorites = favoritePosters.filter((product) => product.id !== productId);
      setFavoritePosters(updatedFavorites);
      updateLocalStorageFavorites(updatedFavorites);
    };

    const updateLocalStorageFavorites = (favorites) => {
      const favoriteIds = favorites.map((product) => product.id);
      localStorage.setItem('favoritePosters', JSON.stringify(favoriteIds));
    };

    return (
        <div className='profilePage'>
            <Header />

            {currentUser ? (
                <>
                <div className='container'>
                    <div className='account-settings'>
                        <div className='pages-bar'>
                        <a href="#">
                            <p>الحساب</p>
                        </a>

                        {/* <a href="#">
                            <p>الاعدادات</p>
                        </a> */}
                        </div>

                        <div className='account'>
                            <div className='profile-details'>
                                <div className='image-profile'>
                                    <img src={require('../Images/photo.jpg')} />
                                </div>

                                <div className='profile-info'>
                                    {user !== null ? ( 
                                        <h3 className='name'>
                                            {user.displayName}
                                        </h3>
                                    ) : (
                                        <h3>Username Here</h3>   
                                    )}
                                    
                                    
                                    {user !== null ? ( 
                                        <p className='email'>
                                            {user.email}
                                        </p>
                                    ) : (
                                        <p>Username Here</p>   
                                    )}
                                </div>
                            </div>

                            <div className='purchases'>
                                <h3>قائمة المشتريات</h3>
                                <p>عدد مرات الشراء: 2</p>

                                <div className='purchases-list'>
                                    <img src={require('../Images/Posters/p18.png')} />
                                    <img src={require('../Images/Posters/p12.png')} />
                                    <img src={require('../Images/Posters/p15.png')} />
                                </div>
                            </div>

                            {/* <div className='favorite'>
                                <h3>قائمة المفضلة</h3>

                                <div className='favorite-list'>
                                {favoritePosters.length > 0 ? (
                                    favoritePosters.map((product) => (
                                    <Link to={`/product/${product.id}`} key={product.id}>
                                        <div className="poster">
                                        <img
                                            src={product.imageUrl + '?alt=media'}
                                            alt={`Product ${product.id}_${product.name}`}
                                        />
                                        <h3 className="poster-name">{product.name}</h3>
                                        </div>
                                    </Link>
                                    ))
                                ) : (
                                    <p>لا توجد ملصقات مفضلة حتى الآن.</p>
                                )}
                                </div>
                            </div> */}

                            <div className='message'>
                                <h2>هل لديك تعليق على خدماتنا؟</h2>
                                <p>نسعد في سماع ارائكم و اقتراحاتكم لتطوير مشروعنا و تقديم افضل ما يمكن لكم</p>
                                <h3>اكتب تعليقك هنا</h3>
                                <form>
                                    <input type='text' />
                                    <input type='submit' value="ارسال" className='btn' />
                                </form>
                            </div>


                            <button className='btn' onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
                </>
            ) : (
            <>
                <div className='loginCart' >
                <div className="container">
                    <h1>سجل دخولك الان و احصل على البوستر الخاص بك!</h1>

                    <div className="btns">
                    <a href="Login">
                        <button className='btn' >تسجيل الدخول</button>
                    </a>
                    
                    <a href="Signup">
                        <button className='btn' >انشاء حساب جديد</button>
                    </a>
                    </div>
                </div>
                </div>
            </>
            )} 

            <Footer />
        </div>  
    )
}

export default ProfilePage;