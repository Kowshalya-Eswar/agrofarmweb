import { Link } from "react-router-dom";
const Footer = () => {
  return (
     <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgriFarm Store. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
            <Link to="/contact" className="hover:text-gray-300">Contact Us </Link>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
