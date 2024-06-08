

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className='socials'>
                    <a href="https://www.instagram.com/mjposters/">
                        <img src={require('../Images/Icons/instagram.png')} />
                    </a>

                    <a href="#">
                        <img src={require('../Images/Icons/whatsapp.png')} />
                    </a>
                </div>
                
                <div className="links">
                    <ul>
                        <a href="#"><li>من نحن</li></a>
                        <a href="#"><li>الأسئلة الشائعة</li></a>
                        <a href="#"><li>سياسة الترجيع</li></a>
                        <a href="#"><li> مشاركة زبائننا</li></a>
                    </ul>
                </div>

                <div className="logo">
                    <img src={require('../Images/Logo/logo.png')} />
                </div>
            </div>

            <div className='copyright'> 
                <p>2024 © MJPOSTERS</p>
            </div>
        </footer>
    )
}

export default Footer;