
// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ProductCom({
    prName, prPrice, prType, prDescription, prImg
    }) {

    return(
        <div className="productPage">

            <div className='container'>
                <div className="product-info">
                    <div className="poster-image">
                        <p>قسم ال{prType}</p>
                        <img src={prImg} />
                    </div>

                    <div className="poster-info">
                        <h2 className='poster-name'>{prName}</h2>
                        <p className="price"><b>{prPrice}₪</b> | طرق دفع متعددة</p>
                        
                        <div className="buy">
                            <button className='btn'>اضف للسلة</button>
                            <i class="fa-regular fa-heart"></i>
                        </div>

                        <p className='description'>{prDescription}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCom;