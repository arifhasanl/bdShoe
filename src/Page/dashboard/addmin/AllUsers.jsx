import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaUserShield, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'; // সুন্দর অ্যালার্টের জন্য

const AllUsers = () => {
   const axiosSecure = useAxiosSecure();

   // React Query দিয়ে ডেটা ফেচ করা
   const { data: users = [], refetch, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
         const res = await axiosSecure.get('/users');
         return res.data;
      }
   });

   // ব্যবহারকারীকে ডিলিট করার হ্যান্ডলার
   const handleDelete = (user) => {
      Swal.fire({
         title: "Are you sure?",
         text: `Do you want to delete ${user.name}?`,
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Yes, delete it!"
      }).then((result) => {
         if (result.isConfirmed) {
            axiosSecure.delete(`/users/${user._id}`)
               .then(res => {
                  if (res.data.deletedCount > 0) {
                     refetch(); // ডেটা রিলোড করার জন্য
                     Swal.fire({
                        title: "Deleted!",
                        text: `${user.name} has been removed.`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                     });
                  }
               });
         }
      });
   };

   // ব্যবহারকারীকে অ্যাডমিন বানানোর হ্যান্ডলার
   const handleMakeAdmin = (user) => {
      axiosSecure.patch(`/users/admin/${user._id}`)
         .then(res => {
            if (res.data.modifiedCount > 0) {
               refetch();
               Swal.fire({
                  title: "Success!",
                  text: `${user.name} is now an Admin.`,
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false
               });
            }
         });
   };

   // লোডিং স্টেট
   if (isLoading) {
      return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>
   }

   // এরর স্টেট
   if (error) {
      return <div className="text-center text-red-500 mt-10">Failed to load users. Please try again later.</div>
   }

   return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
         {/* হেডার এবং স্ট্যাটাস কার্ড */}
         <div className="mb-8">
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4'>User Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                     <FaUsers className="h-8 w-8" />
                  </div>
                  <div>
                     <p className="text-slate-500 text-lg">Total Users</p>
                     <p className="text-3xl font-bold text-slate-900">{users.length}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* ইউজার লিস্ট */}
         <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* ডেস্কটপের জন্য টেবিল হেডার */}
            <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-slate-100 font-semibold text-slate-600 border-b">
               <div className="col-span-1">#</div>
               <div className="col-span-3">Name</div>
               <div className="col-span-4">Email</div>
               <div className="col-span-2">Role</div>
               <div className="col-span-2 text-center">Action</div>
            </div>

            {/* ইউজারদের তালিকা */}
            <div className="divide-y divide-slate-100">
               {users.map((user, index) => (
                  <div key={user._id} className="grid grid-cols-1 md:grid-cols-12 p-4 md:px-6 md:py-4 items-center hover:bg-slate-50 transition-colors">
                     
                     {/* সিরিয়াল নম্বর */}
                     <div className="md:col-span-1 mb-2 md:mb-0">
                        <span className="font-bold md:hidden">No: </span>
                        <span>{index + 1}</span>
                     </div>

                     {/* নাম */}
                     <div className="md:col-span-3 mb-2 md:mb-0">
                        <span className="font-bold md:hidden">Name: </span>
                        <span className="font-semibold text-slate-800">{user.name}</span>
                     </div>

                     {/* ইমেইল */}
                     <div className="md:col-span-4 mb-2 md:mb-0">
                         <span className="font-bold md:hidden">Email: </span>
                         <span className="text-slate-500 break-all">{user.email}</span>
                     </div>

                     {/* রোল */}
                     <div className="md:col-span-2 mb-4 md:mb-0">
                        <span className="font-bold md:hidden mr-2">Role: </span>
                        {user.role === 'admin' ? (
                           <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                              <FaUserShield /> Admin
                           </span>
                        ) : (
                           <button onClick={() => handleMakeAdmin(user)} className="p-2 rounded-full text-green-600 bg-green-100 hover:bg-green-200 transition-colors" title="Make Admin">
                              <FaUserShield className="h-5 w-5" />
                           </button>
                        )}
                     </div>

                     {/* অ্যাকশন বাটন */}
                     <div className="md:col-span-2 flex justify-end md:justify-center">
                        <button onClick={() => handleDelete(user)} className="p-2 rounded-full text-red-600 bg-red-100 hover:bg-red-200 transition-colors" title="Delete User">
                           <FaTrashAlt className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            {/* কোনো ইউজার না থাকলে */}
            {users.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                    <p className="text-xl">No users found.</p>
                </div>
            )}
         </div>
      </div>
   );
};

export default AllUsers;