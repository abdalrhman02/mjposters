import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseconfig';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function AdminPage() {
    const [productsList, setProductsList] = useState([]);
    const [newPrName, setNewPrName] = useState('');
    const [newPrPrice, setNewPrPrice] = useState(0);
    const [newPrDesc, setNewPrDesc] = useState('');
    const [newPrSection, setNewPrSection] = useState('');
    const [newPrImage, setNewPrImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const productsCollection = collection(db, "products");
    const addProduct = async () => {
        // Upload image to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `posters_images/${newPrImage.name}`);
        await uploadBytes(storageRef, newPrImage);

        // Get image URL
        const imageUrl = await getDownloadURL(storageRef);

        const newProductRef = await addDoc(productsCollection, {
            name: newPrName,
            price: newPrPrice,
            description: newPrDesc,
            type: newPrSection,
            imageUrl: imageUrl 
        });


        getProductsList();
        window.location.reload()
    };


    const getProductsList = async () => {
        const data = await getDocs(productsCollection);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProductsList(filteredData);
    };
    useEffect(() => {
        getProductsList();
    }, []);


    const deleteProduct = async (id) => {
        try {
            const productDoc = doc(db, 'products', id);
            await deleteDoc(productDoc);
            setProductsList(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    let imgView = useRef();
    let dropArea = useRef();
    let inputFile = useRef(null);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPrImage(file);
            const imgLink = URL.createObjectURL(file);
            imgView.current.style.backgroundImage = `url(${imgLink})`;
        }
    };


    // Change Products List Type 
    const [selectedValue, setSelectedValue] = useState('');
    let selectChange = (event) => {
        let value = event.target.value
        setSelectedValue(value)
    }
    
    const filteredProducts = productsList.filter(product => product.type === selectedValue);

    return (
        <div className='admin-page'>
            <Header />

            <div className='container'>

                <div className='posters-list'>
                    <select onChange={selectChange} value={selectedValue}>
                        <option>اختر القسم</option>
                        <option value="مسلسلات">قسم المسلسلات</option>
                        <option value="انمي">قسم الانمي</option>
                        <option value="العاب">قسم العاب</option>
                        <option value="سيارات">قسم السيارات</option>
                        <option value="البومات">قسم الالبومات</option>
                        <option value="طبيعة">قسم الطبيعة</option>
                        <option value="رياضة">قسم الرياضة</option>
                        <option value="مدن">قسم المدن</option>
                    </select>

                    <div className='list'>
                        {filteredProducts.map((product) => (
                            <div className='poster' key={product.id}>
                            <Link to={`/product/${product.id}`}>
                              <img src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
                              <div className='details'>
                                <div className='name'>
                                  <p>{product.name}</p>
                                </div>
                                <div>
                                  <p>{product.price}</p>
                                  <p>{product.type}</p>
                                </div>
                              </div>
                            </Link>
                            <i 
                              className="fa-solid fa-xmark deleteBtn" 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProduct(product.id);
                              }}
                            ></i>
                          </div> 
                        ))}
                    </div>
                </div>

                <div className='add-poster'>
                    <h2>اضف بوستر جديد</h2>

                    <div className='poster-info'>
                        <div className='name-price-section'>
                            <div>
                                <label htmlFor='posterName'>اسم البوستر:</label>
                                <input type='text' id='posterName' onChange={(e) => setNewPrName(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor='posterPrice'>السعر:</label>
                                <input type='number' id='posterPrice' onChange={(e) => setNewPrPrice(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor='posterSection'>القسم:</label>
                                <input type='text' id='posterSection' onChange={(e) => setNewPrSection(e.target.value)} />
                            </div>
                        </div>

                        <div className='description'>
                            <div>
                                <label htmlFor='posterDesc'>النص (اختياري):</label>
                                <input type='text' id='posterDesc' onChange={(e) => setNewPrDesc(e.target.value)} />
                            </div>
                        </div>

                        <div className='image'>
                            <label htmlFor='posterImage'>اختر صورة:</label>

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
                        </div>

                        <button className='btn' onClick={addProduct}>اضف البوستر</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AdminPage;