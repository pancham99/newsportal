'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaFacebookF, FaChevronDown, FaBell } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { base_api_url } from '../config/config';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';

const navMenuList = [
    { name: "Home", slug: "/", isHome: true },
    { name: "भारत", slug: "राष्ट्रीय" },
    { name: "राज्य", slug: "राज्य" },
    { name: "दुनिया", slug: "अंतरराष्ट्रीय" },
    { name: "बिज़नेस", slug: "बिजनेस" },
    { name: "खेल", slug: "खेल" },
    { name: "टेक्नोलॉजी", slug: "टेक" },
    { name: "मनोरंजन", slug: "मनोरंजन" },
];
const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user: authUser, logout: authLogout, openModal } = useAuth();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const { data } = useFetch(`${base_api_url}/api/category/all`);
    const categories = data?.categories || [];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        const updateClock = () => {
            const now = moment().tz("Asia/Kolkata");
            setCurrentTime(now.format("dddd, MMMM D, YYYY | h:mm A"));
        };
        updateClock();
        const timer = setInterval(updateClock, 10000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        window.location.href = "/";
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/news/search?value=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
        }
    };

    const handleStateChange = (e) => {
        const stateVal = e.target.value;
        setSelectedState(stateVal);
        if (stateVal) {
            router.push(`/news/state/${stateVal}`);
            setMobileMenuOpen(false);
            setCategoryDropdownOpen(false);
        }
    };

    const decodedCurrentCategory = decodeURIComponent(pathname.split("/")[3] || "");
    return (
        <header className="w-full font-sans sticky top-0 z-50 shadow-md">
            {/* Top Bar */}
            <div className="bg-gray-50 text-gray-700 text-xs py-1.5 px-4 md:px-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-0">
                    {/* Left: Date & Time */}
                    <div className="font-medium text-gray-600 text-[11px] sm:text-xs md:text-sm tracking-wide text-center sm:text-left">
                        {currentTime || moment().tz("Asia/Kolkata").format("dddd, MMMM D, YYYY | h:mm A")}
                    </div>

                    {/* Right: Login/Signup & Social Icons */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {(authUser || user) ? (
                            <button
                                onClick={handleLogout}
                                className="text-[#C92726] hover:text-red-700 font-semibold text-xs md:text-sm hover:underline transition-colors"
                            >
                                Logout ({(authUser || user)?.name || (authUser || user)?.role})
                            </button>
                        ) : (
                            <button
                                onClick={() => openModal('login')}
                                className="text-[#C92726] hover:text-red-700 font-semibold text-xs md:text-sm hover:underline transition-colors cursor-pointer"
                            >
                                Login / Signup
                            </button>
                        )}

                        {/* Social Media Buttons with Official Brand Colors & Hover Animations */}
                        <div className="flex items-center gap-2 ml-1">
                            <Link
                                target="_blank"
                                href="https://www.facebook.com/people/Top-Briefing/61552965021716/"
                                aria-label="Facebook"
                                className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm"
                            >
                                <FaFacebookF className="text-[12px]" />
                            </Link>
                            <Link
                                target="_blank"
                                href="https://www.instagram.com/topbriefing/"
                                aria-label="Instagram"
                                className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#cc2366] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm"
                            >
                                <FaInstagram className="text-[12px] text-white" />
                            </Link>
                            <Link
                                target="_blank"
                                href="https://www.youtube.com/results?search_query=topbriefing"
                                aria-label="YouTube"
                                className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm"
                            >
                                <IoLogoYoutube className="text-[13px]" />
                            </Link>
                            <Link
                                target="_blank"
                                href="https://x.com/topbriefing"
                                aria-label="X"
                                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 border border-gray-300 shadow-sm"
                            >
                                <FaXTwitter className="text-[11px]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Nav Bar: Deep Red background */}
            <div className="bg-[#C92726] text-white relative">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between">

                    {/* Left: Mobile Menu Toggle & Logo */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white p-1 hover:bg-black/20 rounded"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <IoClose className="text-2xl" /> : <HiMenu className="text-2xl" />}
                        </button>

                        {/* Top Briefing Logo */}
                        <Link href="/" className="flex items-center group py-0.5">
                            <Image
                                src="/logo.png"
                                alt="Top Briefing Logo"
                                width={180}
                                height={50}
                                priority
                                className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {/* Home Link */}
                        <Link
                            href="/"
                            className={`px-3 py-1.5 rounded text-sm lg:text-base font-semibold transition-colors ${pathname === "/" ? "bg-[#700000] font-bold text-white shadow-inner" : "text-white hover:bg-black/20"
                                }`}
                        >
                            Home
                        </Link>

                        {/* Category Dropdown Toggle */}
                        <div
                            className="relative"
                            onMouseEnter={() => setCategoryDropdownOpen(true)}
                            onMouseLeave={() => setCategoryDropdownOpen(false)}
                        >
                            <button
                                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                                className={`px-3 py-1.5 rounded text-sm lg:text-base font-semibold transition-colors flex items-center gap-1 ${decodedCurrentCategory && !navMenuList.some(n => n.slug === decodedCurrentCategory)
                                    ? "bg-[#700000] font-bold text-white"
                                    : "text-white hover:bg-black/20"
                                    }`}
                            >
                                <span>Category</span>
                                <FaChevronDown className={`text-[10px] transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {categoryDropdownOpen && (
                                <div className="absolute left-0 top-full mt-0.5 w-56 bg-white text-gray-900 rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                                    <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1 mb-1">
                                        सभी कैटेगरी
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {categories && categories.length > 0 ? (
                                            categories.filter(c => c && c.category).map((cat, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={`/news/category/${cat.category}`}
                                                    onClick={() => setCategoryDropdownOpen(false)}
                                                    className="block px-4 py-1.5 text-sm font-medium text-gray-800 hover:bg-red-50 hover:text-[#900000] transition-colors"
                                                >
                                                    {cat.category}
                                                </Link>
                                            ))
                                        ) : (
                                            <>
                                                <Link href="/news/category/राजनीति" onClick={() => setCategoryDropdownOpen(false)} className="block px-4 py-1.5 text-sm font-medium hover:bg-red-50 hover:text-[#900000]">राजनीति</Link>
                                                <Link href="/news/category/धर्म" onClick={() => setCategoryDropdownOpen(false)} className="block px-4 py-1.5 text-sm font-medium hover:bg-red-50 hover:text-[#900000]">धर्म</Link>
                                                <Link href="/news/category/लाइफस्टाइल" onClick={() => setCategoryDropdownOpen(false)} className="block px-4 py-1.5 text-sm font-medium hover:bg-red-50 hover:text-[#900000]">लाइफस्टाइल</Link>
                                                <Link href="/news/category/वीडियो" onClick={() => setCategoryDropdownOpen(false)} className="block px-4 py-1.5 text-sm font-medium hover:bg-red-50 hover:text-[#900000]">वीडियो</Link>
                                            </>
                                        )}
                                    </div>

                                    {/* State Selector in Dropdown */}
                                    <div className="border-t border-gray-100 mt-2 pt-2 px-3">
                                        <select
                                            value={selectedState}
                                            onChange={handleStateChange}
                                            className="w-full text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-red-600 cursor-pointer"
                                        >
                                            <option value="">--- राज्य चुनें ---</option>
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
                                </div>
                            )}
                        </div>

                        {/* Direct Category Nav Items matching reference design */}
                        {navMenuList.filter(item => !item.isHome).map((item, index) => {
                            const isActive = decodedCurrentCategory === item.slug || decodedCurrentCategory === item.name;
                            return (
                                <Link
                                    key={index}
                                    href={`/news/category/${item.slug}`}
                                    className={`px-2.5 py-1.5 rounded text-sm lg:text-base font-semibold transition-colors whitespace-nowrap ${isActive ? "bg-[#700000] font-bold text-white shadow-inner" : "text-white hover:bg-black/20"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Search & Subscribe Action */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-1 text-white hover:opacity-80 transition-opacity"
                            aria-label="Search news"
                        >
                            <IoSearchOutline className="text-xl md:text-2xl" />
                        </button>

                        <button
                            onClick={() => openModal('subscribe')}
                            className="border border-white/90 rounded-full px-3.5 py-1 text-xs md:text-sm font-bold text-white flex items-center gap-1.5 hover:bg-white hover:text-[#900000] transition-all shadow-sm cursor-pointer"
                        >
                            <FaBell className="text-xs" />
                            <span>SUBSCRIBE</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#800000] border-t border-red-800 px-4 py-3 text-white space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-base font-bold border-b border-red-700/50"
                        >
                            Home
                        </Link>

                        <div className="grid grid-cols-2 gap-2 py-2">
                            {navMenuList.filter(item => !item.isHome).map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={`/news/category/${item.slug}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-1.5 px-2 bg-black/10 rounded text-sm font-medium hover:bg-black/20 text-center"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* All Categories inside mobile drawer */}
                        <div className="pt-2 border-t border-red-700/50">
                            <div className="text-xs font-bold text-red-200 uppercase tracking-wider mb-2">अन्य कैटेगरी</div>
                            <div className="grid grid-cols-2 gap-2">
                                {categories && categories.map((cat, i) => (
                                    <Link
                                        key={i}
                                        href={`/news/category/${cat.category}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-1 px-2 text-xs bg-black/20 rounded text-center truncate"
                                    >
                                        {cat.category}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* State selection */}
                        <div className="pt-3 border-t border-red-700/50">
                            <select
                                value={selectedState}
                                onChange={handleStateChange}
                                className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1.5 outline-none"
                            >
                                <option value="">--- राज्य चुनें ---</option>
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
                    </div>
                )}
            </div>

            {/* Popup Search Overlay */}
            {searchOpen && (
                <div className="bg-gray-900/95 border-b border-gray-800 py-3 px-4 shadow-xl">
                    <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="खबरें खोजें..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            className="flex-1 border border-gray-700 rounded px-4 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        <button
                            type="submit"
                            className="bg-[#900000] text-white px-5 py-2 rounded font-bold text-sm hover:bg-red-700 transition"
                        >
                            खोजें
                        </button>
                        <button
                            type="button"
                            onClick={() => setSearchOpen(false)}
                            className="text-gray-400 hover:text-white p-2"
                        >
                            <IoClose className="text-xl" />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;
