import axios from 'axios';
import React from 'react';

const AxiosPublic=axios.create({
baseURL:'https://bd-hub-server.vercel.app'
})
const useAxiosPublic = () => {
   return AxiosPublic
};

export default useAxiosPublic;