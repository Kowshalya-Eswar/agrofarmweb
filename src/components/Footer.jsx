import { Link } from "react-router-dom"; // Ensure this import is present

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 rounded-t-xl shadow-lg">
      <div className="container mx-auto px-6 text-center text-sm">
        <p className="mb-4">&copy; {new Date().getFullYear()} cocoFields Store. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link to="/privacy" className="hover:text-gray-300 transition duration-200">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300 transition duration-200">Terms of Service</Link>
          <Link to="/contactus" className="hover:text-gray-300 transition duration-200">Contact Us</Link>
          <Link to="/cancel-refund" className="hover:text-gray-300 transition duration-200">Cancellation & Refund</Link>
          <Link to="/shipping" className="hover:text-gray-300 transition duration-200">Shipping & Delivery</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
