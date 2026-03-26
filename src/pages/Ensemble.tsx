import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Footer from '../components/Footer';

interface Member {
  name: string;
  gender: 'female' | 'male';
}

const members: Member[] = [
  { name: 'Аубакирова Аружан Ардаққызы', gender: 'female' },
  { name: 'Серікбай Жансая Болатқызы', gender: 'female' },
  { name: 'Жанат Айару', gender: 'female' },
  { name: 'Мұқатай Аяулы Нұрланқызы', gender: 'female' },
  { name: 'Хасенова Қарлығаш Топайқызы', gender: 'female' },
  { name: 'Жақсылық Марат Аманұлы', gender: 'male' },
  { name: 'Нэрбол Әсем', gender: 'female' },
  { name: 'Жаргакова Айдана Жанатқызы', gender: 'female' },
  { name: 'Жәңгір Шынарбек Өмірбекұлы', gender: 'male' },
  { name: 'Шайкен Данияр Аблайұлы', gender: 'male' },
  { name: 'Марат Арайлым Төлеуханқызы', gender: 'female' },
  { name: 'Дулатқызы Диана', gender: 'female' },
  { name: 'Зейнел Зере Мақсатқызы', gender: 'female' },
  { name: 'Рашид Қазыбек', gender: 'male' },
  { name: 'Искаков Дархан Рымбайұлы', gender: 'male' },
];

const femaleColors = [
  'from-rose-400 to-pink-600',
  'from-fuchsia-400 to-purple-600',
  'from-violet-400 to-indigo-600',
  'from-pink-400 to-rose-600',
  'from-amber-400 to-orange-600',
  'from-teal-400 to-cyan-600',
  'from-sky-400 to-blue-600',
  'from-emerald-400 to-green-600',
  'from-rose-300 to-fuchsia-600',
  'from-indigo-400 to-violet-600',
];

const maleColors = [
  'from-blue-500 to-indigo-700',
  'from-slate-500 to-gray-800',
  'from-cyan-500 to-teal-700',
  'from-emerald-500 to-green-800',
  'from-amber-500 to-yellow-700',
];

function getInitials(name: string) {
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function getGradient(member: Member) {
  if (member.gender === 'female') {
    const idx = members.filter((m) => m.gender === 'female').indexOf(member);
    return femaleColors[idx % femaleColors.length];
  }
  const idx = members.filter((m) => m.gender === 'male').indexOf(member);
  return maleColors[idx % maleColors.length];
}

function getFirstName(fullName: string) {
  const parts = fullName.split(' ');
  return parts.length >= 2 ? parts[1] : parts[0];
}

function getLastName(fullName: string) {
  return fullName.split(' ')[0];
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <div className="relative rounded-[28px] overflow-hidden transition-all duration-700 hover:scale-[1.03]">
        {/* Gradient background */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(member)}`} />

          {/* Glass circle with initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-[-8px] rounded-full bg-white/10 blur-xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:bg-white/25 transition-all duration-500">
                <span className="text-white text-3xl sm:text-4xl font-display font-bold tracking-tight drop-shadow-lg">
                  {getInitials(member.name)}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="text-[18px] sm:text-[20px] font-display font-semibold text-white tracking-tight leading-tight drop-shadow-lg">
              {getFirstName(member.name)}
            </p>
            <p className="text-[13px] text-white/60 font-medium mt-0.5 drop-shadow">
              {getLastName(member.name)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Ensemble() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const femaleMembers = members.filter((m) => m.gender === 'female');
  const maleMembers = members.filter((m) => m.gender === 'male');

  return (
    <>
      <div className="min-h-screen bg-[#000000]">
        {/* ─── Hero — Apple dark cinematic ─── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[150px]" />
            <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-orange-500/6 blur-[120px]" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-amber-400/4 blur-[200px]" />
          </div>

          {/* Back link */}
          <div className="absolute top-0 left-0 right-0 pt-24 px-6 z-20">
            <div className="max-w-[980px] mx-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Басты бетке
              </Link>
            </div>
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 pt-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[13px] font-semibold tracking-[0.3em] uppercase text-amber-400/70 mb-8"
            >
              Музыка · Өнер · Рух
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-display font-bold text-white leading-[0.95] tracking-[-0.03em]"
            >
              Ұлағат
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                үні.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[19px] sm:text-[21px] text-gray-400 font-light leading-[1.5] max-w-xl mx-auto mt-8"
            >
              Оқырман клубы мүшелері ішіндегі өнерлі жандардан
              құрылған ансамбль.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex items-center justify-center gap-12 sm:gap-16 mt-14"
            >
              {[
                { value: '20+', label: 'Мүше' },
                { value: '15.03', label: 'Алғашқы күй кеші' },
                { value: '15', label: 'Өнерпаз' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[36px] sm:text-[48px] font-display font-bold text-white tracking-tight leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium mt-2 tracking-widest uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-gray-700 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-gray-500"
              />
            </div>
          </motion.div>
        </section>

        {/* ─── About — Apple white section ─── */}
        <section className="py-28 lg:py-40 bg-[#fafafa]">
          <div className="max-w-[780px] mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[32px] sm:text-[40px] md:text-[48px] font-display font-semibold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-8"
            >
              Домбыра мен күй өнерін жаңғыртып, рухани мұраны жас ұрпаққа
              <span className="text-gray-300"> жеткізу.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-[17px] text-gray-500 leading-[1.7] font-light">
                «Ұлағат үні» ансамблі «Ұлағат» оқырман клубы мүшелері ішіндегі
                өнерлі жандардан құрылды. Қазіргі таңда ансамбльде{' '}
                <span className="font-medium text-gray-900">20 шақты адам</span> бар.
              </p>
              <p className="text-[17px] text-gray-500 leading-[1.7] font-light">
                Өнерпаздар{' '}
                <span className="font-medium text-gray-900">15-ші наурыз</span>{' '}
                күні алғашқы күй кешін өткізді. Бұл кеш — ансамбль үшін жаңа
                кезеңнің басталуы болды.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Members: Қыздар — Apple grid ─── */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <p className="text-[13px] font-semibold tracking-[0.25em] uppercase text-rose-400 mb-4">
                Қыздар
              </p>
              <h3 className="text-[36px] sm:text-[44px] md:text-[52px] font-display font-semibold text-gray-900 tracking-[-0.02em] leading-none">
                Әйел өнерпаздар.
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {femaleMembers.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Members: Ұлдар — Apple dark grid ─── */}
        <section className="py-24 lg:py-32 bg-[#1d1d1f]">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <p className="text-[13px] font-semibold tracking-[0.25em] uppercase text-blue-400 mb-4">
                Ұлдар
              </p>
              <h3 className="text-[36px] sm:text-[44px] md:text-[52px] font-display font-semibold text-white tracking-[-0.02em] leading-none">
                Ер өнерпаздар.
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {maleMembers.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA — Apple style ─── */}
        <section className="py-28 lg:py-36 bg-white">
          <div className="max-w-[780px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-[32px] sm:text-[40px] md:text-[48px] font-display font-semibold text-gray-900 tracking-[-0.02em] leading-[1.1] mb-6">
                Сен де қосыл.
              </h3>
              <p className="text-[17px] text-gray-500 font-light leading-[1.6] mb-10 max-w-md mx-auto">
                Домбыра тартасың ба? Ән айтасың ба? Біздің ансамбльге қосылып, өнеріңді дамыт.
              </p>
              <Link
                to="/#join"
                className="group inline-flex items-center gap-2.5 text-[17px] text-amber-500 font-medium hover:text-amber-600 transition-colors"
              >
                Өтінім қалдыру
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
