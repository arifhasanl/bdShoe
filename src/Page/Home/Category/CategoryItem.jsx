import React from 'react';
import ProductCard from '../../shear/ProductCard/ProductCard';

const CategoryItem = ({product}) => {
   return (
      <div>
         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {
               product.map(item => <ProductCard product={item} key={product._id}></ProductCard>)
            }
         </div>
      </div>
   );
};

export default CategoryItem;