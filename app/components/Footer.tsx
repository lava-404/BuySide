export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-5xl text-white font-[Instrument_Serif]">
            BuySide
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Curated home essentials that bring comfort, class, and calm into
            every corner of your life.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-violet-400 transition">Kitchen</a></li>
            <li><a href="#" className="hover:text-violet-400 transition">Home Decor</a></li>
            <li><a href="#" className="hover:text-violet-400 transition">Storage</a></li>
            <li><a href="#" className="hover:text-violet-400 transition">Cleaning</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-violet-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-violet-400 transition">Track Order</a></li>
            <li><a href="#" className="hover:text-violet-400 transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-violet-400 transition">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe for fresh arrivals and exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-md px-3 py-2 text-sm text-gray-800 focus:outline-none"
            />
            <button className="bg-violet-600 text-white px-4 py-2 rounded-r-md hover:bg-violet-700 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} HomeHaven. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-violet-400">Instagram</a>
          <a href="#" className="hover:text-violet-400">Twitter</a>
          <a href="#" className="hover:text-violet-400">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}
