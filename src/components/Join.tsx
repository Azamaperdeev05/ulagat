import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Send, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function Join() {
  const location = useLocation();
  const [formType, setFormType] = useState<'club' | 'ensemble'>('club');

  useEffect(() => {
    if (location.state?.activeTab === 'ensemble') {
      setFormType('ensemble');
    }
  }, [location.state]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [book, setBook] = useState('');
  const [talent, setTalent] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return alert('Аты-жөніңізді жазыңыз');
    let message = '';
    if (formType === 'club') {
      message = `ULAGAT оқырман клубына өтінім (Кіру жарнасы: 2 000 ₸)\n\nАты-жөні: ${name}\nТелефон: ${phone}\nСүйікті кітабы немесе соңғы оқығаны: ${book}`;
    } else {
      message = `ULAGAT ҮНІ ансамбліне өтінім\n\nАты-жөні: ${name}\nТелефон: ${phone}\nӨнері немесе аспабы: ${talent}`;
    }
    const encoded = encodeURIComponent(message);
    trackEvent('lead_submit_whatsapp', { source: 'join-section', type: formType });
    window.open(`https://wa.me/77474476486?text=${encoded}`, '_blank');
  };

  return (
    <section id="join" className="py-24 lg:py-36 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/8 blur-3xl pointer-events-none" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] font-semibold text-accent tracking-widest uppercase">Қосылу • Жарна: 2 000 ₸</span>
            </div>

            <h2 className="text-3xl md:text-[42px] font-display font-semibold text-white leading-tight tracking-tight mb-6">
              Сен де осы рухани <span className="text-gray-400">ортаға қосыл.</span>
            </h2>
            <p className="text-base text-gray-400 font-light leading-relaxed mb-6 max-w-lg">
              Кітап оқу — жеке процесс болғанымен, оны талқылау — ортақ қуаныш. Клубқа кіру жарнасы — 2 000 ₸. Сіз тұрақты талқылауларға, баспа жеңілдігіне және шығармашылық ансамбльге қол жеткізесіз.
            </p>

            {/* Aibanu direct contact pill */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 max-w-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">Тікелей байланыс</div>
                  <div className="text-[14px] font-medium text-white">Айбану — үйлестіруші</div>
                  <div className="text-[12px] text-gray-400">+7 747 447 6486</div>
                </div>
                <a
                  href="https://wa.me/77474476486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-medium rounded-full transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://t.me/ulagat_krg_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors text-[13px]"
              >
                <Send className="w-3.5 h-3.5" /> Telegram
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/ulagat.krg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-700 text-gray-300 font-medium rounded-full hover:border-gray-500 hover:text-white transition-all text-[13px]"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-gray-800/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700/60 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-white">Өтінім қалдыру</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">Клубқа кіру жарнасы — 2 000 ₸</p>
              </div>
              
              <div className="flex p-1 bg-gray-900/90 rounded-xl border border-gray-700 w-fit shrink-0">
                <button 
                  onClick={() => setFormType('club')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                    formType === 'club' ? 'bg-accent text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>Клубқа</span>
                  <span className="text-[10px] opacity-80">2 000 ₸</span>
                </button>
                <button 
                  onClick={() => setFormType('ensemble')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                    formType === 'ensemble' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Ансамбльге
                </button>
              </div>
            </div>

            <div className="min-h-[350px]">
              <AnimatePresence mode="wait">
                {formType === 'club' ? (
                  <motion.form 
                    key="club"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name-club" className="text-[12px] font-medium text-gray-400">Аты-жөніңіз</label>
                      <input
                        type="text"
                        id="name-club"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all text-white placeholder-gray-500 text-[14px]"
                        placeholder="Атыңыз және тегіңіз"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone-club" className="text-[12px] font-medium text-gray-400">Телефон (WhatsApp)</label>
                      <input
                        type="tel"
                        id="phone-club"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all text-white placeholder-gray-500 text-[14px]"
                        placeholder="+7 7xx xxx xx xx"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="book" className="text-[12px] font-medium text-gray-400">Соңғы оқыған немесе сүйікті кітабыңыз</label>
                      <input
                        type="text"
                        id="book"
                        value={book}
                        onChange={(e) => setBook(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all text-white placeholder-gray-500 text-[14px]"
                        placeholder="Мысалы: Абай жолы, Көксерек"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full mt-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-colors text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Айбануға WhatsApp арқылы өтінім беру (2 000 ₸)</span>
                    </button>
                    <p className="text-[11px] text-gray-500 text-center font-light mt-1">
                      Хабарлама тікелей Айбанудың WhatsApp нөміріне (+7 747 447 6486) жіберіледі
                    </p>
                  </motion.form>
                ) : (
                  <motion.form 
                    key="ensemble"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name-ens" className="text-[12px] font-medium text-gray-400">Аты-жөніңіз</label>
                      <input
                        type="text"
                        id="name-ens"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all text-white placeholder-gray-500 text-[14px]"
                        placeholder="Атыңыз және тегіңіз"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone-ens" className="text-[12px] font-medium text-gray-400">Телефон</label>
                      <input
                        type="tel"
                        id="phone-ens"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all text-white placeholder-gray-500 text-[14px]"
                        placeholder="+7 7xx xxx xx xx"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="talent" className="text-[12px] font-medium text-gray-400">Сіздің өнеріңіз немесе аспабыңыз</label>
                      <input
                        type="text"
                        id="talent"
                        value={talent}
                        onChange={(e) => setTalent(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all text-white placeholder-gray-500 text-[14px]"
                        placeholder="Мысалы: Домбыра, Қобыз, Вокал"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full mt-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ансамбльге өтінім жіберу</span>
                    </button>
                    <p className="text-[11px] text-gray-500 text-center font-light mt-1">
                      Өтінім Айбанудың WhatsApp нөміріне (+7 747 447 6486) жіберіледі
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
