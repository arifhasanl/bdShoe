import React from 'react';
import Banner from '../Banner/Banner';
import Featured from '../Featured/Featured';
import Category from '../Category/Category';
import BrandProduct from '../Brand/BrandProduct';
import Footer from '../../shear/Footer/Footer';

const Home = () => {
   return (
      <div>
         <Banner></Banner>
         <Featured></Featured>
         <Category></Category>
         <BrandProduct></BrandProduct>
         <Footer></Footer>
      </div>
   );
};

export default Home;