import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { BookOpen, Calendar, MapPin, BadgePercent, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';

/* ── Animated counter component ── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, value, {
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

/* ── Floating particles component ── */
function FloatingParticles({ count = 6, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400/20"
          style={{
            left: `${15 + (i * 70) / count}%`,
            top: `${20 + Math.sin(i * 1.5) * 30}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

const highlights = [
  {
    icon: Calendar,
    title: 2022,
    subtitle: 'жылдың қарашасынан',
    desc: 'Клуб 2022 жылдың қараша айынан бері тұрақты жұмыс істеп келеді.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BookOpen,
    title: 2,
    titleSuffix: ' апта',
    subtitle: 'сайын кітап талдау',
    desc: '1-апта — әлем әдебиеті, 2-апта — қазақ әдебиеті.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: MapPin,
    title: 0,
    titleText: 'Qasymkitap',
    subtitle: 'кітап дүкені',
    desc: 'Кездесулер Қарағанды қаласындағы Qasymkitap филиалында өтеді.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: BadgePercent,
    title: 15,
    titleSuffix: '%',
    subtitle: 'жеңілдік',
    desc: 'Qasymkitap баспасының әр кітабына Ұлағат оқырмандарына жеңілдік.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

/* ── Magnetic hover effect ── */
function MagneticWrap({ children }: React.PropsWithChildren) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <>
      {/* ─── SECTION 1: About Hero — Apple-style full-width ─── */}
      <section
        ref={sectionRef}
        id="about"
        className="relative py-32 lg:py-48 bg-gray-50 overflow-hidden"
      >
        {/* Parallax background orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-100/50 to-orange-100/20 blur-[100px] pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-100/30 to-indigo-100/10 blur-[100px] pointer-events-none"
        />

        <motion.div style={{ opacity, scale }} className="relative max-w-[980px] mx-auto px-6">
          {/* Centered eyebrow + title */}
          <div className="text-center mb-20 lg:mb-28">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[13px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6"
            >
              Біз туралы
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-display font-semibold text-gray-900 leading-[1.05] tracking-[-0.025em]"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Кітапсүйер қауымды
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
              >
                біріктіретін орта.
              </motion.span>
            </motion.h2>
          </div>

          {/* Two-column editorial */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Pull quote with reveal animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[28px] sm:text-[32px] md:text-[36px] font-display font-semibold text-gray-900 leading-[1.2] tracking-[-0.02em]">
                Әдебиет арқылы ой бөлісіп, жаңа идеялармен алмасуға мүмкіндік беретін
                <span className="text-gray-300"> ерекше орта.</span>
              </p>
            </motion.div>

            {/* Right: Body text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                шығармалар оқылады.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: Qasymkitap Partner — with logo ─── */}
      <section className="py-20 lg:py-28 bg-white border-y border-gray-100">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
          >
            {/* Logo with magnetic effect */}
            <MagneticWrap>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center p-6 shadow-sm"
              >
                <img
                  src="/qasymkitap-logo.png"
                  alt="Qasym Kitaphanasy Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </MagneticWrap>

            {/* Text */}
            <div className="text-center md:text-left">
              <h3 className="text-[24px] sm:text-[28px] font-display font-semibold text-gray-900 tracking-tight mb-3">
                Qasym Kitaphanasy — серіктес
              </h3>
              <p className="text-[17px] text-gray-500 leading-[1.7] font-light max-w-lg mb-5">
                Кездесулер Қарағанды қаласындағы Qasymkitap кітап дүкенінің филиалында
                өтеді. Клубқа қатысу тегін, әрі баспаның әр кітабына Ұлағат
                оқырмандарына{' '}
                <span className="font-semibold text-green-600">15% жеңілдік</span>{' '}
                қарастырылған.
              </p>
              <motion.a
                href="https://qasymkitap.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-gray-900 hover:text-amber-600 transition-colors"
                whileHover={{ x: 3 }}
              >
                qasymkitap.kz
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: Stats — Animated counters ─── */}
      <section className="py-24 lg:py-32 bg-[#fafafa]">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.12 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                className="group relative p-8 lg:p-10 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-500"
              >
                <motion.div
                  className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </motion.div>
                <h3 className="text-[32px] font-display font-bold text-gray-900 tracking-tight leading-none mb-1">
                  {item.titleText || (
                    <>
                      <AnimatedCounter value={item.title} suffix={item.titleSuffix || ''} />
                    </>
                  )}
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

      {/* ─── SECTION 4: «Ұлағат үні» — Dark cinema showcase ─── */}
      <section className="relative py-28 lg:py-40 bg-gray-900 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/8 via-orange-500/5 to-transparent blur-[120px] pointer-events-none" />
        
        {/* Floating particles */}
        <FloatingParticles count={8} />

        <div className="relative max-w-[980px] mx-auto px-6">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[13px] font-semibold uppercase text-amber-400/80 mb-6"
            >
              Музыка · Өнер · Рух
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-display font-semibold text-white leading-[1.05] tracking-[-0.025em] mb-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                «Ұлағат үні»
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
              >
                ансамблі.
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[19px] text-gray-400 font-light leading-[1.6] max-w-2xl mx-auto mb-14"
            >
              «Ұлағат» оқырман клубы мүшелері ішіндегі өнерлі жандардан құрылды.
              Қазіргі таңда ансамбльде 20 шақты адам бар. Өнерпаздар 15-ші
              наурыз күні алғашқы күй кешін өткізді.
            </motion.p>

            {/* Animated stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center justify-center gap-12 sm:gap-16 mb-14"
            >
              {[
                { value: 20, suffix: '+', label: 'Мүше' },
                { value: 15, suffix: '.03', label: 'Алғашқы күй кеші' },
                { value: 15, suffix: '', label: 'Өнерпаз' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[36px] sm:text-[44px] font-display font-bold text-white tracking-tight leading-none">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[12px] text-gray-500 font-medium mt-2 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA with magnetic hover */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticWrap>
                <Link
                  to="/ensemble"
                  className="group inline-flex items-center gap-2.5 text-[17px] text-amber-400 font-medium hover:text-amber-300 transition-colors"
                >
                  Толығырақ білу
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </MagneticWrap>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: CTA join ─── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticWrap>
              <motion.a
                href="#join"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                <span className="text-[15px] text-white/70 font-light">Клубқа қатысу</span>
                <span className="text-[16px] text-white font-semibold tracking-wide">ТЕГІН ✦</span>
              </motion.a>
            </MagneticWrap>
          </motion.div>
        </div>
      </section>
    </>
  );
}
