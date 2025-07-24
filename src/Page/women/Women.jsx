import React, { useEffect, useState } from 'react';
import useProduct from '../../Hooks/useProduct';
import ProductCard from '../shear/ProductCard/ProductCard';
import Pagination from '../allProdect/Pagination';
import Cover from '../shear/cover/Cover';

const WoMen = () => {
const [products,,isLoading]=useProduct();
    const WomenShoes = products?.filter(shoe => shoe.man === 'women');
    
      //pagination
    
      const [currentPage, setCurrentPage] = useState(1);
      const [itemPerpage, setItemPerpage] = useState(10)
      // Calculate total pages
      const totalPages = Math.ceil(WomenShoes.length / itemPerpage);
    
      // Calculate the items for the current page
      const startIndex = (currentPage - 1) * itemPerpage;
      const endIndex = startIndex + itemPerpage;
      const currentItems = WomenShoes.slice(startIndex, endIndex);
    
      // Handler for changing the page
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
  if(isLoading){
   return(
      <>
      <h3 className='text-center my-80'>Loading...</h3>
      </>
   )
  }
  return (
    <div className="container mx-auto">
      {/* পেজের হেডিং */}
       <Cover heading={"WoMen's Collection"} subHeading={"Find your perfect pair from our exclusive men's collection."} image={"https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}></Cover>
      <div className="">
        <main className="w-full">
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentItems.map(shoe => (
                <ProductCard
                 key={shoe.id} product={shoe} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found in this category.</p>
          )}
        </main>
      </div>
      <div className=" ">
                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
    </div>
  );
};

export default WoMen;