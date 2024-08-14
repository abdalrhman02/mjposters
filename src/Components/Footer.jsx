import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className='socials'>
                    <a href="https://www.instagram.com/mjposters/" target="_blank">
                        <img src={require('../Images/Icons/instagram.png')} />
                    </a>
                </div>
                
                <div className="links">
                    <ul>
                        <a href="/"><li>الرئيسية</li></a>
                        <a href="/About"><li>من نحن</li></a>
                        <a href="/Customers"><li> مشاركة زبائننا</li></a>
                        <a href="/Contact"><li>تواصل معنا</li></a>
                    </ul>
                </div>

                
                <a href="/">
                    <div className="logo">
                        <img src={require('../Images/Logo/logo2.png')} />
                    </div>
                </a>
            </div>

            <div className='copyright'> 
                <p>2024 © MJPOSTERS</p>
                <p>تطوير و تصميم <a href="https://www.coderkoala.xyz/" target='_blank'>CoderKoala</a></p>
            </div>
        </footer>
    )
}

export default Footer;