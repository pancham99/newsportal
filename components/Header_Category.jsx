"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { base_api_url } from "../config/config";
import useFetch from "../hooks/useFetch";

const Header_Category = () => {
  const path = usePathname();
  const router = useRouter();
  const { data } = useFetch(`${base_api_url}/api/category/all`);
  const categories = data?.categories || [];

  const decodedCategory = decodeURIComponent(path.split("/")[3] || "");

  const [state, setState] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    if (selectedState) {
      router.push(`/news/state/${selectedState}`);
      setShowMobileMenu(false);
    }
  };

  useEffect(() => {
    if (path === "/") {
      setState("");
    }
  }, [path]);

  return (
    <div className="w-full relative">
      {/* Top Navbar */}
      <div className="bg-[#c80000] text-white uppercase font-semibold">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-[50px] relative">

          {/* Mobile Menu Button */}
          <div
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-3xl md:hidden cursor-pointer w-[45px] flex justify-center items-center h-full hover:bg-black/20"
          >
            <BsList />
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center flex-wrap">
            <Link
              href="/"
              className={`px-2 py-3 text-sm ${
                path === "/" ? "bg-black/20 border-b-4 border-blue-800" : ""
              }`}
            >
              होम
            </Link>

            {categories
              .filter((c) => c.category !== null)
              .map((c, i) => (
                <Link
                  key={i}
                  href={`/news/category/${c.category}`}
                  className={`px-2 py-3 text-sm ${
                    decodedCategory === c.category
                      ? "bg-black/20 border-b-4 border-blue-800"
                      : ""
                  }`}
                >
                  {c.category}
                </Link>
              ))}
          </div>

          {/* State Dropdown */}
          <div className="hidden sm:block">
            <select
              value={state}
              onChange={handleStateChange}
              className="h-[35px] text-black rounded-md px-2 border border-gray-300 focus:border-red-500 outline-none"
            >
              <option value="">---राज्य चुनें---</option>
              <option value="बिहार">बिहार</option>
              <option value="उत्तर प्रदेश">उत्तर प्रदेश</option>
              <option value="दिल्ली">दिल्ली</option>
              <option value="मध्य प्रदेश">मध्य प्रदेश</option>
              <option value="राजस्थान">राजस्थान</option>
              <option value="महाराष्ट्र">महाराष्ट्र</option>
              <option value="गुजरात">गुजरात</option>
              <option value="कर्नाटक">कर्नाटक</option>
              <option value="तमिलनाडु">तमिलनाडु</option>
              <option value="पश्चिम बंगाल">पश्चिम बंगाल</option>
            </select>
          </div>

          {/* Search Icon */}
          <div className="relative">
            <div
              onClick={() => setShowSearch(!showSearch)}
              className="cursor-pointer w-[45px] flex justify-center items-center h-full hover:bg-black/20"
            >
              {showSearch ? <IoClose size={20} /> : <IoSearch size={20} />}
            </div>

            {/* Search Dropdown */}
            {showSearch && (
              <div className="absolute right-0 top-[50px] bg-white shadow-lg p-3 w-[95vw] sm:w-[300px] z-50">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 border border-gray-300 px-2 h-[35px] outline-none"
                  />
                  <button className="w-[45px] bg-red-600 text-white flex justify-center items-center hover:bg-red-700">
                    <IoSearch />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden grid grid-cols-3 bg-white shadow-md px-2 py-3 space-y-2">

          <Link
            href="/"
            onClick={() => setShowMobileMenu(false)}
            className="block py-2 text-sm font-semibold border-b"
          >
            होम
          </Link>

          {categories
            .filter((c) => c.category !== null)
            .map((c, i) => (
              <Link
                key={i}
                href={`/news/category/${c.category}`}
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-sm font-semibold border-b"
              >
                {c.category}
              </Link>
            ))}

          {/* Mobile State Dropdown */}
          <select
            value={state}
            onChange={handleStateChange}
            className="w-full hidden h-[40px] text-black rounded-md px-2 border border-gray-300 focus:border-red-500 outline-none mt-2"
          >
            <option value="">---राज्य चुनें---</option>
            <option value="बिहार">बिहार</option>
            <option value="उत्तर प्रदेश">उत्तर प्रदेश</option>
            <option value="दिल्ली">दिल्ली</option>
            <option value="मध्य प्रदेश">मध्य प्रदेश</option>
            <option value="राजस्थान">राजस्थान</option>
            <option value="महाराष्ट्र">महाराष्ट्र</option>
            <option value="गुजरात">गुजरात</option>
            <option value="कर्नाटक">कर्नाटक</option>
            <option value="तमिलनाडु">तमिलनाडु</option>
            <option value="पश्चिम बंगाल">पश्चिम बंगाल</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Header_Category;
