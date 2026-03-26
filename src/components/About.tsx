import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function About() {
  const values = [
    {
      title: 'Таза сөйлеу',
      desc: 'Ана тілінде «қоспасыз» таза, әдемі, әсерлі сөйлеуге жетелеу.',
      icon: '🗣️',
    },
    {
      title: 'Ұлттық құндылық',
      desc: 'Салт-дәстүр, ата салтқа баса мән беріп, кітаптан талдау.',
      icon: '🏔️',
    },
    {
      title: 'Рухани даму',
      desc: 'Тұлғалық даму мен рухани кемелдену жолына жетелейміз.',
      icon: '✨',
    },
    {
      title: 'Қауымдастық',
      desc: 'Пікірлес достар тауып, ортақ қуаныш бөлісеміз.',
      icon: '🤝',
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-36 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <motion.div {...fadeUp} className="relative">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-xl shadow-gray-900/5">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop"
                alt="Оқырмандар қауымдастығы"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="flex flex-col"
          >
            <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4">
              Біз туралы
            </span>
            <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 leading-tight tracking-tight mb-6">
              Ана тіліне құрмет —{' '}
              <span className="text-gray-400">біздің миссиямыз.</span>
            </h2>
            <p className="text-base md:text-[17px] text-gray-500 font-light leading-relaxed mb-10">
              Оқырмандардың қазақ тіліне деген сүйіспеншілігін бекіте отырып, әдеби кітаптарды оқуға
              қызығушылығын ояту. @qasymkitap жанынан 2022 жылдың қараша айында құрылған клуб.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="p-5 bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-xl mb-3 block">{v.icon}</span>
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1 group-hover:text-accent transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 font-light leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
