import React, { useEffect, useState } from 'react';
import Cover from '../shear/cover/Cover';
import FilterProduct from './FilterProduct';
import useProduct from '../../Hooks/useProduct';
import ProductCard from '../shear/ProductCard/ProductCard';
import Pagination from './Pagination';




const AllProduct = () => {
  const [product] = useProduct();
  const filterOptions = {

    categories: [...new Set(product?.map(p => p.category))],
    brands: [...new Set(product?.map(p => p.brand))],
    sizes: [...new Set(product?.flatMap(p => p.sizes))].sort((a, b) => a - b)
  };
  const [filteredProducts, setFilteredProducts] = useState(product);
  console.log(filteredProducts, 'filter');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    sizes: [],
    maxPrice: 500,
  });
  useEffect(() => {
    let products = [...product];

    // Category filter
    if (filters.categories?.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category));
    }
    // Brand filter
    if (filters.brands?.length > 0) {
      products = products.filter(p => filters.brands.includes(p.brand));
    }
    // Size filter
    if (filters.sizes?.length > 0) {
      products = products.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    // Price filter
    products = products?.filter(p => p.price <= filters.maxPrice);

    setFilteredProducts(products);
  }, [filters, product]);


  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerpage, setItemPerpage] = useState(10)
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemPerpage);

  // Calculate the items for the current page
  const startIndex = (currentPage - 1) * itemPerpage;
  const endIndex = startIndex + itemPerpage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // Handler for changing the page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };





  return (
    <div className="">
      <Cover></Cover>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-12 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">All Shoes</h1>

          <div className="flex items-center">
            {/* Mobile filter dialog open button */}
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

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterProduct
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {
                    currentItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium text-gray-700">No products found</h2>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}

              <div className=" ">
                {/* Pagination Component */}
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
    </div>
  );
};

export default AllProduct;