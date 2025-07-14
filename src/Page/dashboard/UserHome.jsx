import React, { useState } from 'react';
import { FaShoppingCart, FaBoxOpen, FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// এখানে আপনার ডেমো ডেটা পেস্ট করুন অথবা ইম্পোর্ট করুন
const purchaseHistory = [
  // উপরের ডেটা অ্যারেটি এখানে পেস্ট করুন
  { orderId: 'ORD-2023-A5B1', date: '2023-10-25', totalAmount: 240.00, status: 'Delivered', items: [{ productId: 1, name: 'Nike Air Zoom Pegasus', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', price: 120.00, quantity: 2 }] },
  { orderId: 'ORD-2023-C9D2', date: '2023-09-12', totalAmount: 245.00, status: 'Delivered', items: [{ productId: 2, name: 'Adidas Ultraboost 22', image: 'https://images.unsplash.com/photo-1595950653106-6090ee36959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', price: 180.00, quantity: 1 }, { productId: 3, name: 'Puma Suede Classic', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', price: 65.00, quantity: 1 }] },
  { orderId: 'ORD-2023-E3F4', date: '2023-08-01', totalAmount: 130.00, status: 'Cancelled', items: [{ productId: 4, name: 'Salomon Speedcross 5', image: 'https://images.unsplash.com/photo-1593579306692-44a391c5a774?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', price: 130.00, quantity: 1 }] }
];


const UserHome = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // কোন অর্ডারটি খোলা আছে তা টগল করার জন্য হ্যান্ডলার
  const handleToggleDetails = (orderId) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  // সারসংক্ষেপের জন্য ডেটা গণনা
  const totalOrders = purchaseHistory.length;
  const totalSpent = purchaseHistory.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalItems = purchaseHistory.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  const stats = [
    { title: 'Total Orders', value: totalOrders, icon: <FaShoppingCart className="h-8 w-8" />, color: 'blue' },
    { title: 'Total Items Purchased', value: totalItems, icon: <FaBoxOpen className="h-8 w-8" />, color: 'green' },
    { title: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: <FaDollarSign className="h-8 w-8" />, color: 'purple' },
  ];
  
  // স্ট্যাটাস অনুযায়ী ব্যাজের রঙ নির্ধারণ
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* হেডার */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Your Activity Summary</h1>
        <p className="mt-2 text-lg text-gray-500">Here's a look at all your past purchases.</p>
      </header>

      {/* সারসংক্ষেপ কার্ড */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
            <div className={`p-4 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-lg">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* কেনাকাটার ইতিহাস */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Purchase History</h2>
        <div className="space-y-4">
          {purchaseHistory.length > 0 ? (
            purchaseHistory.map(order => (
              <div key={order.orderId} className="bg-white rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md">
                {/* অর্ডারের সংক্ষিপ্ত ভিউ (রেসপন্সিভ গ্রিড) */}
                <div 
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 p-5 items-center cursor-pointer"
                  onClick={() => handleToggleDetails(order.orderId)}
                >
                  <div className="md:col-span-1">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-indigo-600">{order.orderId}</p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div className="md:col-span-1">
                     <p className="text-sm text-gray-500">Status</p>
                     <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                     </span>
                  </div>
                  <div className="md:col-span-1 text-left md:text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-lg">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex justify-end items-center">
                    <button className="text-gray-500 hover:text-gray-800">
                      {expandedOrderId === order.orderId ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                {/* অর্ডারের বিস্তারিত ভিউ (এক্সপান্ডেবল) */}
                {expandedOrderId === order.orderId && (
                  <div className="border-t border-gray-200 bg-gray-50/50 p-5">
                    <h4 className="text-md font-semibold mb-4 text-gray-600">Items in this order:</h4>
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.productId} className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-grow">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <p className="text-xl text-gray-500">You haven't made any purchases yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserHome;