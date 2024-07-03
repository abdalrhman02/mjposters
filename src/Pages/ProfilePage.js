import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebaseconfig';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ProfilePage() {

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

    return (
        <div className='profilePage'>
            <Header />
            
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
                                <h3 className='name'>{user.displayName}</h3>
                                <p className='email'>{user.email}</p>
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

                        <div className='favorite'>
                            <h3>قائمة المفضلة</h3>

                            <div className='favorite-list'>
                                <img src={require('../Images/Posters/p3.png')} />
                                <img src={require('../Images/Posters/p2.png')} />
                                <img src={require('../Images/Posters/p5.png')} />
                            </div>
                        </div>

                        <div className='message'>
                            <h2>هل لديك تعليق على خدماتنا؟</h2>
                            <p>نسعد في سماع ارائكم و اقتراحاتكم لتطوير مشروعنا و تقديم افضل ما يمكن لكم</p>
                            <h3>اكتب تعليقك هنا</h3>
                            <form>
                                <input type='text' />
                                <input type='submit' value="ارسال" className='btn' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ProfilePage;