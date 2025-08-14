import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Framer Motion ইম্পোর্ট করুন
import { motion } from 'framer-motion';

// Swiper.js থেকে প্রয়োজনীয় মডিউল ইম্পোর্ট করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper.js এর CSS ফাইলগুলো ইম্পোর্ট করুন
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Hero Section এ দেখানোর জন্য ডাটা
const heroSlides = [
  {
    id: 1,
    title: 'New Winter Collection',
    subtitle: 'Step into comfort and style with our latest arrivals. Up to 30% Off!',
    image: 'https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1018&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Shop Now',
    buttonLink: '/men',
  },
  {
    id: 2,
    title: 'Unleash Your Speed',
    subtitle: 'Discover our high-performance running shoes designed for athletes.',
    image: 'https://i.ibb.co/23CTCXFJ/the-dk-photography-NUo-PWImmj-CU-unsplash.jpg',
    buttonText: 'Explore Sports',
    buttonLink: '/sports',
  },
  {
    id: 3,
    title: 'Elegance in Every Step',
    subtitle: 'Find the perfect pair of formal shoes for any occasion.',
    image: 'https://i.ibb.co/BKzSnc6z/jayson-hinrichsen-q-Ls4-WYXq-LNY-unsplash.jpg',
    buttonText: 'View Formal Wear',
    buttonLink: '/women',
  },
];

// 2. অ্যানিমেশনের জন্য ভ্যারিয়েন্ট তৈরি করুন
// এই ভ্যারিয়েন্টগুলো টেক্সট কন্টেন্টগুলোকে একটির পর একটি অ্যানিমেট করবে
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // প্রতিটি আইটেমের মধ্যে ০.৩ সেকেন্ড ডিলে
    },
  },
};

// প্রতিটি টেক্সট আইটেমের জন্য fade-in-up ইফেক্ট
const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    },
  },
};

const Banner = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-[45vh] md:h-[65vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={windowWidth >= 768}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                
                {/* 3. Framer Motion এখানে ব্যবহার করুন */}
                {/* key={slide.id} খুবই গুরুত্বপূর্ণ, এটি স্লাইড পরিবর্তনের সাথে সাথে অ্যানিমেশন পুনরায় ট্রিগার করবে */}
                <motion.div
                  key={slide.id}
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  className="max-w-4xl" // একটি নির্দিষ্ট প্রস্থ দিয়ে দিলে দেখতে ভালো লাগবে
                >
                    <motion.h1
                        variants={itemVariant}
                        className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
                    >
                        {slide.title}
                    </motion.h1>

                    <motion.p
                        variants={itemVariant}
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md"
                    >
                        {slide.subtitle}
                    </motion.p>
                    
                    <motion.div variants={itemVariant}>
                      <Link
                          to={slide.buttonLink}
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                      >
                          {slide.buttonText}
                      </Link>
                    </motion.div>
                </motion.div>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;