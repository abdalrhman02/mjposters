import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseconfig';
import { useCart } from '../Components/CartContext';

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
                            <p>- انتظر الاشعار للتأكد من اضافة البوستر للسلة</p>
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
            console.log('File selected:', file);
        }
    };

    const errorNoti = useRef();
    const successNoti = useRef();
    const handleAddSpecialImageToCart = async () => {
        console.log('handleAddSpecialImageToCart called');
        if (specialImageFile) {
            console.log('Special image file exists:', specialImageFile);
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
    
                console.log('Adding to cart:', specialImageProduct);
                addToCart(specialImageProduct);
                
                // added Notification
                successNoti.current.classList.add('disFlex');
                successNoti.current.classList.remove('disNone');
                setTimeout(() => {
                  successNoti.current.classList.remove('disFlex');
                  successNoti.current.classList.add('disNone');
                }, 3000)
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('حدث خطأ أثناء رفع الصورة.');
            }
        } else {
            // error added Notification
            errorNoti.current.classList.add('disFlex');
            errorNoti.current.classList.remove('disNone');
            setTimeout(() => {
                errorNoti.current.classList.remove('disFlex');
                errorNoti.current.classList.add('disNone');
            }, 3000)
        }
    };

    return (
        <div className="store-allSections">
            <Header />

            <div className='noti'>
                <div className="success disNone" ref={successNoti}>
                    <img src={require('../Images/Icons/success.png')} />
                    <h3>تمت اضافة البوستر الى سلة الشراء</h3>
                </div>

                <div className="error disNone" ref={errorNoti}>
                    <img src={require('../Images/Icons/error.png')} />
                    <h3>اختر صورة اولا</h3>
                </div>
            </div>

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
                        <li>شخصيات مشهورة</li>
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
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Store;