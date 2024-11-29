import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

const Home = () => {
  const userId = useSelector((state) => state.user.userId); 
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [notPurchasedProducts, setNotPurchasedProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const purchaseResponse = await fetch('./purchase_history.csv');
        const purchaseText = await purchaseResponse.text();
        const purchaseHistory = [];
        Papa.parse(purchaseText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            results.data.forEach(({ UserID, ProductID }) => {
              if (parseInt(UserID, 10) === userId) {
                purchaseHistory.push(ProductID.trim());
              }
            });
          },
        });

        const productResponse = await fetch('./products.csv');
        const productText = await productResponse.text();
        const allProducts = [];
        Papa.parse(productText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            results.data.forEach((product) => {
              allProducts.push({
                ...product,
                ProductID: product.ProductID.trim(),
              });
            });
          },
        });

        const purchasedSet = new Set(purchaseHistory);
        const purchased = allProducts.filter((product) => purchasedSet.has(product.ProductID));
        const notPurchased = allProducts.filter((product) => !purchasedSet.has(product.ProductID));

        setPurchasedProducts(purchased);
        setNotPurchasedProducts(notPurchased);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    if (userId) {
      loadData();
    }
  }, [userId]);

  if (!userId) {
    return <div>Please log in to view your products.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 pb-20">
        <div className="w-full mb-10">
          <h2 className="text-2xl font-bold ml-10 md:ml-28 mb-5">Products You Haven't Purchased</h2>
          <div className="flex flex-wrap items-center justify-center lg:gap-10 lg:mx-4 gap-3 mx-2">
            {notPurchasedProducts.map((product) => (
              <ProductCard
                key={product.ProductID}
                image={product.ImageURL}
                name={product.ProductName}
                category={product.Category}
                price={product.Price}
              />
            ))}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-bold ml-10 md:ml-28 mb-5">Products You've Purchased</h2>
          <div className="flex flex-wrap items-center justify-center lg:gap-10 lg:mx-4 gap-3 mx-2">
            {purchasedProducts.map((product) => (
              <ProductCard
                key={product.ProductID}
                image={product.ImageURL}
                name={product.ProductName}
                category={product.Category}
                price={product.Price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
