
// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Home() {
    return(
        <div className="home">
            <Header />

            <div className='intro'>
                <div className='text'>
                    <p className='website-name'>MJPOSTERS</p>
                    <h1>زين غرفتك <br></br> و ابرز اهتماماتك <br></br> مع بوستراتنا المميزة</h1>
                    
                    <div className='btn-socials'>
                        <a href="#"><button className='btn'>تسوق الان</button></a>
                        <a href="#"><img src={require('../Images/Icons/whatsapp.png')} /></a>
                        <a href="#"><img src={require('../Images/Icons/instagram.png')} /></a>
                    </div>
                </div>

                <div className='images'>
                    <img src={require('../Images/Posters/p1.png')} />
                    <img src={require('../Images/Posters/p2.png')} />
                    <img src={require('../Images/Posters/p3.png')} />
                </div>
            </div>

            <div className='top-sales'>
                <div className='title'>
                    <h2>البوسترات الاكثر مبيعا</h2>
                    <div className='title-line'></div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    )
}

export default Home;