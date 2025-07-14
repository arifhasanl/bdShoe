import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useProduct = () => {
  const axiosPublic=useAxiosPublic()
  const {data:products=[],isLoading,refetch}=useQuery({
   queryKey:['product'],
   queryFn:async()=>{
      const res=await axiosPublic.get('/product');
      return res.data
   }
  
  })
  return [products,refetch,isLoading]
};

export default useProduct;