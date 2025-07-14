import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateMenu = () => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();
   const {name,category,price,image,recipe,_id}=useLoaderData();
   const onSubmit = async (data) => {
      //image upload to imagebb and then get an url
   
         const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe
         }
         const menuResponse = await axiosSecure.patch(`/menu/${_id}`, menuItem)
         console.log(menuResponse);
         if (menuResponse.data.acknowledged) {
            reset()
            alert('add Item success')
         }
      }

   
   return (
      <div>
         <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="">
                  <label className="label block">
                     <h2 className="label-text">Recipe Name</h2>
                  </label>
                  <input type="text" placeholder="Recipe Name" {...register('name', { required: true })} className="input input-bordered w-full" />
               </div>

               <div className=" flex gap-7 mt-5 justify-between ">
                  <div className="w-1/2">
                     <label className="label">
                        <span className="label-text">Select a Category</span>
                     </label>
                     <select defaultValue={'default'} className='select select-bordered w-full' {...register('category')}>
                        <option disabled value='default'>Select a category</option>
                        <option value="salad">Salad</option>
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                     </select>
                  </div>
                  <div className=" w-1/2">
                     <label className="label">
                        <span className="label-text">Price</span>
                     </label>
                     <input type="number" placeholder="Price" {...register('price', { required: true })} className=" input input-bordered w-full" />
                  </div>

               </div>
               <div className="mt-10">
                  <label className='label'>
                     <h2 className='block'>Recipe Details</h2>
                  </label>
                  <textarea
                     className='textarea textarea-bordered h-24 w-full' placeholder='Bio'
                     {...register("recipe", {
                        maxLength: {
                           value: 200,
                           message: "recipe cannot exceed 200 characters",
                        },
                        required: true
                     })}
                  />
               </div>
              
               <div className="">
                  <button className='btn btn-primary'>
                     Add Item <FaUtensils></FaUtensils>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default UpdateMenu;