'use client';

import { useState } from 'react';

const AddContactFrom = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally send form data to API here
    alert('Thank you! We will get in touch soon.');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch for Advertisement</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Company/Brand</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition duration-300"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default AddContactFrom;
