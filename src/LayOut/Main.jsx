import React from 'react';
import Header from '../Page/shear/header/Header';
import { Outlet } from 'react-router-dom';
import useProduct from '../Hooks/useProduct';

const Main = () => {
   // const [products,,isLoading]=useProduct()
   // if(isLoading){
   //    return(
   //       <div className="">
   //          <p className='w-full h-svh flex justify-center items-center'>Loading...</p>
   //       </div>
   //    )
   // }
   return (
      <div>
         <Header></Header>
         <Outlet></Outlet>
      </div>
   );
};

export default Main;