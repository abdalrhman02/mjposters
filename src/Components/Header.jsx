import { useRef } from 'react';
import CartBar from './CartBar';

function Header() {

    return (
        <header>
            <div className="logo-shipping">
                <a href="/">
                    <div className="logo">
                        <img className='logo-img' src={require('../Images/Logo/logo-nobackground.png')} />
                    </div>
                </a>

                <div className="shipping">
                    <img className='ship-icon' src={require('../Images/Icons/shipping.png')} />
                    <p>توصيل الى كل المناطق - الداخل | الضفة | القدس</p>
                </div>
            </div>

            <div className="links-user">
                <ul className='links'>
                    <a href="Store" className='btn'><li>جميع الاقسام</li></a>
                    <a href="#"><li>سيارات</li></a>
                    <a href="#"><li>رياضة</li></a>
                    <a href="#"><li>مسلسلات</li></a>
                    <a href="#"><li>طبيعة</li></a>
                    <a href="#"><li>اطفال</li></a>
                </ul>

                <div className='user'>
                    <a href="Cart" className='cart'>
                        <img src={require("../Images/Icons/cart-icon.png")} />
                    </a>

                    <div className="profile">
                        <a href="ProfilePage"><img src={require('../Images/Icons/user-icon.png')} /></a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;