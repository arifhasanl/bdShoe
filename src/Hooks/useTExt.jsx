import axios from 'axios';
import React from 'react';

const AxiosPublic=axios.create({
baseURL:'http://localhost:5000'
})
const useTExt = () => {
   return AxiosPublic
};

export default useTExt;