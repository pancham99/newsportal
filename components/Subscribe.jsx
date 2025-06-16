'use client';
import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    // यहां तू API से backend पर भेज सकता है
  };

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
    </div>
  );
};

export default Subscribe;
