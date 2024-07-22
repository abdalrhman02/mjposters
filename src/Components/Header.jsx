
import React, {useState , useEffect } from 'react'; 

function Header() {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        function handleResize() {
        setIsSmallScreen(window.innerWidth >= 900);
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (    
        <>
            {isSmallScreen ? (
               <header>
               <div className="logo-shipping">
                   <a href="/">
                       <div className="logo">
                           <img className='logo-img' src={require('../Images/Logo/logo1.png')} />
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
                       <a href="About"><li>من نحن</li></a>
                       <a href="Customers"><li>مشاركة زبائننا</li></a>
                       <a href="Contact"><li>تواصل معنا</li></a>
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
            ) : (
                <header className='small-header'>
                    <a href="/">
                        <div className="logo">
                            <img className='logo-img' src={require('../Images/Logo/logo1.png')} />
                        </div>
                    </a>

                    <div className="links-user">
                    <ul className='links'>
                        <a href="Store" className='btn'><li>جميع الاقسام</li></a>
                        <a href="About"><li>من نحن</li></a>
                        <a href="Customers"><li>مشاركة زبائننا</li></a>
                        <a href="Contact"><li>تواصل معنا</li></a>
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
            )}
        </>
    )
}

export default Header;