// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

// // const ContactUs = () => {
// //   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form Submitted", formData);
// //   };

// //   return (
// //     <>

// //     <section className="bg-gray-100 py-12 px-4 md:px-8">
// //       <div className="max-w-6xl mx-auto flex flex-wrap gap-6 md:flex-nowrap">
// //         {/* Contact Form */}
// //         <motion.div
// //           className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
// //           initial={{ opacity: 0, y: 50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Your Name"
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //             />
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Your Email"
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //             <textarea
// //               name="message"
// //               placeholder="Your Message"
// //               rows="5"
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={formData.message}
// //               onChange={handleChange}
// //               required
// //             ></textarea>
// //             <motion.button
// //               type="submit"
// //               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
// //               whileHover={{ scale: 1.05 }}
// //             >
// //               Send Message
// //             </motion.button>
// //           </form>
// //         </motion.div>

// //         {/* Contact Information */}
// //         <motion.div
// //           className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Information</h2>
// //           <ul className="space-y-4 text-gray-700">
// //             <li className="flex items-center"><FaMapMarkerAlt className="text-blue-600 mr-3" />123, Zarqa, Jordan</li>
// //             <li className="flex items-center"><FaPhone className="text-blue-600 mr-3" /> +962 796897579</li>
// //             <li className="flex items-center"><FaEnvelope className="text-blue-600 mr-3" /> mahmoudsuleiman689@gmail.com</li>
// //           </ul>

// //           {/* Social Media Links */}
// //           <div className="mt-6">
// //             <h3 className="text-xl font-semibold text-blue-900 mb-3">Follow Us</h3>
// //             <div className="flex gap-4">
// //               <a href="https://web.facebook.com/hamooda.alla/about?locale=ar_AR" className="text-blue-600 text-xl hover:text-blue-800 transition"><FaFacebookF /></a>
// //               <a href="https://www.linkedin.com/in/mahmoud-suliman-807547280/" className="text-blue-600 text-xl hover:text-blue-800 transition"><FaTwitter /></a>
// //               <a href="#" className="text-blue-600 text-xl hover:text-blue-800 transition"><FaInstagram /></a>
// //               <a href="#" className="text-blue-600 text-xl hover:text-blue-800 transition"><FaLinkedinIn /></a>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </section>

// //     </>
// //   );
// // };

// // export default ContactUs;
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//   };

//   return (
//     <>
//     <section className="bg-gray-100 py-12 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto flex flex-wrap gap-6 md:flex-nowrap">
//         {/* Contact Form */}
//         <motion.div
//           className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <textarea
//               name="message"
//               placeholder="Your Message"
//               rows="5"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//             <motion.button
//               type="submit"
//               className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
//               style={{ backgroundColor: "#EA0054" }}
//               whileHover={{ scale: 1.05 }}
//             >
//               Send Message
//             </motion.button>
//           </form>
//         </motion.div>

//         {/* Contact Information */}
//         <motion.div
//           className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
//           <ul className="space-y-4 text-gray-700">
//             <li className="flex items-center"><FaMapMarkerAlt className="text-red-600 mr-3" style={{ color: "#EA0054" }} />123, Zarqa, Jordan</li>
//             <li className="flex items-center"><FaPhone className="text-red-600 mr-3" style={{ color: "#EA0054" }} /> +962 796897579</li>
//             <li className="flex items-center"><FaEnvelope className="text-red-600 mr-3" style={{ color: "#EA0054" }} /> mahmoudsuleiman689@gmail.com</li>
//           </ul>

//           {/* Social Media Links */}
//           <div className="mt-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow Us</h3>
//             <div className="flex gap-4">
//               <a href="https://web.facebook.com/hamooda.alla/about?locale=ar_AR" className="text-red-600 text-xl hover:text-red-800 transition" style={{ color: "#EA0054" }}><FaFacebookF /></a>
//               <a href="https://www.linkedin.com/in/mahmoud-suliman-807547280/" className="text-red-600 text-xl hover:text-red-800 transition" style={{ color: "#EA0054" }}><FaTwitter /></a>
//               <a href="#" className="text-red-600 text-xl hover:text-red-800 transition" style={{ color: "#EA0054" }}><FaInstagram /></a>
//               <a href="#" className="text-red-600 text-xl hover:text-red-800 transition" style={{ color: "#EA0054" }}><FaLinkedinIn /></a>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//     </>
//   );
// };

// export default ContactUs;


import { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/contact",
        formData
      );
      console.log(formData);
     
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "" }); 
   
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response ? error.response.data.error : "Something went wrong.",
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-6 md:flex-nowrap">
        
        {/* Contact Form */}
        <motion.div
          className="flex-1 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#D63384]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D63384] transition-all"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D63384] transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D63384] transition-all"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D63384] to-[#6F42C1] text-white py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="flex-1 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#D63384]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-[#D63384] mr-3" />
              123, Zarqa, Jordan
            </li>
            <li className="flex items-center">
              <FaPhone className="text-[#D63384] mr-3" />
              +962 796897579
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-[#D63384] mr-3" />
              mahmoudsuleiman689@gmail.com
            </li>
          </ul>

          {/* Social Media Links */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://web.facebook.com/hamooda.alla/about?locale=ar_AR" 
                className="text-[#D63384] text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://www.linkedin.com/in/mahmoud-suliman-807547280/" 
                className="text-[#D63384] text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="text-[#D63384] text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                className="text-[#D63384] text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
