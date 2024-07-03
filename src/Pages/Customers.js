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

                <div className='photos'>
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                    <img src={require('../Images/photo.jpg')} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Customers;