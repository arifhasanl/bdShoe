import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const axiosSecure=axios.create({
   baseURL:'https://bd-hub-server.vercel.app'
})
const useAxiosSecure = () => {
   const navigate=useNavigate();
   const {logOut}=useAuth()
   axiosSecure.interceptors.request.use((config)=>{
      const token=localStorage.getItem('access-token');
     if(token){
       config.headers.authorization=`Bearer ${token}`
     }
      return config
   }),(err)=>{
      return Promise.reject(err)
   }
   //interceptors 401 and 403 status
   
   axiosSecure.interceptors.response.use((response)=>{
      return response
   },async(error)=>{
      const status=error.response.status;
      if(status===401||status===403){
         // await logOut()
         // navigate('/login')
      }
      return Promise.reject(error)
   }
)
   return axiosSecure
};

export default useAxiosSecure;