import React from 'react'; // useMemo সরানো হয়েছে কারণ product পরিবর্তনশীল
import useProduct from '../../../Hooks/useProduct';
// Framer Motion থেকে motion ইম্পোর্ট করা হয়েছে
import { motion } from 'framer-motion';
import ProductCard from '../../shear/ProductCard/ProductCard';

const Featured = () => {
  const [product, , isLoading] = useProduct();

  // আপনার মূল কোড অপরিবর্তিত রাখা হয়েছে
  const bestSellers = product.filter(p => p.tags.includes('best-seller')).slice(0, 5)
  const newArrivals = product.filter(p => p.tags.includes('new-arrival')).slice(0, 5)

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-semibold">Loading Categories...</p>
      </div>
    );
  }

  // প্রোডাক্ট গ্রিডের জন্য Stagger Animation ভ্যারিয়েন্ট
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // প্রতিটি চাইল্ড আইটেম ০.১ সেকেন্ড পর পর অ্যানিমেট হবে
        staggerChildren: 0.1,
      },
    },
  };

  // প্রতিটি প্রোডাক্ট আইটেমের জন্য ভ্যারিয়েন্ট
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      className="bg-gray-50 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">

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
            Featured Products
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

        {/* Best Sellers Subsection */}
        <div>
          <motion.h3
            className="text-3xl font-bold text-gray-700 mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Best Sellers
          </motion.h3>
          {/* গ্রিড কন্টেইনারে অ্যানিমেশন যোগ করা হয়েছে */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {bestSellers.map(product => (
              // প্রতিটি আইটেমকে motion.div দিয়ে মোড়ানো হয়েছে
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* New Arrivals Subsection */}
        <div className="mt-16">
          <motion.h3
            className="text-3xl font-bold text-gray-700 mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            New Arrivals
          </motion.h3>
          {/* গ্রিড কন্টেইনারে অ্যানিমেশন যোগ করা হয়েছে */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {newArrivals.map(product => (
              // প্রতিটি আইটেমকে motion.div দিয়ে মোড়ানো হয়েছে
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};

export default Featured;