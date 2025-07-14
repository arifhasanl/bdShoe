import React from 'react';

const FilterProduct = ({ filters, setFilters, filterOptions, isOpen, onClose }) => {
  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [filterType]: newValues });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: parseInt(e.target.value, 10) });
  };
  

  return (
    <>
      {/* Mobile filter dialog overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-25 z-30 ${isOpen ? 'block' : 'hidden'} lg:hidden`}
        onClick={onClose}
      />
      
      {/* Filter Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out 
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                   lg:relative lg:translate-x-0 lg:h-auto lg:w-full lg:shadow-none lg:bg-transparent lg:z-auto`}
      >
        <div className="p-4 space-y-6 overflow-y-auto h-full">
            <div className="flex items-center justify-between lg:hidden">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={onClose}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Category</h3>
            <div className="space-y-2">
              {filterOptions.categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`filter-category-${category}`}
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckboxChange('categories', category)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`filter-category-${category}`} className="ml-3 text-sm text-gray-600">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Brand</h3>
            <div className="space-y-2">
              {filterOptions.brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    id={`filter-brand-${brand}`}
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange('brands', brand)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`filter-brand-${brand}`} className="ml-3 text-sm text-gray-600">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Size Filter */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {filterOptions.sizes.map((size) => (
                <div key={size} className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleCheckboxChange('sizes', size)}
                    className="sr-only peer"
                  />
                  <label
                    htmlFor={`size-${size}`}
                    className="flex items-center justify-center w-full h-10 border rounded-md text-sm cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Price Range</h3>
            <div className="flex flex-col">
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                 <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>$0</span>
                    <span>${filters.maxPrice}</span>
                    <span>$500</span>
                </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterProduct;