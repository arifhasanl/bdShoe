import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItem = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            sizes: [], // Set default value for checkbox group
            tags: [], // Set default value for checkbox group
        }
    });

    // Options for dropdowns and checkboxes
    const categoryOptions = ["Sneakers", "Formal", "Boots", "Loafers", "Hiking", "Sandals"];
    const brandOptions = ["Adidas", "Bata", "Timberland", "Clarks", "Birkenstock", "Apex", "Puma", "Gucci"];
    const sizeOptions = [6, 7, 8, 9, 10];
    const tagOptions = ["outdoor", "new-arrival", "on-sale", "limited-edition"];
    const colors = ['Brown', 'Black', 'Tan', 'Dark Chili', 'Glacier/White', 'All Black']

    const onSubmit = async (data) => {

        //image upload to imagebb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const processedData = {
                ...data,
                price: parseFloat(data.price),
                rating: parseInt(data.rating, 10),
                image: res.data.data.display_url
                // Sizes and Tags are already arrays from checkboxes
            };
            const menuResponse = await axiosSecure.post('/product', processedData)
            if (menuResponse.data.insertedId) {
            
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Product Successfully Added",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }
        }

        console.log("Final Data to be sent:", processedData);

        alert('Item added successfully! Check the console for the data object.');
        reset();
    };

    // Reusable styles
    const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-2"; // Increased margin-bottom

    return (
        <div className="w-full mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
                <FaUtensils className="text-orange-500" />
                Add a New Item
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Product Name */}
                <div>
                    <label className={labelStyle} htmlFor="name">Product Name*</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="e.g., Adidas Pro Hiker"
                        {...register("name", { required: "Product name is required" })}
                        className={inputStyle}
                    />
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
                        <input
                            id="price" type="number" step="0.01" placeholder="e.g., 150"
                            {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Price must be positive" } })}
                            className={inputStyle}
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="rating">Rating* (1-5)</label>
                        <input
                            id="rating" type="number" placeholder="e.g., 5"
                            {...register("rating", { required: "Rating is required", valueAsNumber: true, min: 1, max: 5 })}
                            className={inputStyle}
                        />
                        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message || 'Rating must be between 1 and 5'}</p>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="man">For*</label>
                        <select id="man" {...register("man", { required: "This field is required" })} className={inputStyle}>
                            <option value="">Select Gender</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="unisex">Unisex</option>
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
                                <input
                                    type="checkbox"
                                    value={size}
                                    {...register("sizes", { required: "Please select at least one size" })}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
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
                                <input
                                    type="checkbox"
                                    value={tag}
                                    {...register("tags")}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="text-gray-700 capitalize">{tag.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image URL and Description */}
                <div>
                    <label className={labelStyle} htmlFor="image">Image URL*</label>
                    <input type="file" className='file-input w-full max-w-xs'  {...register('image', { required: true })} />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>
                <div>
                    <label className={labelStyle} htmlFor="description">Description*</label>
                    <textarea id="description" rows="4" placeholder="Brief description of the product..." {...register("description", { required: "Description is required" })} className={inputStyle}></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Colors Field (kept as text input for flexibility) */}
                <div>
                    <label className={labelStyle}>Colors</label>

                    <div className="flex flex-wrap gap-4">

                        {colors.map(color => (
                            <label key={color} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={color}
                                    {...register("colors")}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="text-gray-700 capitalize">{color.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center gap-2"
                >
                    Add Item <FaUtensils />
                </button>
            </form>
        </div>
    );
};

export default AddItem;
//  const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
//    const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
//   const imageFile = { image: data.image[0] }
//       const res=await axiosPublic.post(image_hosting_api,imageFile,{
//               headers: {
//             'content-type': 'multipart/form-data'
//          }
//       })
