import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Swiper.js থেকে প্রয়োজনীয় মডিউল ইম্পোর্ট করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper.js এর CSS ফাইলগুলো ইম্পোর্ট করুন
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Fade Effect এর জন্য
import img1 from '../../../assets/banner/banner1.JPG';            
import img2 from '../../../assets/banner/banner2.JPG';
import img3 from '../../../assets/banner/banner3.JPG';




// Hero Section এ দেখানোর জন্য ডাটা
const heroSlides = [
  {
    id: 1,
    title: 'New Winter Collection',
    subtitle: 'Step into comfort and style with our latest arrivals. Up to 30% Off!',
    image: {img1}, // এখানে আপনার জুতার ছবি দিন
    buttonText: 'Shop Now',
    buttonLink: '/men',
  },
  {
    id: 2,
    title: 'Unleash Your Speed',
    subtitle: 'Discover our high-performance running shoes designed for athletes.',
    image: img2, // এখানে আপনার জুতার ছবি দিন
    buttonText: 'Explore Sports',
    buttonLink: '/sports',
  },
  {
    id: 3,
    title: 'Elegance in Every Step',
    subtitle: 'Find the perfect pair of formal shoes for any occasion.',
    image: img3, // এখানে আপনার জুতার ছবি দিন
    buttonText: 'View Formal Wear',
    buttonLink: '/women',
  },
];

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
    <div className="relative h-[45vh] md:h-[75vh]">
      <Swiper
        // Swiper মডিউলগুলো এখানে যোগ করুন
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
         navigation={windowWidth >= 768}  // নেভিগেশন অ্যারো দেখানোর জন্য
        pagination={{ clickable: true }} // ডট পেজিনেশন
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade" // এটি স্লাইড পরিবর্তনের সময় সুন্দর fade effect দেবে
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* ছবির উপর একটি হালকা কালো overlay, যাতে টেক্সট واضح হয় */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* টেক্সট এবং বাটন কন্টেন্ট */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <div className="animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                        {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
                        {slide.subtitle}
                    </p>
                    <Link
                        to={slide.buttonLink}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        {slide.buttonText}
                    </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;