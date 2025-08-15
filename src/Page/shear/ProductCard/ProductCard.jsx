import React, { useState } from 'react'; // useState ইম্পোর্ট করা হয়েছে
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCarts';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { p } from 'framer-motion/client';

const ProductCard = ({ product }) => {
    // লোডিং অবস্থা ট্র্যাক করার জন্য নতুন state
    const [isAdding, setIsAdding] = useState(false);
    // আপনার বাকি কোড অপরিবর্তিত
    const axiosSecure=useAxiosSecure();
    const [,refetch]=useCart();
    const {user}=useAuth();
    const location=useLocation()
    const navigate=useNavigate()

    // handleAddToCart ফাংশনটি আপডেট করা হয়েছে
    const handleAddToCart = (id) => {
      if (user && user?.email) {
        // যদি ஏற்கனவே লোড হতে থাকে, তাহলে ফাংশন থেকে বের হয়ে যাবে
        if (isAdding) return;

        setIsAdding(true); // লোডিং অবস্থা শুরু

        const cartItem = {
          productId: id,
          email: user.email,
          name:product.name,
          price:product.price
        }

        axiosSecure.post('/carts', cartItem)
          .then(res => {
            if (res.data.insertedId) {
               navigate('/dashboard/myCart')
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${product.name} added to cart!`,
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
            }
          })
          .catch(error => {
            console.error("Failed to add to cart:", error);
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Could not add to cart.",
                showConfirmButton: false,
                timer: 1500
            });
          })
          .finally(() => {
            setIsAdding(false); // লোডিং অবস্থা শেষ
          });

      } else {
        console.log('login');
        navigate('/login', { state: { from: location } })
      }
    }
 

   const renderRating = (rating) => {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
   };

   return (
      <motion.div 
         className=" rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.5 }}
         whileHover={{ scale: 1.03 }}
      >
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
             
               <Link to={`product/${product?._id}`}>
                  <motion.button 
                     className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     Details
                  </motion.button>
               </Link>

               {/* "Add To Cart" বাটনটি আপডেটেড */}
               <motion.button 
                  onClick={()=>handleAddToCart(product._id)} 
                  disabled={isAdding} // লোডিং অবস্থায় বাটনটি নিষ্ক্রিয় থাকবে
                  className={`flex items-center  justify-center text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                     isAdding 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  whileHover={{ scale: isAdding ? 1 : 1.05 }} // লোডিং অবস্থায় হোভার ইফেক্ট বন্ধ
                  whileTap={{ scale: isAdding ? 1 : 0.95 }} // লোডিং অবস্থায় ট্যাপ ইফেক্ট বন্ধ
               >
                  {isAdding ? (
                     <>
                        {/* লোডিং স্পিনার */}
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                     </>
                  ) : (
                     <><p className='cursor-pointer'>Add To Cart</p></>
                  )}
               </motion.button>
               
            </div>
         </div>
      </motion.div>
   );
};

export default ProductCard;