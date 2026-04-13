import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSeo } from '../lib/seo';

export default function Apply() {
  useSeo({
    title: 'Клубқа қосылу - ULAGAT',
    description:
      'ULAGAT оқырман клубына онлайн өтінім беріңіз. Кітап талқылауына, мәдени ортаға және ULAGAT Үні ансамбліне қосылыңыз.',
    path: '/apply',
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    about: '',
    interest: 'books',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to Firebase or email
    setSubmitted(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gray-900 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/6 blur-[120px] pointer-events-none" />
          <div className="relative max-w-[680px] mx-auto px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-white transition-colors group mb-10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Басты бетке
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-[13px] font-semibold tracking-[0.25em] uppercase text-amber-400/80 mb-5">
                Өтінім
              </p>
              <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-display font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-4">
                Клубқа{' '}
                <span className="bg-linear-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  қосылу.
                </span>
              </h1>
              <p className="text-[17px] text-gray-400 font-light max-w-md mx-auto">
                Формаңызды толтырыңыз, біз сізбен жақын арада хабарласамыз.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[560px] mx-auto px-6">
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Аты-жөніңіз *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Мысалы: Серікбай Жансая"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Телефон нөміріңіз *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (7xx) xxx xx xx"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 shadow-sm"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Қалаңыз
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Мысалы: Қарағанды"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 shadow-sm"
                  />
                </div>

                {/* Interest */}
                <div>
                  <label htmlFor="interest" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Қызығушылық бағыты
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-[15px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 shadow-sm appearance-none"
                  >
                    <option value="books">📚 Кітап оқу</option>
                    <option value="ensemble">🎵 «Ұлағат үні» ансамблі</option>
                    <option value="both">✨ Екеуі де</option>
                  </select>
                </div>

                {/* About */}
                <div>
                  <label htmlFor="about" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Өзіңіз туралы
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={4}
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Қысқаша өзіңіз туралы айтып беріңіз..."
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 shadow-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gray-900 text-white text-[15px] font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2.5"
                >
                  <Send className="w-4 h-4" />
                  Өтінім жіберу
                </motion.button>

                <p className="text-[12px] text-gray-400 text-center font-light">
                  Өтінім жіберу арқылы сіз{' '}
                  <Link to="/privacy" className="underline">құпиялылық саясатымен</Link>{' '}
                  келісесіз.
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                <h2 className="text-[28px] font-display font-semibold text-gray-900 tracking-tight mb-3">
                  Рахмет!
                </h2>
                <p className="text-[17px] text-gray-500 font-light mb-8 max-w-sm mx-auto">
                  Сіздің өтінім қабылданды. Біз сізбен жақын арада хабарласамыз.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-amber-500 hover:text-amber-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Басты бетке оралу
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
