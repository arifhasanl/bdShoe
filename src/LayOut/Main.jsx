import React from 'react';
import Header from '../Page/shear/header/Header';
import { Outlet } from 'react-router-dom';
import useProduct from '../Hooks/useProduct';
import Footer from './../Page/shear/Footer/Footer';

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
         <Footer></Footer>
      </div>
   );
};

export default Main;