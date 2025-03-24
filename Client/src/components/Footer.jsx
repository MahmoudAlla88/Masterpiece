import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-[#340159] text-white py-8"
      
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About Us</h3>
          <p className="text-gray-400">
            A platform dedicated to connecting businesses with influencers to promote products and services easily and efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'Influencers', 'How It Works', 'Contact Us'].map((link, index) => (
              <li key={index}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><MapPin size={18} /> 123, Zarqa, Jordan</li>
            <li className="flex items-center gap-2"><Phone size={18} /> +123 456 7890</li>
            <li className="flex items-center gap-2"><Mail size={18} /> info@example.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2025 BrandBridge. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
