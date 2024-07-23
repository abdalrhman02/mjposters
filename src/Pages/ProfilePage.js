import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseconfig';
import { useAuth } from '../Components/AuthContext';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ProfilePage() {
    const { currentUser, logout } = useAuth();
    const [user, setUser] = useState(null);
    const [favoritePosters, setFavoritePosters] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                getFavoritePosters(user.uid);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const getFavoritePosters = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            const favoritesSnap = await getDocs(collection(userRef, 'favorites'));
            const favoriteProducts = favoritesSnap.docs.map((doc) => doc.data());
            setFavoritePosters(favoriteProducts);
        } catch (error) {
            console.error('Error fetching Firestore favorites:', error);
        }
    };

    const removeFromFavorites = async (productId) => {
        if (currentUser) {
            try {
                const userRef = doc(db, 'users', currentUser.uid);
                const favoritesRef = doc(userRef, 'favorites', productId);
                await deleteDoc(favoritesRef);
                setFavoritePosters(favoritePosters.filter((product) => product.id !== productId));
            } catch (error) {
                console.error('Error removing from Firestore favorites:', error);
            }
        }
    };

    return (
        <div className='profilePage'>
            <Header />

            {currentUser ? (
                <>
                <div className='container'>
                    <div className='account-settings'>
                        <div className='pages-bar'>
                            <div>
                                <p>الحساب</p>
                            </div>
                        </div>

                        <div className='account'>
                            <div className='profile-details'>
                                <div className='profile-info'>
                                {user ? ( 
                                        <h3 className='name'>
                                            {user.displayName}
                                        </h3>
                                    ) : (
                                        <h3>Username Here</h3>   
                                    )}
                                    
                                    {user ? ( 
                                        <p className='email'>
                                            {user.email}
                                        </p>
                                    ) : (
                                        <p>Email Here</p>   
                                    )}
                                </div>
                            </div>

                            <div className='favorite'>
                                <h3>قائمة المفضلة</h3>
                                <div className='favorite-list'>
                                {favoritePosters.length > 0 ? (
                                    favoritePosters.map((product) => (
                                    <div key={product.id} className="poster">
                                        <Link to={`/product/${product.id}`}>
                                            <img
                                                src={product.imageUrl + '?alt=media'}
                                                alt={`Product ${product.id}_${product.name}`}
                                            />
                                        </Link>
                                        <i className="fa-solid fa-xmark deleteBtn"
                                           onClick={() => removeFromFavorites(product.id)} > 
                                        </i>
                                    </div>
                                    ))
                                ) : (
                                    <p>لا توجد ملصقات مفضلة حتى الآن.</p>
                                )}
                                </div>
                            </div>

                            <button className='btn' onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
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

            <Footer />
        </div>  
    )
}

export default ProfilePage;