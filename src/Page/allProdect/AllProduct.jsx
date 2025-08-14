import React, { useEffect, useState } from 'react';
import useProduct from '../../Hooks/useProduct';
import ProductCard from '../shear/ProductCard/ProductCard';
import Pagination from './Pagination';
import { Helmet } from 'react-helmet-async';
import Banner from '../Home/Banner/Banner';
// framer-motion থেকে motion এবং AnimatePresence ইম্পোর্ট করা হয়েছে
import { motion, AnimatePresence } from 'framer-motion';

// FilterProduct কম্পোনেন্ট এখানে ইম্পোর্ট হবে। 
// আমরা ধরে নিচ্ছি FilterProduct একটি UI কম্পোনেন্ট যা props নেয়।
import FilterProduct from './FilterProduct';

const AllProduct = () => {
  const [product] = useProduct();
  const filterOptions = {
    categories: [...new Set(product?.map(p => p.category))],
    brands: [...new Set(product?.map(p => p.brand))],
    sizes: [...new Set(product?.flatMap(p => p.sizes))].sort((a, b) => a - b)
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    sizes: [],
    maxPrice: 500, // আপনার সর্বোচ্চ প্রাইস এখানে সেট করুন
  });

  useEffect(() => {
    setFilteredProducts(product); // Initially set all products
  }, [product]);

  useEffect(() => {
    let products = [...product];

    if (filters.categories?.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands?.length > 0) {
      products = products.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.sizes?.length > 0) {
      products = products.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    products = products?.filter(p => p.price <= filters.maxPrice);

    setFilteredProducts(products);
    setCurrentPage(1); // ফিল্টার পরিবর্তন হলে প্রথম পেজে ফেরত যান
  }, [filters, product]);


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerpage, setItemPerpage] = useState(10);
  
  const totalPages = Math.ceil(filteredProducts.length / itemPerpage);
  const startIndex = (currentPage - 1) * itemPerpage;
  const endIndex = startIndex + itemPerpage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <Helmet>
        <title>BdHub || All Product</title>
      </Helmet>
      <Banner></Banner>
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-12 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">All Shoes</h1>

          <div className="flex items-center">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.59L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <section className="pt-6 pb-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            
            {/* Filters Sidebar (Desktop) - এটি শুধু বড় স্ক্রিনে দেখা যাবে */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FilterProduct
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
              />
            </motion.div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {/* AnimatePresence দিয়ে প্রোডাক্ট লিস্ট এবং "No products" মেসেজের মধ্যে স্মুথ ট্রানজিশন হবে */}
              <AnimatePresence mode="wait">
                {currentItems.length > 0 ? (
                  <motion.div
                    key="product-list" // একটি ইউনিক key দেওয়া জরুরি
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {currentItems.map((product) => (
                      // প্রতিটি প্রোডাক্ট কার্ড অ্যানিমেশনের জন্য motion.div দিয়ে wrap করা হয়েছে
                      <motion.div
                        key={product._id} // অবশ্যই একটি stable key ব্যবহার করুন
                        layout // ফিল্টার করার সময় কার্ডগুলো সুন্দরভাবে জায়গা পরিবর্তন করবে
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-products" // একটি ইউনিক key দেওয়া জরুরি
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-center py-12"
                  >
                    <h2 className="text-xl font-medium text-gray-700">No products found</h2>
                    <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Filter Sidebar Animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
            
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-50 shadow-xl lg:hidden p-4 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setSidebarOpen(false)} className="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterProduct
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProduct;