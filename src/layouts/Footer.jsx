import { Link } from "react-router-dom";
import { logo } from "../assets";
import { navLinks, socials } from "../utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="w-[155px] h-[70px] mb-4">
                <Link to="/">
                  <img 
                    className="w-full h-full object-contain" 
                    src={logo} 
                    alt="B360 Development Logo"
                  />
                </Link>
              </div>
             
            </div>

            {/* Social Links */}
            <div className="mb-6">
              {/* <h3 className="text-lg font-semibold mb-4">Follow Us</h3> */}
              <div className="flex flex-wrap gap-4">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    to={social.link}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon && (
                      <Icon 
                        icon={social.icon} 
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
                      />
                    )}
                    <span className="text-sm font-medium">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} B360 Development. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact/Additional Info Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                {/* <Icon icon="mdi:email-outline" className="w-4 h-4" /> */}
                <span>Why Choose Us?</span>
              </div>
              <div className="flex items-center gap-2">
                {/* <Icon icon="mdi:phone-outline" className="w-4 h-4" /> */}
                <span>Emerald</span>
              </div>
              <div className="flex items-start gap-2">
                {/* <Icon icon="mdi:map-marker-outline" className="w-4 h-4 mt-0.5" /> */}
                <span>Oak West</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              <p>Made with ❤️ by B360 Development Team</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;