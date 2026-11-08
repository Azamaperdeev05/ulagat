import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Send, CheckCircle, ArrowLeft, MessageCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSeo } from '../lib/seo';
import { submitLead } from '../lib/crm';
import { trackEvent } from '../lib/analytics';

export default function Apply() {
  useSeo({
    title: 'Клубқа қосылу — ULAGAT',
    description:
      'ULAGAT оқырман клубына онлайн өтінім беріңіз. Кітап талқылауына, мәдени ортаға және ULAGAT Үні ансамбліне қосылыңыз. Кіру жарнасы: 2 000 ₸.',
    path: '/apply',
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Қарағанды',
    about: '',
    interest: 'books',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        about: `${formData.about} [Кіру жарнасы: 2 000 ₸]`,
        interest: formData.interest,
        source: 'apply-page',
      });

      trackEvent('lead_submit', {
        source: 'apply-page',
        interest: formData.interest,
      });

      setSubmitted(true);
    } catch {
      setSubmitError('Өтінім жіберілмеді. Сәлден кейін қайта көріңіз немесе Айбанудың WhatsApp-ына тікелей жазыңыз.');
      trackEvent('lead_submit_failed', { source: 'apply-page' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Hero */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gray-900 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
          <div className="relative max-w-[680px] mx-auto px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-white transition-colors group mb-10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Басты бетке оралу
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[12px] font-semibold text-accent uppercase tracking-widest">
                  Клубқа мүшелік • Жарна: 2 000 ₸
                </span>
              </div>
              <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-display font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-4">
                Ұлағат оқырманы{' '}
                <span className="text-accent">
                  атаныңыз.
                </span>
              </h1>
              <p className="text-[16px] text-gray-400 font-light max-w-md mx-auto">
                Өтінім қалдырыңыз. Координаторымыз Айбану сізбен байланысып, клуб ережелері мен төлем тәсілін жібереді.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form and Membership Info */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[640px] mx-auto px-6">
            {/* Membership Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 p-6 sm:p-8 bg-white rounded-3xl border border-gray-200/90 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">Клубқа кіру жарнасы</div>
                  <div className="text-3xl font-display font-bold text-gray-900 mt-0.5">
                    2 000 <span className="text-xl text-accent">₸</span>
                  </div>
                </div>
                <div className="text-[13px] text-gray-500 max-w-xs">
                  Клуб мүшелігі әдеби кездесулерді тұрақты ұйымдастыруға және қауымдастықты қолдауға бағытталады.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 border-b border-gray-100 text-[13px] text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Әр 2 аптадағы талқылаулар</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Qasymkitap-тан 15% жеңілдік</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>«Ұлағат үні» ансамбліне қатысу</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Жабық пікірталас чаты</span>
                </div>
              </div>

              <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px]">
                <div>
                  <div className="font-medium text-gray-900">Байланыс менеджері: Айбану</div>
                  <div className="text-gray-500">+7 747 447 6486</div>
                </div>
                <a
                  href="https://wa.me/77474476486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-colors text-[12px] shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Айбануға WhatsApp-тан жазу
                </a>
              </div>
            </motion.div>

            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm space-y-6"
              >
                <div className="pb-2">
                  <h2 className="text-xl font-display font-semibold text-gray-900">Өтінім формасы</h2>
                  <p className="text-[13px] text-gray-500 mt-1">Төмендегі ақпаратты толтырыңыз, біз сізге дереу жауап береміз.</p>
                </div>

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
                    placeholder="Мысалы: Жансая Серікбай"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Телефон нөміріңіз (WhatsApp) *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (7xx) xxx xx xx"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
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
                    placeholder="Қарағанды"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
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
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  >
                    <option value="books">Кітап оқу клубы (Кіру жарнасы: 2 000 ₸)</option>
                    <option value="ensemble">«Ұлағат үні» ансамблі</option>
                    <option value="both">Кітап клубы және ансамбль (2 000 ₸)</option>
                  </select>
                </div>

                {/* About */}
                <div>
                  <label htmlFor="about" className="block text-[13px] font-medium text-gray-700 mb-2">
                    Өзіңіз туралы немесе сүйікті кітаптарыңыз
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={4}
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Қандай кітаптарды ұнатасыз? Клубтан не күтесіз?"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={submitting}
                  className="w-full py-4 bg-gray-900 text-white text-[15px] font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10 flex items-center justify-center gap-2.5"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Жіберілуде...' : 'Өтінім жіберу (2 000 ₸)'}
                </motion.button>

                {submitError && (
                  <p className="text-[13px] text-red-500 text-center">{submitError}</p>
                )}

                <div className="pt-2 text-center space-y-1">
                  <p className="text-[12px] text-gray-400 font-light">
                    Өтінім жіберу арқылы сіз{' '}
                    <Link to="/privacy" className="underline text-gray-500 hover:text-gray-700">құпиялылық саясатымен</Link>{' '}
                    келісесіз.
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Тікелей хабарласу: <a href="https://wa.me/77474476486" className="text-accent underline font-medium">Айбану (+7 747 447 6486)</a>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-12 px-8 bg-white rounded-3xl border border-gray-200/90 shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                  Өтініміңіз қабылданды
                </h2>
                <p className="text-[15px] text-gray-500 font-light mb-6 max-w-sm mx-auto leading-relaxed">
                  Рахмет! Координаторымыз Айбану сізге жақын арада WhatsApp арқылы хабарласып, клубқа кіру (2 000 ₸) және кездесу жайлы толық мәлімет береді.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/77474476486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium rounded-full transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Айбануға WhatsApp-тан жазу
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Басты бетке оралу
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
