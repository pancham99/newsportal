'use client';
import React, { useState, useEffect } from 'react';
import { base_api_url } from "../config/config"

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {


      const formData = new FormData();
      formData.append("email", email);

      const res = await fetch(`${base_api_url}/api/add/subscriber`, {
        method: "POST",
        body: formData, // form-data
      });

      const data = await res.json();
      setMessage(data.message || "Something went wrong");
       if (res.ok) {
        setEmail('');
      }

    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Failed to subscribe. Please try again.");
    }



  };

    // Auto hide message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [message]);

  return (
    <div className="w-full mt-2">
      <div className=" bg-red-500 rounded-full">


        <form onSubmit={handleSubscribe} className="flex w-full rounded-full border border-red-500">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-2/3 p-2 rounded-l-full  text-black outline-none border-none"
          />
          <button type="submit" className=" text-white font-semibold  px-2 ">
            Subscribe
          </button>
        </form>

    
      </div>
          {message && (
          <p className="text-center text-white text-sm mt-2">{message}</p>
        )}
    </div>
  );
};

export default Subscribe;
