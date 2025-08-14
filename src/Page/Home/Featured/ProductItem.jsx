import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCarts';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
// Framer Motion থেকে motion ইম্পোর্ট করা হয়েছে
import { motion } from 'framer-motion';

const ProductItem = ({ product }) => {
  // আপনার বিদ্যমান কোড অপরিবর্তিত রাখা হয়েছে
  const {user}=useAuth()
  const axiosSecure=useAxiosSecure();
  const [,refetch]=useCart();
  const location=useLocation();
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
      navigate('/login', { state: { from: location } })
    }
  }

  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    // মূল div-কে motion.div-এ পরিবর্তন করা হয়েছে এবং অ্যানিমেশন props যোগ করা হয়েছে
    <motion.div 
      className="rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      // কার্ড যখন স্ক্রিনে আসবে, তখন এই অ্যানিমেশনটি হবে
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      // মাউস হোভার করলে কার্ডটি হালকা উপরে উঠবে
      whileHover={{ scale: 1.03, y: -5 }}
    >
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
        <p className="text-xl font-semibold text-gray-900">${product.price}</p>
        <div className="flex justify-between items-center mt-4">
            <Link to={`product/${product._id}`}>
              {/* button-কে motion.button-এ পরিবর্তন করা হয়েছে */}
              <motion.button 
                className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Details
              </motion.button>
            </Link>
            {/* button-কে motion.button-এ পরিবর্তন করা হয়েছে */}
            <motion.button 
              onClick={()=>handleAddToCart(product._id)} 
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add To Card
            </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;