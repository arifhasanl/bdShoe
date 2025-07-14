import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2'; // For beautiful alerts
import useCart from '../../Hooks/useCarts';

// Demo product data
const productData = {
  id: 5,
  name: 'Premium Leather Watch',
  brand: 'Timeless Co.',
  price: 250.00,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  description: 'A classic timepiece with genuine leather strap and stainless steel case. Perfect for any occasion.'
};

const MangeBooking = () => {
  // State to hold form data
  const [cart]=useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States', // Default value
    paymentMethod: 'creditCard'
  });

  // State to hold the product quantity
  const [quantity, setQuantity] = useState(1);

  // Handler for input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };



  // Dynamic calculations for the order summary
  const subtotal =cart.reduce((total, item) => total + item.price, 0);
  const shipping = 10.00; // Fixed shipping cost
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = {
      product: cart,
      customerInfo: formData,
      orderSummary: {
        subtotal,
        shipping,
        tax,
        total,
      },
      orderDate: new Date().toISOString()
    };
    
    console.log('Order Submitted:', orderDetails);
    
    // Display a beautiful confirmation message
    Swal.fire({
      icon: 'success',
      title: 'Order Placed Successfully!',
      text: `Thank you for your purchase, ${formData.name}.`,
      timer: 3000,
      showConfirmButton: false
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Complete Your Order</h1>
        
        <form onSubmit={handleSubmit} className="lg:flex lg:gap-12">
          {/* Left Column: Shipping and Payment Details */}
          <div className="lg:w-2/3">
            {/* Shipping Details Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                {/* You can add other fields like City, Postal Code, Country here */}
              </div>
            </div>

            {/* Payment Details Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">Payment Method</h2>
              <div className="space-y-4">
                 {/* You can add payment options (e.g., Radio buttons for Credit Card, PayPal) here */}
                 <p className="text-gray-500">Payment integration would be here.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (Sticky on desktop) */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-8">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">Order Summary</h2>
              
              {/* Product Details */}
             {
               cart?.map(item=><>
                <div className="flex gap-4 mb-6">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="font-semibold text-gray-800 mt-2">${item.price.toFixed(2)}</p>
                </div>
              </div>
               </>)
             }

              {/* Price Calculation */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
                <div className="flex justify-between"><p>Shipping</p><p>${shipping.toFixed(2)}</p></div>
                <div className="flex justify-between text-gray-500"><p>Tax (5%)</p><p>${tax.toFixed(2)}</p></div>
                <div className="flex justify-between text-xl font-bold border-t pt-3 mt-3">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Submit Button */}
              <button type="submit" className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-indigo-500/50">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MangeBooking;