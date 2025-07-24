import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';
import useProduct from '../Hooks/useProduct';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../Hooks/useAxiosPublic';
const Login = () => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const { signIn } = useContext(AuthContext);
   const [product] = useProduct();
   const location = useLocation();
   const navigate = useNavigate();
   const from = location?.state?.from?.pathname || '/';
   const onSubmit = async (data) => {
      const axiosPublic = useAxiosPublic();
      signIn(data.email, data.password)
         .then(res => {
            // const userInfo = {
            //    name: data.name,
            //    email: data.email,
            //    photo: photo
            // }
            // axiosPublic.post('/user', userInfo)
            //    .then(res => {
            //       if (res.data.insertedId) {
            //          reset()
            //          navigate(from, { replace: true })
            //       }
            //    })
            reset()
            navigate(from, { replace: true })
         })
   }
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <Helmet>
            <title>BdHub || Login</title>
         </Helmet>
         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

            {/* handleSubmit ফাংশন আপনার onSubmit ফাংশনকে কল করবে */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">



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
                     className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                  >
                     Login
                  </button>
               </div>
            </form>
            <p className='text-center text-1xl'>Are You New Please <Link className='text-green-800' to={'/signUp'}>SignUp</Link></p>
         </div>

      </div>
   );
};

export default Login;