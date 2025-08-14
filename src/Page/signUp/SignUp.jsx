import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const from = location?.state?.from?.pathname || '/';
const SignUp = () => {
   // useForm hook থেকে প্রয়োজনীয় ফাংশন এবং অবজেক্ট নিন
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const [loading,setLoading]=useState(false)
   const { createUser, updateUserProfile, isLoading ,googleSignIn} = useContext(AuthContext)
   // ফর্ম সাবমিট হলে এই ফাংশনটি কাজ করবে
   const onSubmit = async (data) => {
      setLoading(true)
      // data.image[0] এর মাধ্যমে আপনি ইমেজ ফাইলটি পাবেন
      const imageFile = { image: data.image[0] }
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
         headers: {
            'content-type': 'multipart/form-data'
         }
      })
      const photo = res.data.data.display_url
      if (res.data.success) {
         createUser(data.email, data.password)
            .then(res => {
               updateUserProfile(data.name, photo)
                  .then(res => {
                     const userInfo = {
                        name: data.name,
                        email: data.email,
                        photo: photo
                     }
                     axiosPublic.post('/user', userInfo)
                        .then(res => {
                           if (res.data.insertedId) {
                              setLoading(false)
                              reset()
                              alert('users added success')
                               navigate(from,{replace:true})
                           }
                        })

                  })
            })


      }
   };
      const handleGoogleSingIn=()=>{
         googleSignIn()
         .then(res=>{
            navigate(from,{replace:true})
         })
      }
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

            {/* handleSubmit ফাংশন আপনার onSubmit ফাংশনকে কল করবে */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

               {/* Name Input */}
               <div>
                  <label htmlFor="name" className="text-sm font-semibold text-gray-600">Full Name</label>
                  <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaUser className="w-5 h-5 text-gray-400" />
                     </span>
                     <input
                        id="name"
                        type="text"
                        className="w-full p-3 pl-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                        {...register("name", { required: "Name is required" })}
                     />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
               </div>

               {/* Image Input */}
               <div>
                  <label htmlFor="image" className="text-sm font-semibold text-gray-600">Profile Picture</label>
                  <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaImage className="w-5 h-5 text-gray-400" />
                     </span>
                     <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="w-full p-3 pl-10 mt-1 text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("image", { required: "Profile picture is required" })}
                     />
                  </div>
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
               </div>

               {/* Email Input */}
               <div>
                  <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email Address</label>
                  <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaEnvelope className="w-5 h-5 text-gray-400" />
                     </span>
                     <input
                        id="email"
                        type="email"
                        className="w-full p-3 pl-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="example@email.com"
                        {...register("email", {
                           required: "Email is required",
                           pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Entered value does not match email format"
                           }
                        })}
                     />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
               </div>

               {/* Password Input */}
               <div>
                  <label htmlFor="password" name="password" className="text-sm font-semibold text-gray-600">Password</label>
                  <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaLock className="w-5 h-5 text-gray-400" />
                     </span>
                     <input
                        id="password"
                        type="password"
                        className="w-full p-3 pl-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        {...register("password", {
                           required: "Password is required",
                           minLength: {
                              value: 6,
                              message: "Password must have at least 6 characters"
                           }
                        })}
                     />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
               </div>

               {/* Submit Button */}
               <div>
                  <button
                     type="submit"
                     className={`${isLoading && 'disabled'} cursor-pointer w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300`}
                  >
                     SingUp
                     {
                       loading && <span className="loading ml-5 loading-spinner text-secondary">loading...</span>
                     }
                  </button>
               </div>
            </form>
            <div className="">
               <button onClick={()=>handleGoogleSingIn()} className='cursor-pointer w-full py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 flex justify-center items-center gap-2'><FaGoogle></FaGoogle> Google SingIn</button>
            </div>
            <p className='text-center text-1xl'>You Have All Ready Account Please <Link className='text-green-800' to={'/login'}>Login</Link></p>
         </div>
      </div>
   );
};

export default SignUp;