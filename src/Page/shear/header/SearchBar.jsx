// client/src/components/SearchBar.js

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate=useNavigate()

  // Debouncing: প্রতিবার টাইপ করার সাথে সাথে API কল না করে একটি নির্দিষ্ট সময় পর কল করার জন্য
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const response = await fetch(`https://bd-hub-server.vercel.app/products/suggestions?q=${query}`);
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  
  // বাইরে ক্লিক করলে সাজেশন বক্স বন্ধ করার জন্য
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);
  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim()) {
      // URL পরিবর্তন করে products পেজে পাঠানো হচ্ছে
      navigate(`/singleProduct?q=${searchQuery}`);
      setQuery(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(query)
    setShowSuggestions(false);
    
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearchSubmit(suggestion)
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product name or category..."
          className="md:max-w-[250px] max-w-[100px] px-1 py-1 md:px-4 md:py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-1 md:px-4 py-1 md:py-2 cursor-pointer text-white bg-blue-600 border border-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;