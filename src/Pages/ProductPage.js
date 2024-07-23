import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductCom from '../Components/ProductCom';

function ProductPage() {
  const [productsList, setProductsList] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [favoritePosters, setFavoritePosters] = useState([]);
  const productsCollection = collection(db, 'products');

  const getRandomProducts = (products) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 4);
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

  const addToFavorites = (product) => {
    setFavoritePosters([...favoritePosters, product]);
    // You may want to store this in Firebase or local storage for persistence
  };

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favoritePosters.filter(
      (product) => product.id !== productId
    );
    setFavoritePosters(updatedFavorites);
    // Update Firebase or local storage as needed
  };

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
        productId={product.id}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        isFavorite={favoritePosters.some((fav) => fav.id === product.id)}
      />

      <div className="more-posters">
        <div className="center-title">
          <h2>بوسترات اخرى</h2>
          <div className="title-line"></div>
        </div>
        <div className="posters">
          {randomProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="poster">
                <img
                  src={product.imageUrl + '?alt=media'}
                  alt={`Product ${product.id}_${product.name}`}
                />
                <h3 className="poster-name">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;