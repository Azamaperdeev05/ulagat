import { motion } from 'framer-motion';
import { BookOpen, Calendar, MapPin, BadgePercent } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const highlights = [
  {
    icon: Calendar,
    title: '2022 жылдың қарашасынан',
    desc: 'Клуб 2022 жылдың қараша айынан бері тұрақты жұмыс істеп келеді.',
  },
  {
    icon: BookOpen,
    title: 'Әр 2 аптада кітап талдау',
    desc: '1-апта — әлем әдебиеті, 2-апта — қазақ әдебиеті.',
  },
  {
    icon: MapPin,
    title: 'Qasymkitap кітап дүкені',
    desc: 'Кездесулер Қарағанды қаласындағы Qasymkitap филиалында өтеді.',
  },
  {
    icon: BadgePercent,
    title: '15% жеңілдік',
    desc: 'Qasymkitap баспасының әр кітабына Ұлағат оқырмандарына жеңілдік.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-40 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-50 via-orange-50/30 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-50/40 via-indigo-50/20 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header block with logo */}
        <motion.div
          {...fadeUp}
          className="text-center mb-20"
        >
          {/* Floating logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl shadow-2xl shadow-gray-900/20 mb-8"
          >
            <img
              src="/ulagat (1).svg"
              alt="ULAGAT Logo"
              className="w-10 h-10 object-contain brightness-0 invert"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block text-[12px] font-semibold text-accent tracking-[0.2em] uppercase mb-5"
          >
            Біз туралы
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-display font-semibold text-gray-900 leading-[1.1] tracking-tight mb-4"
          >
            Кітапсүйер қауымды{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              біріктіретін орта.
            </span>
          </motion.h2>
        </motion.div>

        {/* Main story block — editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left column — pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 relative"
          >
            <div className="sticky top-32">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-400 via-orange-400 to-transparent rounded-full" />
              <blockquote className="pl-6">
                <p className="text-xl sm:text-2xl font-display font-semibold text-gray-900 leading-snug mb-4 italic">
                  «Әдебиет арқылы ой бөлісіп, жаңа идеялармен алмасуға мүмкіндік беретін ерекше орта»
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-white text-sm font-display font-bold">U</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">Ulagat Club</p>
                    <p className="text-[11px] text-gray-400">est. 2022</p>
                  </div>
                </div>
              </blockquote>
            </div>
          </motion.div>

          {/* Right column — narrative text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg text-gray-600 font-light leading-[1.8] first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-gray-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                «Ulagat» оқырман клубы 2022 жылдың қараша айынан бері жұмыс істеп келеді.
                Бұл клуб – кітапсүйер қауымды біріктіретін, әдебиет арқылы ой бөлісіп,
                жаңа идеялармен алмасуға мүмкіндік беретін ерекше орта.
              </p>

              <p className="text-base md:text-lg text-gray-600 font-light leading-[1.8]">
                Клуб аясында түрлі форматтағы әдеби кездесулер ұйымдастырылып,
                кітап талдауы әр екі апта сайын тұрақты түрде өткізіледі.
                Әр айдың бірінші аптасында <span className="font-medium text-gray-900">әлем әдебиеті</span> талқыланса,
                екінші аптасында <span className="font-medium text-gray-900">қазақ әдебиетінен</span> шығармалар оқылады.
              </p>

              <p className="text-base md:text-lg text-gray-600 font-light leading-[1.8]">
                Кездесулер Қарағанды қаласындағы{' '}
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-50 text-amber-700 font-medium rounded-full text-[14px] border border-amber-200/60">
                  📍 Qasymkitap
                </span>{' '}
                кітап дүкенінің филиалында өтеді.
                Клубқа қатысу тегін, әрі Qasymkitap баспасының
                әр кітабына Ұлағат оқырмандарына{' '}
                <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-green-50 text-green-700 font-semibold rounded-full text-[14px] border border-green-200/60">
                  15% жеңілдік
                </span>{' '}
                қарастырылған.
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300 shadow-sm">
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Free badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#join"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span className="text-[13px] text-white/70 font-light">Клубқа қатысу</span>
            <span className="text-[14px] text-white font-semibold tracking-wide">ТЕГІН ✦</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
