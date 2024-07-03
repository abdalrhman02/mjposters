import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseconfig';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';


function Store() {

    const [productsList, setProductsList] = useState([]);
    const productsCollection = collection(db, "products");

    const getProductsList = async () => {
        try {
            const data = await getDocs(productsCollection);
            const products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProductsList(products);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };
    useEffect(() => {
        getProductsList();
    }, []);


    const changeType = (section) => {
        let currentType = section.target.innerHTML;
        let currentTypeLi = section.target;
        setSelectedValue(currentType);
        // currentTypeLi.current.style.fontWeight = 600
    }

    const [selectedValue, setSelectedValue] = useState('');
    const filteredProducts = productsList.filter(product => product.type === selectedValue);


    // Scroling
    window.addEventListener('scroll', function() {
        var targetPos = 20;

        if(window.screenY >= targetPos) {
            console.log(window.screenY)
        }
        console.log(window.screenY)
    });
    

    return(
        <div className="store-allSections">
            <Header />

            <div className="container">
                <div className="sections">
                    <ul onClick={changeType}>
                        <li>الاكثر مبيعا</li>
                        <li>جديدنا</li>
                        <li>مسلسلات</li>
                        <li>انمي</li>
                        <li>العاب</li>
                        <li>سيارات</li>
                        <li>رياضة</li>
                        <li>طبيعة</li>
                        <li>مدن</li>
                        <li>تقنية</li>
                        <li>ميمز</li>
                        <li>مقولات</li>
                        <li>اطفال</li>
                        <li>اسود و ابيض</li>
                        <li>صورة خاصة</li>
                        <li>تصميم خاص</li>
                    </ul>
                </div>

                <div className="gallery-container">
                    <h2>الاكثر مبيعا</h2>
                    <p>جميع البوسترات الموجودة هنا بسعر 200 شاقل فقط</p>

                    <div className="gallery">
                        {filteredProducts.map((product) => (
                            <Link to={`/product/${product.id}`}>
                                <div className='poster' key={product.id}>
                                    <img src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
                                </div>
                            </Link> 
                        ))}
                    </div>

                    <ul className="numbers">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Store;