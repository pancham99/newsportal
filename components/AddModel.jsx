// // components/FirstTimeModal.tsx
// "use client";
// import { useEffect, useState } from 'react';
// import { IoMdClose } from "react-icons/io";

// const AddModel = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", form);

//     setIsOpen(false);
//   };

//   useEffect(() => {
//     // setIsOpen(true);
//     const hasVisited = localStorage.getItem("hasVisited");
//     if (!hasVisited) {
//       setIsOpen(true);
//       localStorage.setItem("hasVisited", "true");
//     }
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
//       <div className="bg-white p-2 lg:p-4 rounded shadow-lg w-full max-w-md">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold mb-4">Contact Us</h2>

//           <button
//             onClick={() => setIsOpen(false)}
//             className=" text-red-600  rounded flex items-center justify-center hover:bg-slate-50 transition-colors duration-300"
//           >
//            <IoMdClose size={28}/>
//           </button>
//         </div>
//         <p className="mb-4 text-sm text-gray-700">
//           Want to advertise with us or get in touch? Fill out the form below!
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Message</label>
//             <textarea
//               name="message"
//               rows="2"
//               value={form.message}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>

//           <div className="flex justify-center items-center ">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
//             >
//               Send Message
//             </button>
//             {/* <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="text-gray-600 hover:text-black"
//             >
//               Cancel
//             </button> */}
//           </div>
//         </form>
//       </div>
//     </div>

//   );
// }

// export default AddModel;
