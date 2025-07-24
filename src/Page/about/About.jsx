import React from 'react';
import { FiTarget, FiHeart, FiAward } from 'react-icons/fi'; // রিঅ্যাক্ট আইকনস (npm install react-icons)

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* 1. Hero Section */}
   <div className="h-[300px] md:h-[500px]">
       <section className="relative bg-cover bg-center h-full  text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">About StepStyle</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">We believe every step you take should be in style and comfort. Discover our journey.</p>
        </div>
      </section>
   </div>

      {/* 2. Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                StepStyle started in 2023 with a simple idea: to create a place where shoe lovers can find the perfect pair for any occasion. Frustrated with the lack of curated, high-quality online shoe stores, our founder, Jane Doe, decided to build one herself.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From a small garage project to a thriving online community, our passion for footwear drives us every day. We source the best materials, partner with top brands, and focus on delivering an exceptional shopping experience.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://plus.unsplash.com/premium_photo-1677230986567-806de95c3d05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Our Story" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <FiTarget className="text-5xl text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600">To provide our customers with a diverse collection of high-quality, stylish, and comfortable footwear, backed by outstanding customer service.</p>
                </div>
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <FiHeart className="text-5xl text-pink-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-600">To become the most trusted and beloved online shoe destination, inspiring confidence and style in every step our customers take.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* 4. Our Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <FiAward className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">We never compromise on quality. Every pair is crafted to last.</p>
            </div>
            <div className="p-6">
              <FiHeart className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Obsession</h3>
              <p className="text-gray-600">Our customers are at the heart of everything we do. Your satisfaction is our priority.</p>
            </div>
            <div className="p-6">
              <FiTarget className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainable Style</h3>
              <p className="text-gray-600">We are committed to eco-friendly practices and promoting sustainable fashion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Meet Our Team Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Team Member 1" 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold text-gray-800">Jane Doe</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Team Member 2" 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold text-gray-800">John Smith</h3>
              <p className="text-gray-500">Head of Design</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Team Member 3" 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold text-gray-800">Emily White</h3>
              <p className="text-gray-500">Marketing Director</p>
            </div>
            {/* Team Member 4 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Team Member 4" 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold text-gray-800">Michael Brown</h3>
              <p className="text-gray-500">Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action (CTA) Section */}
      <section className="py-20 bg-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Pair?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Browse our latest collections and step into a world of style and comfort. Your next favorite pair of shoes is just a click away.</p>
          <a 
            href="/allProduct" 
            className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};


export default About;