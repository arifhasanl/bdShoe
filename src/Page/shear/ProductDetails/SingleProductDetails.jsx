import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCarts';
import { Helmet } from 'react-helmet-async';

const SingleProductDetails = () => {

  //searchBar Product Show
  const [searchParams] = useSearchParams();
    const [searchData,setSearchData]=useState([])
    const query = searchParams.get('q'); // URL থেকে 'q' প্যারামিটারটি নেওয়া হচ্ছে
  console.log(searchData[0]);
    useEffect(() => {
  
      const fetchProducts = async () => {
          const response = await fetch(`https://bd-hub-server.vercel.app/products/search?q=${query}`);
          const data = await response.json();
          setSearchData(data);
      };
  
      fetchProducts();
    }, [query]); // যখনই URL-এর 'q' প্যারামিটার পরিবর্তন হবে, এই useEffect আবার চলবে
  
  console.log(searchData[0]);
  const { user } = useContext(AuthContext)
  const [selectedColor, setSelectedColor] = useState(searchData[0]?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null); // Initially no size is selected
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };
  const axiosSecure=useAxiosSecure();
  const [,refetch]=useCart()
  const handleAddToCart = () => {
    if (user && user?.email) {
      const cartItem = {
        productId: _id,
        email: user.email,
        name,
        price
      }
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
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
  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet><title>BdHub || ProductDetails</title></Helmet>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-8 rounded-lg shadow-lg">

          {/* 1. Image Gallery */}
          <div className="flex flex-col items-center">
            <img
              src={searchData[0]?.image}
              alt={searchData[0]?.name}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* 2. Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{searchData[0]?.name}</h1>
            <p className="text-lg text-gray-500 mb-4">{searchData[0]?.brand}</p>

            <div className="flex items-center mt-2">
              <span className="text-yellow-500">{renderRating(searchData[0]?.rating)}</span>
              <span className="text-gray-600 text-sm ml-2">({searchData[0]?.rating}.0)</span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-2 mb-6">

              <span className="text-3xl font-bold text-gray-900">${searchData[0]?.price}</span>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Color: <span className="font-normal">{selectedColor}</span></h3>
              <div className="flex space-x-2">
                {searchData[0]?.colors.map(color => (
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
                {searchData[0]?.sizes.map(size => (
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
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* 3. Description and Reviews Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
          <p className="text-gray-600 leading-relaxed">{searchData[0]?.description}</p>

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

export default SingleProductDetails;