import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Calendar, MapPin, BadgePercent, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const highlights = [
  {
    icon: Calendar,
    title: '2022',
    subtitle: 'жылдың қарашасынан',
    desc: 'Клуб 2022 жылдың қараша айынан бері тұрақты жұмыс істеп келеді.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BookOpen,
    title: '2 апта',
    subtitle: 'сайын кітап талдау',
    desc: '1-апта — әлем әдебиеті, 2-апта — қазақ әдебиеті.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: MapPin,
    title: 'Qasymkitap',
    subtitle: 'кітап дүкені',
    desc: 'Кездесулер Қарағанды қаласындағы Qasymkitap филиалында өтеді.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: BadgePercent,
    title: '15%',
    subtitle: 'жеңілдік',
    desc: 'Qasymkitap баспасының әр кітабына Ұлағат оқырмандарына жеңілдік.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <>
      {/* ─── SECTION 1: About Hero — Apple-style full-width centered ─── */}
      <section
        ref={sectionRef}
        id="about"
        className="relative py-32 lg:py-48 bg-[#fafafa] overflow-hidden"
      >
        {/* Subtle parallax bg circles */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-100/50 to-orange-100/20 blur-[100px] pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-100/30 to-indigo-100/10 blur-[100px] pointer-events-none"
        />

        <motion.div style={{ opacity }} className="relative max-w-[980px] mx-auto px-6">
          {/* Centered eyebrow + title — Apple style */}
          <div className="text-center mb-20 lg:mb-28">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[13px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6"
            >
              Біз туралы
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-display font-semibold text-gray-900 leading-[1.05] tracking-[-0.025em]"
            >
              Кітапсүйер қауымды
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                біріктіретін орта.
              </span>
            </motion.h2>
          </div>

          {/* Two-column content — Apple editorial */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Large pull quote */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[28px] sm:text-[32px] md:text-[36px] font-display font-semibold text-gray-900 leading-[1.2] tracking-[-0.02em]">
                Әдебиет арқылы ой бөлісіп, жаңа идеялармен алмасуға мүмкіндік беретін
                <span className="text-gray-300"> ерекше орта.</span>
              </p>
            </motion.div>

            {/* Right: Body text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p className="text-[17px] text-gray-500 leading-[1.7] font-light">
                «Ulagat» оқырман клубы 2022 жылдың қараша айынан бері жұмыс
                істеп келеді. Клуб аясында түрлі форматтағы әдеби кездесулер
                ұйымдастырылып, кітап талдауы әр екі апта сайын тұрақты
                түрде өткізіледі.
              </p>
              <p className="text-[17px] text-gray-500 leading-[1.7] font-light">
                Әр айдың бірінші аптасында{' '}
                <span className="font-medium text-gray-900">әлем әдебиеті</span>{' '}
                талқыланса, екінші аптасында{' '}
                <span className="font-medium text-gray-900">қазақ әдебиетінен</span>{' '}
                шығармалар оқылады. Кездесулер Қарағанды қаласындағы Qasymkitap
                кітап дүкенінің филиалында өтеді.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: Stats / Highlights — Apple-style feature grid ─── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-8 lg:p-10 rounded-3xl hover:bg-gray-50 transition-colors duration-500"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-[32px] font-display font-bold text-gray-900 tracking-tight leading-none mb-1">
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-400 font-medium mb-3">
                  {item.subtitle}
                </p>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: «Ұлағат үні» — Apple-style dark showcase ─── */}
      <section className="relative py-28 lg:py-40 bg-[#1d1d1f] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/8 via-orange-500/5 to-transparent blur-[120px] pointer-events-none" />

        <div className="relative max-w-[980px] mx-auto px-6">
          <div className="text-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[13px] font-semibold tracking-[0.25em] uppercase text-amber-400/80 mb-6"
            >
              Музыка · Өнер · Рух
            </motion.p>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-display font-semibold text-white leading-[1.05] tracking-[-0.025em] mb-6"
            >
              «Ұлағат үні»
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                ансамблі.
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[19px] text-gray-400 font-light leading-[1.6] max-w-2xl mx-auto mb-12"
            >
              «Ұлағат» оқырман клубы мүшелері ішіндегі өнерлі жандардан құрылды.
              Қазіргі таңда ансамбльде 20 шақты адам бар. Өнерпаздар 15-ші
              наурыз күні алғашқы күй кешін өткізді.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center justify-center gap-12 sm:gap-16 mb-14"
            >
              {[
                { value: '20+', label: 'Мүше' },
                { value: '15.03', label: 'Алғашқы күй кеші' },
                { value: '16', label: 'Өнерпаз' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[36px] sm:text-[44px] font-display font-bold text-white tracking-tight leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[12px] text-gray-500 font-medium mt-2 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/ensemble"
                className="group inline-flex items-center gap-2.5 text-[17px] text-amber-400 font-medium hover:text-amber-300 transition-colors"
              >
                Толығырақ білу
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: CTA join ─── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#join"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer"
            >
              <span className="text-[15px] text-white/70 font-light">Клубқа қатысу</span>
              <span className="text-[16px] text-white font-semibold tracking-wide">ТЕГІН ✦</span>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
