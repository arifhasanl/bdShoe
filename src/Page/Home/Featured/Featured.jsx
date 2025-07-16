import React, { useMemo } from 'react';
import useProduct from '../../../Hooks/useProduct';
import ProductItem from './ProductItem';

const Featured = () => {
   const [product,,isLoading]=useProduct();
   console.log(product);
  // Filter products using useMemo for performance
  const bestSellers =  product.filter(p => p.tags.includes('best-seller')).slice(0, 5)
    

  const newArrivals = product.filter(p => p.tags.includes('new-arrival')).slice(0, 5)
   

   if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-semibold">Loading Categories...</p>
      </div>
    );
  }
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Main Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Featured Products
        </h2>

        {/* Best Sellers Subsection */}
        <div>
          <h3 className="text-3xl font-bold text-gray-700 mb-8">Best Sellers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {bestSellers.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* New Arrivals Subsection */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-700 mb-8">New Arrivals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {newArrivals.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Featured;