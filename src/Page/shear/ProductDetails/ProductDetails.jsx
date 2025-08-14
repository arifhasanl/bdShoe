import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCarts';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const [isAdding, setIsAdding] = useState(false);
  //searchBar Product Show
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState('')
  const query = searchParams.get('q'); // URL থেকে 'q' প্যারামিটারটি নেওয়া হচ্ছে
  const navigate=useNavigate()
  useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch(`https://bd-hub-server.vercel.app/products/search?q=${query}`);
      const data = await response.json();
      setSearchData(data);
    };

    fetchProducts();
  }, [query]); // যখনই URL-এর 'q' প্যারামিটার পরিবর্তন হবে, এই useEffect আবার চলবে

  console.log(searchData, 'searchData');
  const { user } = useContext(AuthContext)
  const { image, name, brand, rating, colors, sizes, price, description, _id } = useLoaderData();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(null); // Initially no size is selected
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart()
  const handleAddToCart = () => {
    setIsAdding(true)
    if (user && user?.email) {
      const cartItem = {
        productId: _id,
        email: user.email,
        name,
        price
      }
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data.insertedId) {
            navigate('/dashboard/myCart')
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${name} added to cart!`,
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
  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet><title>BdHub || ProductDetails</title></Helmet>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-8 rounded-lg shadow-lg">

          {/* 1. Image Gallery */}
          <div className="flex flex-col items-center">
            <img
              src={image}
              alt={name}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* 2. Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{name}</h1>
            <p className="text-lg text-gray-500 mb-4">{brand}</p>

            <div className="flex items-center mt-2">
              <span className="text-yellow-500">{renderRating(rating)}</span>
              <span className="text-gray-600 text-sm ml-2">({rating}.0)</span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-2 mb-6">

              <span className="text-3xl font-bold text-gray-900">${price}</span>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Color: <span className="font-normal">{selectedColor}</span></h3>
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={`Select color ${color}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors duration-200 ${selectedSize === size
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={() => handleAddToCart(_id)}
              disabled={isAdding ||!selectedSize}
               // লোডিং অবস্থায় বাটনটি নিষ্ক্রিয় থাকবে
              className={`flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed justify-center text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${isAdding
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

        {/* 3. Description and Reviews Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>

          <div className="mt-8 border-t pt-8">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews & Ratings</h2>
            <div className="space-y-6">
              {reviews?.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-gray-800 mr-4">{review.user}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;