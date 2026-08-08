"use client";

import { useState, useEffect } from "react";
import Subscribe from "./Subscribe";

const SubscribeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup only once
        const popupShown = localStorage.getItem("subscribe_popup");

        if (!popupShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const closeModal = () => {
        localStorage.setItem("subscribe_popup", "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4">

            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6">

                <button
                    onClick={closeModal}
                    className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-red-600"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold text-center text-red-600">
                    Stay Updated
                </h2>

                <p className="text-center text-gray-600 mt-2 mb-6">
                    Subscribe to receive the latest breaking news directly in your inbox.
                </p>

                <Subscribe
                    onSuccess={() => {
                        localStorage.setItem("subscribe_popup", "true");
                        setIsOpen(false);
                    }}
                />

            </div>

        </div>
    );
};

export default SubscribeModal;