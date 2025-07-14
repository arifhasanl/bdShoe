import React from 'react';

const ProductItem = ({product}) => {
   console.log(product);
   // Simple star rating display logic
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="border rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {product.tags.includes('new-arrival') && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              NEW
            </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-500 uppercase font-semibold">{product.category}</span>
        <h4 className="text-lg font-bold text-gray-800 truncate mt-1">{product.name}</h4>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">{renderRating(product.rating)}</span>
          <span className="text-gray-600 text-sm ml-2">({product.rating}.0)</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;