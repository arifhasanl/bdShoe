import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom';

const PrivetRoute = ({children}) => {
   const {user,isLoading}=useContext(AuthContext);
  if(isLoading){
    return  <p>Loading ...</p>
   }
   if(user){
      return children
   }
   return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default PrivetRoute;