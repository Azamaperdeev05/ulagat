import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Send } from 'lucide-react';

export default function Join() {
  return (
    <section id="join" className="py-24 lg:py-36 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4">Қосылу</span>
            <h2 className="text-3xl md:text-[42px] font-display font-semibold text-white leading-tight tracking-tight mb-6">
              Сен де осы рухани <span className="text-gray-400">ортаға қосыл.</span>
            </h2>
            <p className="text-base text-gray-400 font-light leading-relaxed mb-8 max-w-lg">
              Кітап оқу — жеке процесс болғанымен, оны талқылау — ортақ қуаныш.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors text-[13px]">
                <Send className="w-3.5 h-3.5" /> Telegram
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="https://www.instagram.com/ulagat.krg/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-700 text-gray-300 font-medium rounded-full hover:border-gray-500 hover:text-white transition-all text-[13px]">
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-gray-800/50 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-gray-700/50"
          >
            <h3 className="text-xl font-display font-semibold text-white mb-6">Өтінім қалдыру</h3>
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[12px] font-medium text-gray-400">Аты-жөніңіз</label>
                <input type="text" id="name" className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all text-white placeholder-gray-500 text-[14px]" placeholder="Асан Үсенов" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-[12px] font-medium text-gray-400">Телефон</label>
                <input type="tel" id="phone" className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all text-white placeholder-gray-500 text-[14px]" placeholder="+7 700 000 0000" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="book" className="text-[12px] font-medium text-gray-400">Сүйікті кітабыңыз</label>
                <input type="text" id="book" className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all text-white placeholder-gray-500 text-[14px]" placeholder="Абай жолы" />
              </div>
              <button type="button" className="w-full mt-2 px-6 py-3.5 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-colors text-[14px]">
                Жіберу
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
