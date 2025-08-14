import React from 'react';
import useCart from '../../../Hooks/useCarts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// একটি Trash/Delete আইকন
const TrashIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
   </svg>
);

const MyCart = () => {
   const [cart, refetch, isLoading] = useCart();
   const axiosSecure = useAxiosSecure();
   const handleDelete = (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then((result) => {
         if (result.isConfirmed) {
            axiosSecure.delete(`/carts/${id}`)
               .then(res => {
                  if (res.data.deletedCount > 0) {
                     Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                     });
                     refetch()
                  }
               })
         }
      });
   }
   const totalPrice = cart.reduce((total, item) => total + item.price, 0);
   if (cart.length === 0) {
      return (
         <div className="flex h-64 items-center justify-center rounded-lg bg-white p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-500">No Product In This Your Carts</h2>
         </div>
      );
   }
   return (
      <div className="w-full max-w-4xl mx-auto">
         <h2 className='text-center text-2xl md:text-4xl font-bold text-gray-600 mb-10'>All Added Carts</h2>
         <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full min-w-full text-sm">
               <thead className="hidden bg-gray-50 text-gray-600 md:table-header-group">
                  <tr>
                     <th className="py-3 px-6 text-left font-semibold"> Name</th>
                     <th className="py-3 px-6 text-left font-semibold">Email</th>
                     <th className="py-3 px-6 text-left font-semibold">Price</th>
                     <th className="py-3 px-6 text-center font-semibold">Action</th>
                  </tr>
               </thead>

               {/* টেবিলের বডি */}
               <tbody className="divide-y divide-gray-200 md:divide-none">
                  {cart.map((item) => (
                     // প্রতিটি আইটেম মোবাইল ভিউতে একটি কার্ড এবং ডেস্কটপ ভিউতে একটি টেবিল রো
                     <tr
                        key={item.id}
                        className="block p-4 mb-4 bg-white rounded-lg shadow-md md:table-row md:p-0 md:mb-0 md:shadow-none md:border-b"
                     >
                        {/* Product Name */}
                        <td className="flex justify-between py-2 md:table-cell md:py-4 md:px-6">
                           <span className="font-bold md:hidden">Name:</span>
                           <span>{item.name}</span>
                        </td>

                        {/* Email */}
                        <td className="flex justify-between py-2 md:table-cell md:py-4 md:px-6">
                           <span className="font-bold md:hidden">Email:</span>
                           <span className="text-gray-600">{item.email}</span>
                        </td>

                        {/* Price */}
                        <td className="flex justify-between py-2 md:table-cell md:py-4 md:px-6">
                           <span className="font-bold md:hidden">Price:</span>
                           <span className="font-medium text-green-600">${item.price}</span>
                        </td>

                        {/* Action Button */}
                        <td className="flex justify-end pt-4 md:table-cell md:py-4 md:px-6 md:text-center">
                           <button
                              onClick={() => handleDelete(item._id)}
                              className="flex items-center gap-1 rounded-md bg-red-500 py-2 px-3 text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                              aria-label={`Delete ${item.name}`}
                           >
                              <TrashIcon />
                              <span className="hidden sm:inline">Delete</span>
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* মোট মূল্য দেখানোর সেকশন */}
         <div className="mt-6 flex justify-end rounded-lg bg-white p-4 shadow-md">
            <div className="text-right">
               <p className="text-lg text-gray-600">Total Price:</p>
               <p className="text-2xl font-bold text-black">${totalPrice.toFixed(2)}</p>
            </div>
         </div>
        <Link to={'/dashboard/mangeBooking'}> <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
         >
            Order Now
         </button></Link>
      </div>
   );
};

export default MyCart;

