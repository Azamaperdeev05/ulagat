import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Біз туралы', href: '#about' },
    { name: 'Іс-шаралар', href: '#events' },
    { name: 'Кітаптар', href: '#books' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Блог', href: '#blog' },
    { name: 'Команда', href: '#team' },
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
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/ulagat (1).svg"
            alt="ULAGAT Logo"
            className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-xl font-semibold tracking-tight text-gray-900">
            ULAGAT
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#join"
            className="px-5 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-full hover:bg-gray-800 transition-all duration-200 hover:shadow-lg"
          >
            Қосылу
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-900 p-1"
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
              <a
                href="#join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 px-5 py-3 bg-gray-900 text-white text-center text-[13px] font-medium rounded-full hover:bg-gray-800 transition-all"
              >
                Қосылу
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
