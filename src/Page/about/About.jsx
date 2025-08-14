import React from 'react';
import { useForm } from 'react-hook-form';
import { FiTarget, FiHeart, FiAward, FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

// অ্যানিমেশন কম্পোনেন্ট ইম্পোর্ট
import AnimatedTextCharacter from './AnimatedTextCharacter';
import FadeIn from './FadeIn';
import { motion } from 'framer-motion';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const About = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        // ... আপনার ফর্ম সাবমিশনের লজিক এখানে থাকবে ...
        // (আগের উত্তর থেকে কপি করে নিতে পারেন)
    };

    const labelStyle = "block text-sm font-semibold text-gray-700 mb-2";

    // Stagger Animation Variants
    const staggerContainer = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
    
    const staggerItem = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      },
    };

    return (
        <div className="bg-gray-50 overflow-x-hidden"> {/* overflow-x-hidden যোগ করা হয়েছে সাইডওয়েজ স্ক্রল रोकने জন্য */}
            
            {/* 1. Hero Section */}
            <div className="h-[300px] md:h-[500px]">
                <section className="relative bg-cover bg-center h-full text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                        <AnimatedTextCharacter 
                            text="About bdHubShoe" 
                            className="text-4xl md:text-6xl font-extrabold leading-tight"
                        />
                        <FadeIn direction="up" delay={0.6}>
                            <p className="mt-4 text-lg md:text-xl max-w-2xl">We believe every step you take should be in style and comfort. Discover our journey.</p>
                        </FadeIn>
                    </div>
                </section>
            </div>

            {/* 2. Our Story Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <FadeIn direction="right" fullWidth>
                            <div className="md:w-full">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    bdHubShoe started in 2023 with a simple idea...
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    From a small garage project to a thriving online community...
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="left" fullWidth delay={0.2}>
                            <div className="md:w-full">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1677230986567-806de95c3d05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Our Story"
                                    className="rounded-lg shadow-2xl w-full h-auto"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. Our Mission & Vision Section */}
            <section className="py-16 md:py-24 bg-gray-100">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <FadeIn direction="down">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Mission & Vision</h2>
                    </FadeIn>
                    <motion.div 
                        className="grid md:grid-cols-2 gap-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={staggerItem}>
                            <div className="p-8 bg-white rounded-lg shadow-md h-full">
                                <FiTarget className="text-5xl text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                                <p className="text-gray-600">To provide our customers with a diverse collection of high-quality, stylish, and comfortable footwear, backed by outstanding customer service.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={staggerItem}>
                            <div className="p-8 bg-white rounded-lg shadow-md h-full">
                                <FiHeart className="text-5xl text-pink-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                                <p className="text-gray-600">To become the most trusted and beloved online shoe destination, inspiring confidence and style in every step our customers take.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Our Values Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <FadeIn direction="down">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">What We Stand For</h2>
                    </FadeIn>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={staggerItem} className="p-6">
                            <FiAward className="text-4xl text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                            <p className="text-gray-600">We never compromise on quality. Every pair is crafted to last.</p>
                        </motion.div>
                        <motion.div variants={staggerItem} className="p-6">
                            <FiHeart className="text-4xl text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Customer Obsession</h3>
                            <p className="text-gray-600">Our customers are at the heart of everything we do. Your satisfaction is our priority.</p>
                        </motion.div>
                        <motion.div variants={staggerItem} className="p-6">
                            <FiTarget className="text-4xl text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Sustainable Style</h3>
                            <p className="text-gray-600">We are committed to eco-friendly practices and promoting sustainable fashion.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 5. Meet Our Team Section */}
            <section className="py-16 md:py-24 bg-gray-100">
                <div className="container mx-auto px-6 lg:px-8">
                    <FadeIn direction="down">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
                    </FadeIn>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            { name: 'Jane Doe', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                            { name: 'John Smith', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                            { name: 'Emily White', role: 'Marketing Director', img: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                            { name: 'Michael Brown', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="text-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2"
                            >
                                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200" />
                                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            {/* 6. Join Our Team Form Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <FadeIn direction="down">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Join Our Team</h2>
                            <p className="text-gray-600 mb-8">
                                Passionate about footwear and innovation? We're always looking for talented individuals to join our journey.
                            </p>
                        </div>
                    </FadeIn>
                    
                    <FadeIn direction="up">
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
                            {/* ... আপনার ফর্মের ফিল্ডগুলো এখানে ... */}
                        </form>
                    </FadeIn>
                </div>
            </section>

            {/* 7. Call to Action (CTA) Section */}
            <section className="py-20 bg-indigo-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn direction="up">
                        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Pair?</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">Browse our latest collections and step into a world of style and comfort. Your next favorite pair of shoes is just a click away.</p>
                        <Link to="/allProduct" className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors">
                            Shop Now
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default About;