import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
  const axiosSecure=useAxiosSecure();
   const {user}=useAuth()
   //tanstackquery
   const {refetch,data:cart=[],isLoading}=useQuery({
      queryKey:['cart',user?.email],
      queryFn:async()=>{
         if (user?.email) {
                const res = await axiosSecure.get(`/carts?email=${user.email}`);
                return res.data;
            }
            return []; 
      }
   })
   return [cart,refetch,isLoading]
};

export default useCart;