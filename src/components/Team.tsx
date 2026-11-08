import { motion } from 'framer-motion';

export default function Team() {
  const team = [
    {
      id: 1,
      name: 'Гүлдана Қуатқызы',
      role: 'Негізін қалаушы',
      image: '/Guldana.jpeg',
      bio: 'Филолог, Журналист, «Қасым кітап» баспасының бас редакторы.',
    },
    {
      id: 2,
      name: 'Айдана',
      role: 'PR-менеджер',
      image: '/Aqbota.jpg',
      bio: 'Клубтың әлеуметтік желілердегі бейнесін қалыптастырушы.',
    },
    {
      id: 3,
      name: 'Ұлпан Асхатқызы',
      role: 'HR-менеджер',
      image: '/Ulpan.JPG.jpeg',
      bio: 'Клуб мүшелерімен жұмыс және ұйымдастыру мәселелері.',
    },
  ];

  return (
    <section id="team" className="py-24 lg:py-36 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
            Команда
          </span>
          <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 tracking-tight">
            Ұлағат ұжымы
          </h2>
          <p className="text-[15px] text-gray-500 font-light mt-3 max-w-md mx-auto">
            Оқу мәдениеті мен қауымдастықты бірге дамытып келе жатқан командамыз.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-200/80 hover:border-accent/40 hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-300"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-6 rounded-full overflow-hidden shadow-md shadow-gray-900/10 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-lg font-display font-semibold tracking-tight text-gray-900 mb-1 group-hover:text-accent transition-colors duration-200">
                {member.name}
              </h3>
              <p className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-3">
                {member.role}
              </p>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed max-w-xs">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
