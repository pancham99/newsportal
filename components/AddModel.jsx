// components/FirstTimeModal.tsx
"use client";

import { useEffect, useState } from "react";

const AddModel = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Welcome to Top Brefing</h2>
        <p className="mb-2">Stay updated with the latest news!</p>
        <p className="mb-4 text-sm text-gray-700">
          If you want to advertise on our website, please <a href="/contact" className="text-blue-600 underline">contact us</a>.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>

  );
}

export default AddModel;
