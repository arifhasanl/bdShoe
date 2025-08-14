import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSyncAlt } from 'react-icons/fa'; // Changed icon
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading,setLoading]=useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 1. Fetch the product data using the ID
    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product/${id}`);
            return res.data;
        }
    });

    // 2. Set form default values once product data is loaded
    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product, reset]);

    // Options for dropdowns and checkboxes (kept from original)
    const categoryOptions = ["Sneakers", "Formal", "Boots", "Loafers", "Hiking", "Sandals"];
    const brandOptions = ["Adidas", "Bata", "Timberland", "Clarks", "Birkenstock", "Apex", "Puma", "Gucci"];
    const sizeOptions = [6, 7, 8, 9, 10];
    const tagOptions = ["outdoor", "new-arrival", "on-sale", "limited-edition"];
    const colors = ['Brown', 'Black', 'Tan', 'Dark Chili', 'Glacier/White', 'All Black'];

    const onSubmit = async (data) => {
        let imageUrl = product?.image; // Default to existing image URL
        setLoading(true)
        // 3. If a new image is uploaded, upload it to ImgBB
        if (data.image && data.image.length > 0) {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });
            if (res.data.success) {
                imageUrl = res.data.data.display_url; // Get new image URL
                console.log(imageUrl);
            } else {
                Swal.fire("Error!", "Image upload failed. Please try again.", "error");
                return; // Stop the submission if image upload fails
            }
        }

        // 4. Prepare the updated data for the API
        const updatedProductData = {
            name: data.name,
            category: data.category,
            brand: data.brand,
            price: parseFloat(data.price),
            rating: parseInt(data.rating, 10),
            man: data.man,
            description: data.description,
            sizes: data.sizes,
            tags: data.tags,
            colors: data.colors,
            image: imageUrl, // Use new or existing image URL
        };
        
        // 5. Send PATCH request to update the product
        const menuResponse = await axiosSecure.patch(`/product/updateProduct/${id}`, updatedProductData);

        if (menuResponse.data.modifiedCount > 0) {
            refetch(); // Refetch the data to show the latest version
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been updated!`,
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false)
        } else {
             Swal.fire({
                icon: "info",
                title: "No Changes Detected",
                text: "You haven't made any changes to update.",
            });
        }
    };

    // Show a loading spinner while fetching data
    if (isLoading) {
        return <><p>Loading...</p></>
    }

    // Reusable styles (kept from original)
    const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-2";

    return (
        <div className="w-full mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
                <FaSyncAlt className="text-orange-500" />
                Update Product Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Product Name */}
                <div>
                    <label className={labelStyle} htmlFor="name">Product Name*</label>
                    <input id="name" type="text" {...register("name", { required: "Product name is required" })} className={inputStyle} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Grid for Category and Brand Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelStyle} htmlFor="category">Category*</label>
                        <select id="category" {...register("category", { required: "Please select a category" })} className={inputStyle}>
                            <option value="">Select Category</option>
                            {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="brand">Brand*</label>
                        <select id="brand" {...register("brand", { required: "Please select a brand" })} className={inputStyle}>
                            <option value="">Select Brand</option>
                            {brandOptions.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                        </select> 
                         {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
                    </div>
                </div>

                {/* Grid for Price, Rating and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelStyle} htmlFor="price">Price*</label>
                        <input id="price" type="number" step="0.01" {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Price must be positive" } })} className={inputStyle} />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="rating">Rating* (1-5)</label>
                        <input id="rating" type="number" {...register("rating", { required: "Rating is required", valueAsNumber: true, min: 1, max: 5 })} className={inputStyle} />
                        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message || 'Rating must be between 1 and 5'}</p>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="man">For*</label>
                        <select id="man" {...register("man", { required: "This field is required" })} className={inputStyle}>
                            <option value="">Select Gender</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                        </select>
                        {errors.man && <p className="text-red-500 text-xs mt-1">{errors.man.message}</p>}
                    </div>
                </div>

                {/* Checkbox group for Sizes */}
                <div>
                    <label className={labelStyle}>Available Sizes*</label>
                    <div className="flex flex-wrap gap-4">
                        {sizeOptions.map(size => (
                            <label key={size} className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" value={size} {...register("sizes", { required: "Please select at least one size" })} className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-700">{size}</span>
                            </label>
                        ))}
                    </div>
                    {errors.sizes && <p className="text-red-500 text-xs mt-1">{errors.sizes.message}</p>}
                </div>

                {/* Checkbox group for Tags */}
                <div>
                    <label className={labelStyle}>Tags</label>
                    <div className="flex flex-wrap gap-4">
                        {tagOptions.map(tag => (
                            <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" value={tag} {...register("tags")} className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-700 capitalize">{tag.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                 {/* Colors Checkbox Group */}
                <div>
                    <label className={labelStyle}>Colors</label>
                    <div className="flex flex-wrap gap-4">
                        {colors.map(color => (
                            <label key={color} className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" value={color} {...register("colors")} className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-700 capitalize">{color.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image Update Section */}
                <div>
                    <label className={labelStyle}>Update Image</label>
                    <div className="flex items-center gap-4">
                        {product?.image && <img src={product?.image} alt="Current" className="w-24 h-24 object-cover rounded-md" />}
                        <input type="file" className='file-input file-input-bordered w-full max-w-xs' {...register('image')} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current image.</p>
                </div>

                {/* Description */}
                <div>
                    <label className={labelStyle} htmlFor="description">Description*</label>
                    <textarea id="description" rows="4" {...register("description", { required: "Description is required" })} className={inputStyle}></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center gap-2">
                    Update Product {loading&& <>Loading...</>} <FaSyncAlt />
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
