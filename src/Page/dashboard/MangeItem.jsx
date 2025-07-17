import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useProduct from '../../Hooks/useProduct';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Pagination from './../allProdect/Pagination';

// একটি Trash/Delete আইকন
const TrashIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
   </svg>
);

const MangeItem = () => {
   const [product, refetch, isLoading] = useProduct()
   //pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [itemPerpage, setItemPerpage] = useState(10)
   // Calculate total pages

   // Calculate the items for the current page
   const startIndex = (currentPage - 1) * itemPerpage;
   const endIndex = startIndex + itemPerpage;
   const currentItems = product.slice(startIndex, endIndex);
// Calculate total pages
  const totalPages = Math.ceil(product.length / 10);
   // Handler for changing the page
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };
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
            axiosSecure.delete(`/product/${id}`)
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
   if (isLoading) {
      return <><p>Loading...</p></>
   }
   return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="table w-full">
                {/* টেবিলের হেডার */}
                <thead className="bg-gray-50 text-sm uppercase text-gray-600">
                    <tr>
                        <th className="p-4 text-left">Index</th>
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-center">Action</th> {/* অ্যাকশন হেডার সেন্টারে */}
                    </tr>
                </thead>

                {/* টেবিলের বডি */}
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className="hover:bg-gray-50 border-b border-gray-200">
                            {/* Index কলাম (বাম দিকে অ্যালাইন) */}
                            <td className="p-4 font-semibold">{index + 1}</td>
                            
                            {/* Image কলাম (বাম দিকে অ্যালাইন) */}
                            <td className="p-4">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                </div>
                            </td>
                            
                            {/* Name কলাম (বাম দিকে অ্যালাইন) */}
                            <td className="p-4 font-bold text-gray-800">{item.name}</td>
                            
                            {/* Price কলাম (বাম দিকে অ্যালাইন) */}
                            <td className="p-4 font-medium text-gray-700">${item.price}</td>
                            
                            {/* Action কলাম (কন্টেন্ট সেন্টারে) */}
                            <td className="p-4 text-center">
                               <Link to={`/dashboard/updateProduct/${item._id}`}>
                                <button
                                    className="btn btn-ghost btn-sm text-blue-600"
                                >
                                    <FaEdit size={16} />
                                </button>
                               </Link>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-ghost btn-sm text-red-600 ml-2"
                                >
                                    <FaTrashAlt size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className=" ">
                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
         </div>
   );
};

export default MangeItem;



