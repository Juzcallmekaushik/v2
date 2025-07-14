import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { RiMenuFill, RiCloseFill } from "@remixicon/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" }
  ];

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-black border-b border-[#111111]">
        <div className="max-w-8xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="flex items-center cursor-pointer"
            >
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
            </Link>

            <div className="hidden md:flex space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white px-4 py-2 text-base font-inter font-semibold hover:text-gray-300 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <RiMenuFill className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-85 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsMenuOpen(false);
            }
          }}
          role="button"
          tabIndex={isMenuOpen ? 0 : -1}
          aria-label="Close menu"
        />

        <div
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-[#0b0b0b] transform transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link
              to="/"
              className="text-white text-lg font-inter font-bold cursor-pointer hover:text-gray-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white font-bold hover:text-gray-300 transition-colors duration-200 p-1"
              aria-label="Close menu"
            >
              <RiCloseFill className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white text-lg font-inter font-medium hover:text-gray-300 transition-colors duration-200 py-2 px-2 block w-full text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
