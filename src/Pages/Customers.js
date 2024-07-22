// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';


function Customers() {
    return (
        <div className='customers'>
            <Header />

            <div className='container'>
                <div className='center-title'>
                    <h2>مشاركة لزبائننا لبوستراتهم</h2>
                    <div className='title-line'></div>
                    <p>نعمل على ان نقدم الافضل لكم دائما</p>
                </div>

                <div className='customers'>
                    <div className='customer'>
                        
                        <div className='poster-img'>
                            <img src={require('../Images/Customers/c1.jpeg')}  />
                        </div>

                        <div className='comment'>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                            <h3>ولك بجنن عنجد توقعت يكون كرتون طلع الاشي كتير بجوده عاليه ومرتب كتير كتير عنجد شكرا شكرا ويعطيك الف عافيه انشالله رح ارجع اطلب من عندك</h3>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                        </div>
                    </div>

                    <div className='customer'>
                        <div className='poster-img'>
                            <img src={require('../Images/Customers/c3.jpeg')} className='poster-img' />                        
                        </div>
                        
                        <div className='comment'>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                            <h3>البوسترات نار اخي ، عجبو الشباب</h3>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                        </div>
                    </div>

                    <div className='customer'>
                        <div className='poster-img'>
                            <img src={require('../Images/Customers/c4.jpeg')} className='ver-img' />                        
                        </div>

                        <div className='comment'>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                            <h3>فكرت يكون اشي بسيط ، طلع شغل إحترافي 🔥 تصميم وإبداع وبراويز ثقيلة .. شدّ حالك مرتب الشغل ..</h3>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                        </div>
                    </div>

                    <div className='customer'>
                        <div className='poster-img'>
                            <img src={require('../Images/Customers/c5.jpeg')} className='ver-img' />                        
                        </div>
                        <div className='comment'>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                            <h3>تعيشششش يعطيك الف عافية</h3>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                        </div>
                    </div>

                    <div className='customer'>

                        <div className='poster-img'>
                            <img src={require('../Images/Customers/c6.jpeg')} className='poster-img' />                        
                        </div>

                        <div className='comment'>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                            <h3>كتير حلو شكرا كتير , جامد والله</h3>
                            <img src={require('../Images/Icons/quote.png')} className='quote-icon' />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Customers;