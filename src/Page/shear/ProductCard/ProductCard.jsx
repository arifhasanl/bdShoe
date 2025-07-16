import React from 'react';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {

   const handleAddToCart = () => {
      // Optionally, show a success message or notification
   };

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
         </div>
         <div className="p-4">
            <span className="text-xs text-gray-500 uppercase font-semibold">{product.category}</span>
            <h4 className="text-lg font-bold text-gray-800 truncate mt-1">{product.name}</h4>
            <div className="flex items-center mt-2">
               <span className="text-yellow-500">{renderRating(product.rating)}</span>
               <span className="text-gray-600 text-sm ml-2">({product.rating}.0)</span>
            </div>
            <div className="flex justify-between items-center mt-4">
               <p className="text-xl font-semibold text-gray-900">${product.price}</p>
               <Link to={`product/${product._id}`}><button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform active:scale-95">
                  Product Details
                  
               </button></Link>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;