import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaShoppingBag, FaUser, FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import useAdmin from '../Hooks/useAdmin';
import useCart from '../Hooks/useCarts';

const Dashboard = () => {
   const [isSidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar
   const [isAdmin, isAdminLoading] = useAdmin();
   const [, ,isLoading] = useCart()
   // // console.log(isAdmin);
   // const isAdmin=true

   // Common NavLink styles
   const navLinkClasses = ({ isActive }) =>
      `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-colors duration-200 ${isActive
         ? 'bg-slate-900 text-white' // Active link style
         : 'text-slate-300 hover:bg-slate-700 hover:text-white' // Inactive link style
      }`;

   const sidebarContent = (
      <>
         <div className="p-4 mb-4 border-b border-slate-700">
            <NavLink to="/" className="text-2xl font-bold text-white">
               BdHubShoe
            </NavLink>
         </div>
         <ul className='flex flex-col gap-2 px-4'>
            {isAdmin ? (
               <>
                  <li><NavLink to='/dashboard/adminHome' className={navLinkClasses}><FaHome /> Admin Home</NavLink></li>
                  <li><NavLink to='/dashboard/addItem' className={navLinkClasses}><FaUtensils /> Add Items</NavLink></li>
                  <li><NavLink to='/dashboard/mangeItem' className={navLinkClasses}><FaList /> Manage Items</NavLink></li>
                  <li><NavLink to='/dashboard/allUsers' className={navLinkClasses}><FaUser /> All Users</NavLink></li>
               </>
            ) : (
               <>
                  <li><NavLink to='/dashboard/userHome' className={navLinkClasses}><FaHome />Users Home</NavLink></li>
                  <li><NavLink to='/dashboard/mangeBooking' className={navLinkClasses}><FaBook /> Manage Bookings</NavLink></li>
                  <li><NavLink to='/dashboard' className={navLinkClasses}><FaAd /> Add Review</NavLink></li>
                  <li><NavLink to='/dashboard/myCart' className={navLinkClasses}><FaShoppingBag /> My Cart</NavLink></li>
               </>
            )}

            {/* Shared NavLinks */}
            <div className="my-4 border-t border-slate-700"></div>
            <li><NavLink to='/' className={navLinkClasses}><FaHome /> Home</NavLink></li>
            <li><NavLink to='/allProduct' className={navLinkClasses}><FaList /> All Product</NavLink></li>
         </ul>
      </>
   );
   if (isAdminLoading || isLoading) {
      return (
         <div className="">
            <p className='w-full h-svh flex justify-center items-center'>Loading...</p>
         </div>
      )
   }
   return (
      <div className="container mx-auto">
         <div className='relative flex min-h-screen bg-slate-100'>
            {/* Mobile Sidebar Toggle Button */}
            <button
               className="md:hidden fixed top-4 left-4 z-30 p-2 bg-slate-800 text-white rounded-md"
               onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
               {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar for Desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-800">
               {sidebarContent}
            </div>

            {/* Sidebar for Mobile (sliding) */}
            <div
               className={`md:hidden fixed inset-y-0 left-0 z-20 w-64 bg-slate-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  } transition-transform duration-300 ease-in-out`}
            >
               {sidebarContent}
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
               <div className="p-4 md:p-8">
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;