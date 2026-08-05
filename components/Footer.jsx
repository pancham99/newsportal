import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Footer = ({ news = [] }) => {
    return (
        <footer className="w-full bg-[#111827] text-gray-300 font-sans border-t border-gray-800 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* 4 Columns Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
                    
                    {/* Column 1: Logo & Summary */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src="/logo.png"
                                alt="Top Briefing Logo"
                                width={140}
                                height={50}
                                className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                            देश और दुनिया की हर बड़ी खबर, सबसे पहले, सबसे तेज.
                        </p>
                    </div>

                    {/* Column 2: Quick Links (त्वरित लिंक) */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white tracking-wide border-l-2 border-[#cc0000] pl-2">
                            त्वरित लिंक
                        </h3>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/about" className="hover:text-red-500 transition-colors">हमारे बारे में</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-red-500 transition-colors">संपर्क करें</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-red-500 transition-colors">प्राइवेसी पॉलिसी</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-red-500 transition-colors">शर्तें और नियम</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: News Categories (खबरें) */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white tracking-wide border-l-2 border-[#cc0000] pl-2">
                            खबरें
                        </h3>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
                            <Link href="/news/category/राष्ट्रीय" className="hover:text-red-500 transition-colors">राष्ट्रीय</Link>
                            <Link href="/news/category/खेल" className="hover:text-red-500 transition-colors">खेल</Link>
                            <Link href="/news/category/राज्य" className="hover:text-red-500 transition-colors">राज्य</Link>
                            <Link href="/news/category/टेक" className="hover:text-red-500 transition-colors">टेक</Link>
                            <Link href="/news/category/दुनिया" className="hover:text-red-500 transition-colors">दुनिया</Link>
                            <Link href="/news/category/मनोरंजन" className="hover:text-red-500 transition-colors">मनोरंजन</Link>
                            <Link href="/news/category/बिजनेस" className="hover:text-red-500 transition-colors">बिजनेस</Link>
                            <Link href="/news/category/लाइफस्टाइल" className="hover:text-red-500 transition-colors">लाइफस्टाइल</Link>
                        </div>
                    </div>

                    {/* Column 4: Follow Us (हमें फॉलो करें) */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white tracking-wide border-l-2 border-[#cc0000] pl-2">
                            हमें फॉलो करें
                        </h3>
                        <div className="flex items-center gap-2 pt-1">
                            <Link 
                                target="_blank" 
                                href="https://www.facebook.com/people/Top-Briefing/61552965021716/" 
                                aria-label="Facebook"
                                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm"
                            >
                                <FaFacebookF className="text-xs" />
                            </Link>
                            <Link 
                                target="_blank" 
                                href="https://www.instagram.com/topbriefing/" 
                                aria-label="Instagram"
                                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#cc2366] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm"
                            >
                                <FaInstagram className="text-xs" />
                            </Link>
                            <Link 
                                target="_blank" 
                                href="https://www.youtube.com/results?search_query=topbriefing" 
                                aria-label="YouTube"
                                className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm"
                            >
                                <IoLogoYoutube className="text-sm" />
                            </Link>
                            <Link 
                                target="_blank" 
                                href="https://x.com/topbriefing" 
                                aria-label="X"
                                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition-opacity border border-gray-700 shadow-sm"
                            >
                                <FaXTwitter className="text-xs" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar Copyright */}
                <div className="pt-6 text-center text-xs text-gray-500">
                    <p>© 2026 Top Briefing, सभी अधिकार सुरक्षित.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;