import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useProduct from '../../../Hooks/useProduct';
import CategoryItem from '../Category/CategoryItem';
import 'react-tabs/style/react-tabs.css';
const BrandProduct = () => {
   const [product, isLoading] = useProduct();
   const [tabIndex, setTabIndex] = useState(0);

   const Adidas = product?.filter(item => item.brand === 'Adidas')
   const Bata = product?.filter(item => item.brand === 'Bata')
   const Timberland = product?.filter(item => item.brand === 'Timberland')
   const Clarks = product?.filter(item => item.brand === 'Clarks')
   const Birkenstock = product?.filter(item => item.brand === 'Birkenstock')
   const Puma = product?.filter(item => item.brand === 'Puma')
   const Apex = product?.filter(item => item.brand === 'Apex')
   const Gucci = product?.filter(item => item.brand === 'Gucci')



   if (isLoading) {
      return (
         <div className="text-center py-16">
            <p className="text-lg font-semibold">Loading Categories...</p>
         </div>
      );
   }
   return (
      <section className="bg-white py-16">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                  Our Popular Brands
               </h2>
            </div>
            <div className="">
               <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

                  <TabList className='mb-10'>
                     <Tab>Adidas</Tab>
                     <Tab>Bata</Tab>
                     <Tab>Timberland</Tab>
                     <Tab>Clarks</Tab>
                     <Tab>Birkenstock</Tab>
                     <Tab>Apex</Tab>
                     <Tab>Puma</Tab>
                     <Tab>Gucci</Tab>
                  </TabList>
                  <TabPanel>
                     <CategoryItem product={Adidas}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Bata}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Timberland}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Clarks}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Birkenstock}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                   
                     <CategoryItem product={Apex}></CategoryItem>
                  
                  </TabPanel>
                  <TabPanel>
                      <CategoryItem product={Puma}></CategoryItem>
                   
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Gucci}></CategoryItem>
                  </TabPanel>

               </Tabs>
            </div>
         </div>
      </section>
   );
};

export default BrandProduct;