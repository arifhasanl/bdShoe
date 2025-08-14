import React, { useState } from 'react';
import useProduct from '../../../Hooks/useProduct';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryItem from './CategoryItem';
import 'react-tabs/style/react-tabs.css';
import { motion } from 'framer-motion';
const Category = () => {
   const [product, , isLoading] = useProduct();
   const categories = ['Sneakers', 'Formal', 'Boots', 'Loafers', 'Sandals', 'Hiking'];
   const indexCategory = categories.indexOf('Sneakers');
   console.log(indexCategory);
   const [tabIndex, setTabIndex] = useState(indexCategory);

   const Sneakers = product?.filter(item => item.category === 'Sneakers')
   const Formal = product?.filter(item => item.category === 'Formal')
   const Boots = product?.filter(item => item.category === 'Boots')
   const Loafers = product?.filter(item => item.category === 'Loafers')
   const Sandals = product?.filter(item => item.category === 'Sandals')
   const Hiking = product?.filter(item => item.category === 'Hiking')



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
               <div className="text-center">
                  {/* আপনার হেডিং */}
                  <motion.h2
                     className="text-4xl font-extrabold text-gray-800 mb-4"
                     initial={{ y: 20, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                  >
                    Shop By Category
                  </motion.h2>

                  {/* অ্যানিমেটেড আন্ডারলাইন */}
                
               </div>
               <p className="text-gray-600 mt-2">Explore our curated collections</p>
                 <motion.div
                     className="w-34 h-1.5 bg-orange-500 mx-auto rounded-full"
                     initial={{ scaleX: 0 }} // শুরুতে স্কেল ০ থাকবে
                     whileInView={{ scaleX: 1 }} // ভিউ-পোর্টে এলে স্কেল ১ হবে
                     viewport={{ once: true }}
                     transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} // একটি সুন্দর ইজিং ফাংশন
                     style={{ transformOrigin: 'center' }} // মাঝখান থেকে অ্যানিমেট হবে
                  />
            </div>
            <div className="">
               <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

                  <TabList className='mb-10'>
                     <Tab>Sneakers</Tab>
                     <Tab>Formal</Tab>
                     <Tab>Boots</Tab>
                     <Tab>Loafers</Tab>
                     <Tab>Hiking</Tab>
                     <Tab>Sandals</Tab>
                  </TabList>
                  <TabPanel>
                     <CategoryItem product={Formal}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Sneakers}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Boots}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Loafers}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Hiking}></CategoryItem>
                  </TabPanel>
                  <TabPanel>
                     <CategoryItem product={Sandals}></CategoryItem>
                  </TabPanel>

               </Tabs>
            </div>
         </div>
      </section>
   );
};

export default Category;