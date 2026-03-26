import { Instagram, Send, Mail, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 lg:py-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2.5">
              <img src="/ulagat (1).svg" alt="ULAGAT" className="w-7 h-7 object-contain brightness-0 invert" />
              <span className="font-display text-xl font-semibold tracking-tight">ULAGAT</span>
            </a>
            <p className="text-[13px] text-gray-400 font-light leading-relaxed max-w-xs">
              Кітап. Ой. Рух. Қауымдастық. Ұлттық рухты оятатын оқырман ортасы.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-semibold text-accent tracking-widest uppercase">Навигация</h4>
            <ul className="flex flex-col gap-3">
              {['Біз туралы', 'Іс-шаралар', 'Кітаптар', 'Галерея', 'Блог'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-[13px] text-gray-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-semibold text-accent tracking-widest uppercase">Байланыс</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:azamaperdeev05@gmail.com" className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" /> azamaperdeev05@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/77784828985" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-white transition-colors">
                  <Send className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/ulagat.krg/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.threads.com/@ulagat.krg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-white transition-colors">
                  <BookOpen className="w-3.5 h-3.5" /> Threads
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-semibold text-accent tracking-widest uppercase">Жаңалықтар</h4>
            <p className="text-[13px] text-gray-400 font-light">Алдағы іс-шаралар туралы бірінші болып біліңіз.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-[13px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" />
              <button type="button" className="px-4 py-2.5 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-colors text-[12px]">
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-gray-500">&copy; {new Date().getFullYear()} ULAGAT. Барлық құқықтар қорғалған.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[12px] text-gray-500 hover:text-white transition-colors">Құпиялылық</Link>
            <Link to="/terms" className="text-[12px] text-gray-500 hover:text-white transition-colors">Шарттар</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
