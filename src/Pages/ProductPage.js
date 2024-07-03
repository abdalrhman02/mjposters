// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductCom from '../Components/ProductCom';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getDoc ,addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseconfig';

function ProductPage() {
    // For More Posters (get the posters randomly)
    const [productsList, setProductsList] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const productsCollection = collection(db, "products");

    const getRandomProducts = (products) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        let selectedProducts = shuffled.slice(0, 4);
        setRandomProducts(selectedProducts);
    };
    const getProductsList = async () => {
        try {
            const data = await getDocs(productsCollection);
            const products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProductsList(products);

            getRandomProducts(products);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };
    useEffect(() => {
        getProductsList();
    }, []);
    

    // Display Poster Details
    const { id } = useParams();
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      const getProductDetails = async () => {
        const productDoc = doc(db, 'products', id);
        const productData = await getDoc(productDoc);
        if (productData.exists()) {
          setProduct({ ...productData.data(), id: productData.id });
        }
      };
  
      getProductDetails();
    }, [id]);
  
    if (!product) {
      return <p>Loading...</p>;
    }
    
    return (
        <>
            <Header />

            <ProductCom
                prName={product.name}
                prPrice={product.price}
                prType={product.type}
                prDescription={product.description}
                prImg={product.imageUrl}
            />

            <div className='more-posters'>
                <div className='center-title'>
                    <h2>بوسترات اخرى</h2>
                    <div className='title-line'></div>
                </div>

                <div className='posters'>
                    {randomProducts.map((product) => (
                        <Link to={`/product/${product.id}`}>
                            <div className='poster' key={product.id}>
                                <img src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
                                <h3 className='poster-name'>{product.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        
            <Footer />
        </>
    )
}

export default ProductPage;