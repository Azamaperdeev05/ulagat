import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white" />

      {/* Floating ambient circles */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gray-300/30 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] font-medium text-gray-600 tracking-wide">
                Оқырман клубы
              </span>
            </motion.div>

            <h1 className="text-[40px] sm:text-5xl md:text-6xl lg:text-[64px] font-display font-semibold text-gray-900 leading-[1.08] mb-6 tracking-tight">
              Оқу мәдениетін
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent">
                қалыптастыратын орта.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-lg">
              Кітап. Ой. Рух. Қауымдастық. Бізбен бірге тұлғалық даму мен рухани кемелдену жолына түсіңіз.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#join"
                className="group flex justify-center items-center gap-2.5 px-7 py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors text-[14px] shadow-lg shadow-gray-900/10"
              >
                Клубқа қосылу
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>
              <a
                href="#about"
                className="flex justify-center items-center px-7 py-3.5 text-gray-600 font-medium rounded-full hover:bg-gray-100 transition-colors text-[14px]"
              >
                Толығырақ білу
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl shadow-gray-900/10">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2670&auto=format&fit=crop"
                alt="Кітаптар"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-gray-900/5 border border-gray-200/60 max-w-[240px]"
            >
              <p className="font-display text-[15px] font-semibold text-gray-900 leading-snug mb-1.5">
                "Кітап — білім бұлағы"
              </p>
              <p className="text-[11px] font-medium text-gray-400 tracking-wide">
                Халық даналығы
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-10"
        >
          {[
            { value: '2022', label: 'Құрылған жылы' },
            { value: '800+', label: 'Тұрақты оқырман' },
            { value: '120+', label: 'Іс-шаралар' },
            { value: '50+', label: 'Талқыланған кітап' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-display font-semibold text-gray-900 tracking-tight">
                {stat.value}
              </p>
              <p className="text-[13px] text-gray-500 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
