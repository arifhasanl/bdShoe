import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useProduct from '../../../Hooks/useProduct';
import CategoryItem from '../Category/CategoryItem';
import 'react-tabs/style/react-tabs.css';

// Framer Motion থেকে motion এবং AnimatePresence ইম্পোর্ট করা হয়েছে
import { motion, AnimatePresence } from 'framer-motion';

const BrandProduct = () => {
   const [product, ,isLoading] = useProduct();
   const [tabIndex, setTabIndex] = useState(0);

   // আপনার মূল কোড অপরিবর্তিত রাখা হয়েছে
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

   // TabPanel কন্টেন্টের জন্য অ্যানিমেশন ভ্যারিয়েন্ট
   const tabPanelVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: {
       opacity: 1,
       y: 0,
       transition: { duration: 0.5, ease: 'easeOut' }
     },
   };

   return (
      <section className="bg-white pt-4 pb-16">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                {/* Main Section Title */}
                       <div className="text-center mb-12">
                         {/* আপনার হেডিং */}
                         <motion.h2
                           className="text-4xl font-extrabold text-gray-800 mb-4"
                           initial={{ y: 20, opacity: 0 }}
                           whileInView={{ y: 0, opacity: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.6 }}
                         >
                          Our Popular Brands
                         </motion.h2>
               
                         {/* অ্যানিমেটেড আন্ডারলাইন */}
                         <motion.div
                           className="w-35 h-1.5 bg-orange-500 mx-auto rounded-full"
                           initial={{ scaleX: 0 }} // শুরুতে স্কেল ০ থাকবে
                           whileInView={{ scaleX: 1 }} // ভিউ-পোর্টে এলে স্কেল ১ হবে
                           viewport={{ once: true }}
                           transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} // একটি সুন্দর ইজিং ফাংশন
                           style={{ transformOrigin: 'center' }} // মাঝখান থেকে অ্যানিমেট হবে
                         />
                       </div>
               
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

                  {/* AnimatePresence ব্যবহার করে ট্যাব পরিবর্তনের সময় স্মুথ ট্রানজিশন হবে */}
                  <AnimatePresence mode="wait">
                    {/* key={tabIndex} খুবই গুরুত্বপূর্ণ। এটি পরিবর্তন হলেই AnimatePresence কাজ করে */}
                    <motion.div
                      key={tabIndex}
                      variants={tabPanelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden" // আপনি চাইলে exit অ্যানিমেশনও যোগ করতে পারেন
                    >
                      {/* react-tabs এর গঠন ঠিক রাখতে প্রতিটি TabPanel এখানে রাখা হয়েছে */}
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
                    </motion.div>
                  </AnimatePresence>
               </Tabs>
            </div>
         </div>
      </section>
   );
};

export default BrandProduct;