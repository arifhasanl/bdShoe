import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const Footer = () => {
   return (
      <footer className="bg-gray-900 text-gray-300">
         <div className="container mx-auto py-12 px-6 lg:px-8">
            {/* Main footer section with a responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

               {/* Column 1: Company Information */}
               <div className="sm:col-span-2 lg:col-span-1">
                  <h2 className="text-white text-2xl font-bold mb-4">YourBrand</h2>
                  <p className="text-gray-400 text-sm">
                     Delivering quality and style to your doorstep. Your satisfaction is our priority.
                  </p>
                  {/* Social Media Icons */}
                  <div className="flex space-x-4 mt-6">
                     <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
                        <FaFacebookF size={20} />
                     </a>
                     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                        <FaTwitter size={20} />
                     </a>
                     <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                        <FaInstagram size={20} />
                     </a>
                     <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                        <FaLinkedinIn size={20} />
                     </a>
                  </div>
               </div>

               {/* Column 2: Quick Links */}
               <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                     <li><a href="/aboutUs" className="hover:text-white transition-colors duration-300">About Us</a></li>
                     <li><a href="/allProduct" className="hover:text-white transition-colors duration-300">Products</a></li>
                     <li><a href="/" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                  </ul>
               </div>

               {/* Column 3: Support */}
               <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-3">
                     <li><a href="/" className="hover:text-white transition-colors duration-300">FAQ</a></li>
                     <li><a href="/" className="hover:text-white transition-colors duration-300">Shipping Policy</a></li>
                     <li><a href="/" className="hover:text-white transition-colors duration-300">Return Policy</a></li>
                     <li><a href="/" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                  </ul>
               </div>

               {/* Column 4: Contact Information */}
               <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                  <div className="text-gray-400 space-y-3 text-sm">
                     <p>123 Commerce St, Suite 400,<br />New York, NY 10001, USA</p>
                     <p>Email: contact@yourbrand.com</p>
                     <p>Phone: +1 (234) 567-890</p>
                  </div>
               </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
               <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} YourBrand. All Rights Reserved.
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;