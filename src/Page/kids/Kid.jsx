
import React, { useState } from 'react';
import useProduct from '../../Hooks/useProduct';
import ProductCard from '../shear/ProductCard/ProductCard';
import Pagination from './../allProdect/Pagination';
import Cover from '../shear/cover/Cover';
import { motion } from 'framer-motion';

// অ্যানিমেশনের জন্য আমাদের Reusable কম্পোনেন্ট
import FadeIn from '../about/FadeIn';
import { Helmet } from 'react-helmet-async';

const Men = () => {
   const [products, , isLoading] = useProduct();
   const menShoes = products?.filter(shoe => shoe.man === 'kids');

   // ... আপনার Pagination লজিক এখানে থাকবে ...
   const [currentPage, setCurrentPage] = useState(1);
   const [itemPerpage] = useState(8); // প্রতি পেজে আইটেম সংখ্যা কমানো ভালো, ৮ বা ১২ দেখতে ভালো লাগে
   const totalPages = Math.ceil(menShoes.length / itemPerpage);
   const startIndex = (currentPage - 1) * itemPerpage;
   const endIndex = startIndex + itemPerpage;
   const currentItems = menShoes.slice(startIndex, endIndex);

   const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 300); // পেজ চেঞ্জ হলে উপরে স্ক্রল করবে
   };

   // কার্ড গ্রিডের জন্য Stagger ভ্যারিয়েন্ট
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1, // প্রতিটি কার্ডের মধ্যে ০.১ সেকেন্ড দেরি
         },
      },
   };

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: { type: 'spring', stiffness: 100 },
      },
   };

   if (isLoading) {
      return <h3 className='text-center my-80 text-xl font-semibold'>Loading Men's Collection...</h3>;
   }

   return (
      <div className="container mx-auto">
        <Helmet>
                        <title>BdHub || Kids</title>
                    </Helmet>
         {/* Cover কম্পোনেন্টকে আরও ফ্লেক্সিবল করা হয়েছে */}
         <Cover heading={"Kid's Collection"} subHeading={"Find your perfect pair from our exclusive men's collection."} image={"https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}>
           
           
         </Cover>

         <div className="mt-10 px-4 md:px-0">
            <main className="w-full">
               {currentItems.length > 0 ? (
                  <motion.div
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     key={currentPage} // পেজ পরিবর্তন হলে অ্যানিমেশন রি-ট্রিগার হবে
                  >
                     {currentItems.map(product=> (
                        <motion.div key={product.id} variants={itemVariants}>
                           <ProductCard product={product} />
                        </motion.div>
                     ))}
                  </motion.div>
               ) : (
                  <p className="text-center text-gray-500 py-20">No products found in this category.</p>
               )}
            </main>
         </div>

         <FadeIn direction="up" delay={0.2}>
            <div className="my-12">
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
               />
            </div>
         </FadeIn>
      </div>
   );
};

export default Men;

