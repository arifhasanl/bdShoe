import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Page/Home/Home/Home";
import SignUp from "../Page/signUp/SignUp";
import Login from "../login/Login";
import AllProduct from "../Page/allProdect/AllProduct";
import ProductDetails from "../Page/shear/ProductDetails/ProductDetails";
import Dashboard from "../LayOut/Dashboard";
import AddItem from "../Page/dashboard/addItem/AddITem";
import MyCart from "../Page/dashboard/mycart/MyCart";
import AllUsers from "../Page/dashboard/addmin/AllUsers";
import UserHome from "../Page/dashboard/UserHome";
import MangeBooking from "../Page/dashboard/MangeBooking";
import PrivetRoute from './PrivetRoute';
import MangeItem from "../Page/dashboard/MangeItem";
import UpdateProduct from "../Page/dashboard/addmin/UpdateProduct";

const router=createBrowserRouter([
   {
      path:'/',
      element:<Main></Main>,
      children:[
         {
            path:'/',
            element:<Home></Home>
         },
         {
            path:'/signUp',
            element:<SignUp></SignUp>
         },
         {
            path:'/login',
            element:<Login></Login>
         },
         {
            path:'/allProduct',
            element:<AllProduct></AllProduct>
         },
         {
            path:'/product/:id',
            element:<ProductDetails></ProductDetails>,
            loader:({params})=>fetch(`https://bd-hub-server.vercel.app/product/${params.id}`)
         },
         {
            path:'/allProduct/product/:id',
            element:<ProductDetails></ProductDetails>,
            loader:({params})=>fetch(`https://bd-hub-server.vercel.app/product/${params.id}`)
         }

      ]
   },
   {
      path:'/dashboard',
      element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children:[
         {
            path:'addItem',
            element:<AddItem></AddItem>
         },
         {
            path:'myCart',
            element:<MyCart></MyCart>
         },
         {
            path:'allUsers',
            element:<AllUsers></AllUsers>
         },
         {
            path:'userHome',
            element:<UserHome></UserHome>
         },
         {
            path:'mangeBooking',
            element:<MangeBooking></MangeBooking>
         },
         {
            path:'mangeItem',
            element:<MangeItem></MangeItem>
         },
         {
            path:'updateProduct/:id',
            element:<UpdateProduct></UpdateProduct>
         }

      ]
   }
])
export default router