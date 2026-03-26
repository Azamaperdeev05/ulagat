import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  '/IMG_9284.JPG.jpeg',
  '/IMG_9289.JPG.jpeg',
  '/IMG_9302.JPG.jpeg',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="ULAGAT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 lg:pt-40 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[12px] font-medium text-white/80 tracking-wide">
              Оқырман клубы
            </span>
          </motion.div>

          <h1 className="text-[36px] sm:text-5xl md:text-6xl lg:text-[64px] font-display font-semibold text-white leading-[1.08] mb-6 tracking-tight">
            Оқу мәдениетін
            <br />
            <span className="text-white/60">қалыптастыратын орта.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10 max-w-lg">
            Кітап. Ой. Рух. Қауымдастық. Бізбен бірге тұлғалық даму мен рухани кемелдену жолына түсіңіз.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#join"
              className="group flex justify-center items-center gap-2.5 px-7 py-3.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors text-[14px]"
            >
              Клубқа қосылу
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
            <a
              href="#about"
              className="flex justify-center items-center px-7 py-3.5 text-white/80 font-medium rounded-full hover:bg-white/10 transition-colors text-[14px] border border-white/15"
            >
              Толығырақ білу
            </a>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-12">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentImage ? 'w-8 bg-white' : 'w-3 bg-white/30'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8"
        >
          {[
            { value: '2022', label: 'Құрылған жылы' },
            { value: '800+', label: 'Тұрақты оқырман' },
            { value: '120+', label: 'Іс-шаралар' },
            { value: '50+', label: 'Талқыланған кітап' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-[12px] text-white/50 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
