

import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiShoppingCart, HiUserCircle } from 'react-icons/hi';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCarts';
import useAdmin from '../../../Hooks/useAdmin';
import SearchBar from './SearchBar';

const Header = () => {
  // মোবাইল মেন্যু খোলা বা বন্ধ করার জন্য State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [profile,setProfile]=useState(false)
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const handleLogOut = () => {
    logOut()
      .then(res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut successfully",
          showConfirmButton: false,
          timer: 1500
        });
      setProfile(false)
      })
  }
  // মেন্যু আইটেমগুলো একটি অ্যারেতে রাখা হয়েছে যাতে সহজে ম্যাপ করা যায়
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AllProduct', path: '/allProduct' },
    { name: 'Women', path: '/women' },
    { name: 'Men', path: '/men' },
    { name: 'Kids', path: '/kids' },
    { name: 'About Us', path: '/aboutUs' },
  ];


  return (
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <div className="flex-shrink-0">
            {/* লোগোর টেক্সট সাদা করা হয়েছে */}
            <Link to="/" className=" text-1xl md:text-2xl font-bold text-white">
              bdHubShoe
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  // অ্যাক্টিভ এবং হোভার স্টাইল পরিবর্তন করা হয়েছে
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive
                      ? 'bg-white/20 text-white' // অ্যাক্টিভ লিঙ্কের জন্য গ্লাসের মতো ইফেক্ট
                      : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="">
            <SearchBar></SearchBar>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* আইকনের রঙ পরিবর্তন করা হয়েছে */}
            {
              user ? <Link to={isAdmin ? '/dashboard/allUsers' : '/dashboard/myCart'} className="text-indigo-100 relative hover:text-white p-2 rounded-full hover:bg-white/10">
                <HiShoppingCart size={24} />
                <p className='absolute top-0 left-0 text-2xl font-bold text-red-600' >{cart?.length}</p>
              </Link> : <Link to='/login' className="text-indigo-100 relative hover:text-white p-2 rounded-full hover:bg-white/10">
                <HiShoppingCart size={24} />
                <p className='absolute top-0 left-0 text-2xl font-bold text-red-600' >0</p>
              </Link>
            }
            {
              user ? <div className='relative '>
                <div className=" ">
                  <div className="  cursor-pointer rounded-lg transition-colors">
                    <img onClick={()=>setProfile(!profile)}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                      src={user.photoURL}
                      alt=""
                    />
                  </div>

                </div>
              {
                profile&&  <div className="  py-5 px-4  bg-white shadow-2xl absolute rounded-md right-0 top-[70px]">
                  <h5 className='text-1xl '>Name:{user.displayName}</h5>
                  <h5 className='
                  text-1xl my-3'>Email:{user.email}</h5>
                  <button onClick={() => handleLogOut()} className='text-1xl border-1 cursor-pointer bg-red-800 rounded-md hover:text-white  hover:bg-white/10" px-2 py-1 text-white'>
                    LogOut</button>
                </div>
              }
              </div> : <button className='cursor-pointer text-2xl border-1 bg-blue-800 rounded-md  px-2 py-1 text-white'>  <Link to="/login" className="text-indigo-100 hover:text-white  hover:bg-white/10">
                Login
              </Link></button>
            }
          </div>

          <div className="md:hidden flex items-center">
            {
              user ? <Link to={isAdmin ? '/dashboard/allUsers' : '/dashboard/myCart'} className="text-indigo-100 relative hover:text-white p-2 rounded-full hover:bg-white/10">
                <HiShoppingCart size={24} />
                <p className='absolute top-0 left-0 text-2xl font-bold text-red-600' >{cart?.length}</p>
              </Link> : <Link to='/login' className="text-indigo-100 relative hover:text-white p-2 rounded-full hover:bg-white/10">
                <HiShoppingCart size={24} />
                <p className='absolute top-0 left-0 text-2xl font-bold text-red-600' >0</p>
              </Link>
            }
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // হ্যামবার্গার মেন্যুর রঙ পরিবর্তন
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* মোবাইল মেন্যু - গ্রেডিয়েন্টের সাথে মিলিয়ে স্টাইল করা হয়েছে */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive
                    ? 'bg-white/20 text-white'
                    : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:bg-white/10 hover:text-white">

            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;