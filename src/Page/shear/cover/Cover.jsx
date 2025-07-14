import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// import required modules
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// --- Data for our slides ---
const slidesData = [
   {
      image: 'https://images.unsplash.com/photo-1488161628813-04466f872d24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: "Urban Explorer Collection",
      subtitle: "Built for the City.",
      description: "Navigate the urban landscape with gear that combines rugged performance with modern aesthetics."
   },
   {
      image: 'https://images.unsplash.com/photo-1492652426214-5d51a6691458?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: "Weekend Getaway Essentials",
      subtitle: "Escape in Style.",
      description: "Comfortable, versatile, and stylish pieces perfect for your next adventure out of town."
   },
   {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      title: "Modern Professional Attire",
      subtitle: "Command the Boardroom.",
      description: "Sharp, sophisticated, and comfortable formal wear that makes a lasting impression."
   }
];
const Cover = () => {
   const bannerImageUrl = 'https://images.unsplash.com/photo-1488161628813-04466f872d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

   return (
      <section className="relative w-full h-screen lg:h-[85vh]">
         <Swiper
            // Install modules
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            pagination={{
               clickable: true,
            }}
            autoplay={{
               delay: 4000,
               disableOnInteraction: false,
            }}
            loop={true}
            className="mySwiper w-full h-full"
         >
            {slidesData.map((slide, index) => (
               <SwiperSlide key={index} className="relative text-white">
                  {/* Background Image */}
                  <div
                     className="absolute inset-0 bg-cover bg-center"
                     style={{ backgroundImage: `url(${slide.image})` }}
                  ></div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>

                  {/* Content */}
                  <div className="relative mx-auto max-w-screen-xl px-4 h-full flex items-center justify-center sm:px-6 lg:px-8">
                     <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl drop-shadow-lg">
                           {slide.title}
                           <strong className="mt-2 block font-extrabold text-blue-400">
                              {slide.subtitle}
                           </strong>
                        </h1>

                        <p className="mt-4 max-w-xl sm:text-xl/relaxed drop-shadow-md mx-auto">
                           {slide.description}
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                           <a
                              className="block w-full rounded border border-blue-500 bg-blue-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto transition-colors"
                              href="/shop/men"
                           >
                              Shop Collection
                           </a>

                           <a
                              className="block w-full rounded border border-white px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-gray-900 focus:outline-none focus:ring sm:w-auto transition-colors"
                              href="/lookbook"
                           >
                              Learn More
                           </a>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   );
};

export default Cover;