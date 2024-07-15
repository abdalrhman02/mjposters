import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseconfig';
import { CartProvider, useCart } from '../Components/CartContext';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Store() {

    const [productsList, setProductsList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('الاكثر مبيعا');
    const [specialImageFile, setSpecialImageFile] = useState(null);
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
        setSelectedValue(currentType);
    };

    const filteredProducts = productsList.filter(product => product.type === selectedValue);

    const renderUniqueContent = (section) => {
        switch (section) {
            case 'صورة خاصة':
                return (
                    <div className='special-image-poster'>
                        <div className='image'>
                            <h2>اضف الصورة هنا</h2>
                            <form>
                                <div className='dropArea' ref={dropArea}>
                                    <input 
                                        id='inputFile'
                                        type='file'
                                        accept='image/*'
                                        ref={inputFile}
                                        onChange={handleFileInputChange}
                                    />
                                    
                                    <div className='imgView' ref={imgView}>
                                        <i className="fa-solid fa-plus"></i>
                                    </div>
                                </div>
                            </form>

                            <button className='btn' onClick={handleAddSpecialImageToCart}>اضف الى السلة</button>
                        </div>

                        <div className='text'>
                            <h3>احصل على صورتك الخاصة كبوستر</h3>
                            <h4>بعض التوجيهات المهمة:</h4>
                            <p>- تأكد من ان تكون جودة الصورة جيدة و واضحة</p>
                            <p>- يجب ان تكون قياسات الصورة مناسبة عاموديا</p>
                            <p>- سنقوم بالتواصل معك في حالة وجدنا ان الصورة غير مناسبة</p>
                            <p>- اكمال الطلب في سلة التسوق</p>
                        </div>
                    </div>
                );
            case 'تصميم خاص':
                return (
                    <div className='special-design-poster'>
                        <h3>للحصول على تصميمك الخاص يرجى التواصل  معنا بشكل شخصي</h3>
                        <div className='empty-poster'>
                            <h4>تصميمك هنا</h4>
                        </div>

                        <div className='socials'>
                            <a href='#'>
                                <img src={require('../Images/Icons/whatsapp.png')} />
                            </a>

                            <a href='https://www.instagram.com/mjposters/'>
                                <img src={require('../Images/Icons/instagram.png')} />
                            </a>
                        </div>
                    </div>
                );
            default:
                return filteredProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className='poster'>
                            <img className='poster-img' src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
                        </div>
                    </Link> 
                ));
        }
    };

    const { addToCart } = useCart();  // Hook from CartContext

    // For Special Image Poster
    let imgView = useRef();
    let dropArea = useRef();
    let inputFile = useRef(null);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgLink = URL.createObjectURL(file);
            imgView.current.style.backgroundImage = `url(${imgLink})`;
            setSpecialImageFile(file);  // Store the selected file
        }
    };

    const handleAddSpecialImageToCart = async () => {
        if (specialImageFile) {
            const storage = getStorage();
            const storageRef = ref(storage, 'special_images/' + specialImageFile.name);
            try {
                // Upload the image
                const snapshot = await uploadBytes(storageRef, specialImageFile);
                // Get the download URL
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log('Download URL:', downloadURL);
    
                const specialImageProduct = {
                    id: 'special_image_poster_' + Date.now(),
                    name: 'بوستر بصورة خاصة',
                    imageUrl: downloadURL,  // Use the download URL
                    price: 200,
                    type: 'صورة خاصة',
                    quantity: 1
                };
    
                addToCart(specialImageProduct);
                alert('تم إضافة الصورة الخاصة إلى السلة');
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('حدث خطأ أثناء رفع الصورة.');
            }
        } else {
            alert('يرجى اختيار صورة أولاً');
        }
    };

    // Scrolling
    window.addEventListener('scroll', function() {
        var targetPos = 20;

        if(window.screenY >= targetPos) {
            console.log(window.screenY)
        }
        console.log(window.screenY)
    });

    return (
        <CartProvider>
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
                            <li>البومات</li>
                            <li>سيارات</li>
                            <li>رياضة</li>
                            <li>صورة خاصة</li>
                            <li>تصميم خاص</li>
                        </ul>
                    </div>

                    <div className="gallery-container">
                        <h2>{selectedValue}</h2>
                        <p className='title-para'>جميع البوسترات الموجودة هنا بسعر 130 شاقل فقط - باستثناء الصور و التصاميم الخاصة</p>

                        <div className="gallery">
                            {renderUniqueContent(selectedValue)}
                        </div>

                        {/* <ul className="numbers">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                        </ul> */}
                    </div>
                </div>

                <Footer />
            </div>
        </CartProvider>
    );
}

export default Store;