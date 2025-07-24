import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCarts';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
const ProductCard = ({ product }) => {
    const axiosSecure=useAxiosSecure();
     const [,refetch]=useCart();
     const {user}=useAuth();
     const location=useLocation()
     const navigate=useNavigate()
     const handleAddToCart = (id) => {
       if (user && user?.email) {
         const cartItem = {
           productId: id,
           email: user.email,
           name:product.name,
           price:product.price
         }
         axiosSecure.post('/carts', cartItem)
           .then(res => {
             console.log(res.data);
             if (res.data.insertedId) {
               Swal.fire({
                 position: "top-center",
                 icon: "success",
                 title: "Your work has been saved",
                 showConfirmButton: false,
                 timer: 1500
               });
               refetch()
             }
           })
       } else {
         console.log('login');
         navigate('/login', { state: { from: location } })
       }
     }
 

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
              <p className="text-xl font-semibold text-gray-900">${product.price}</p>
            <div className="flex justify-between items-center mt-4 w-full">
             
               <Link to={`product/${product._id}`}><button className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                Details
                  
               </button></Link>
               <button onClick={()=>handleAddToCart(product._id)} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform active:scale-95">
                  Add To Card
                  
               </button>
               
            </div>
         </div>
      </div>
   );
};

export default ProductCard;