import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 20);
      }
    };
    
    if (!isHomePage) {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { name: 'Біз туралы', href: '/#about' },
    { name: 'Іс-шаралар', href: '/#events' },
    { name: 'Кітаптар', href: '/#books' },
    { name: 'Галерея', href: '/#gallery' },
    { name: 'Блог', href: '/#blog' },
    { name: 'Команда', href: '/#team' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/ulagat (1).svg"
            alt="ULAGAT Logo"
            className={`w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-105 ${
              !isScrolled ? 'brightness-0 invert' : ''
            }`}
          />
          <span className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}>
            ULAGAT
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[13px] font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/#join"
            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-300 hover:shadow-lg ${
              isScrolled 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            Қосылу
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-1 transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors py-3 border-b border-gray-100 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/#join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 px-5 py-3 bg-gray-900 text-white text-center text-[13px] font-medium rounded-full hover:bg-gray-800 transition-all"
              >
                Қосылу
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
