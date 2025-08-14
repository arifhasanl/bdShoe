
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import React from 'react';
import AnimatedTextCharacter from "../../about/AnimatedTextCharacter";
import FadeIn from "../../about/FadeIn";


const Cover = ({ heading, subHeading, image }) => {
    return (
        <div className="mb-12 container mx-auto ">
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center text-white">
                {/* Background Image */}
                <img
                    src={image}
                    alt="Stylish shoes collection"
                    className="absolute inset-0 rounded-md w-full h-full object-cover -z-10"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                        <AnimatedTextCharacter
                            text={heading}
                            className="text-4xl md:text-6xl font-extrabold leading-tight"
                        />
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                        <FadeIn direction="up" delay={0.6}>
                            <p className="mt-4 text-lg md:text-xl max-w-2xl">{subHeading}</p>
                        </FadeIn>
                    </p>
                    <a
                        href="/AllProduct"
                        className="mt-8 inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg 
                     hover:bg-gray-200 transition-transform transform hover:scale-105"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Cover;
