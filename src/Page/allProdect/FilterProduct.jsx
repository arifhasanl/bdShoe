import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// একটি আইকন (optional, কিন্তু দেখতে সুন্দর লাগবে)
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);


// মূল ফিল্টার কম্পোনেন্ট
const FilterProduct = ({ filters, setFilters, filterOptions, onClose }) => {
    // কোন সেকশনটি খোলা আছে তা ট্র্যাক করার জন্য state
    const [openSection, setOpenSection] = useState('categories'); // ডিফল্টভাবে 'categories' খোলা থাকবে

    const handleCheckboxChange = (filterType, value) => {
        const currentValues = filters[filterType] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        setFilters(prev => ({ ...prev, [filterType]: newValues }));
    };

    const handlePriceChange = (e) => {
        setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
    };

    // অ্যানিমেশনের জন্য ভ্যারিয়েন্ট
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // প্রতিটি ফিল্টার সেকশনের মধ্যে ডিলে
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -15 },
        visible: { opacity: 1, y: 0 },
    };
    
    const accordionContentVariants = {
        collapsed: { opacity: 0, height: 0 },
        open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    // ফিল্টার সেকশনগুলোর একটি তালিকা
    const sections = [
        { key: 'categories', title: 'Categories', options: filterOptions.categories },
        { key: 'brands', title: 'Brands', options: filterOptions.brands },
        { key: 'sizes', title: 'Sizes', options: filterOptions.sizes },
    ];

    return (
        <motion.form
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* মোবাইল ভিউতে বন্ধ করার বাটন */}
            {onClose && (
                <div className="flex justify-end lg:hidden">
                    <button type="button" onClick={onClose} className="p-2 -mr-2 text-gray-500">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            
            {/* Category, Brand, Size সেকশন (Accordion) */}
            {sections.map(section => (
                <motion.div key={section.key} variants={itemVariants} className="border-b border-gray-200 pb-6">
                    <h3 className="-my-3 flow-root">
                        <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-500 hover:text-gray-600"
                            onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                        >
                            <span className="font-medium text-gray-900">{section.title}</span>
                            <motion.span
                                className="ml-6 flex items-center"
                                animate={{ rotate: openSection === section.key ? 180 : 0 }}
                            >
                                <ChevronDownIcon />
                            </motion.span>
                        </button>
                    </h3>
                    <AnimatePresence>
                        {openSection === section.key && (
                            <motion.div
                                variants={accordionContentVariants}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                className="pt-6 overflow-hidden"
                            >
                                <div className="space-y-4">
                                    {section.options.map((option, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                id={`${section.key}-${index}`}
                                                name={`${section.key}[]`}
                                                defaultValue={option}
                                                type="checkbox"
                                                checked={filters[section.key].includes(option)}
                                                onChange={() => handleCheckboxChange(section.key, option)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor={`${section.key}-${index}`} className="ml-3 text-sm text-gray-600 capitalize">
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}

            {/* Price Filter সেকশন (Accordion) */}
            <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
                 <h3 className="-my-3 flow-root">
                        <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-500 hover:text-gray-600"
                            onClick={() => setOpenSection(openSection === 'price' ? null : 'price')}
                        >
                            <span className="font-medium text-gray-900">Price</span>
                             <motion.span
                                className="ml-6 flex items-center"
                                animate={{ rotate: openSection === 'price' ? 180 : 0 }}
                            >
                                <ChevronDownIcon />
                            </motion.span>
                        </button>
                    </h3>
                <AnimatePresence>
                    {openSection === 'price' && (
                         <motion.div
                            variants={accordionContentVariants}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            className="pt-6 overflow-hidden"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>$0</span>
                                    <span>${filters.maxPrice}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={filters.maxPrice}
                                    onChange={handlePriceChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </motion.form>
    );
};

export default FilterProduct;