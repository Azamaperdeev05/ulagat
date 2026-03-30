import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  author?: string;
  time?: string;
  image: string;
  dateObj: Date;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Махаббат бекеті',
    date: '19 Сәуір',
    image: '/mahabbat.jpeg',
    dateObj: new Date(2026, 3, 19, 23, 59),
  },
  {
    id: 2,
    title: 'Қыпшақ аруы',
    author: 'Мұхтар Мағауин',
    date: '29 Наурыз',
    time: '12:00',
    image: 'https://resources.cdn-kaspi.kz/img/m/p/p32/pd9/72132017.PNG?format=gallery-large',
    dateObj: new Date(2026, 2, 29, 12, 0),
  },
  {
    id: 3,
    title: 'Қажымұрат',
    author: 'Лев Толстой',
    date: '29 Наурыз',
    time: '14:00',
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h36/h26/64876499075102.jpg?format=gallery-large',
    dateObj: new Date(2026, 2, 29, 14, 0),
  },
];

export default function Events() {
  const now = new Date();

  const upcoming = events.filter((e) => e.dateObj > now);
  const past = events.filter((e) => e.dateObj <= now);

  const renderCard = (event: Event, idx: number, isPast: boolean) => (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`group relative bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden border transition-all duration-300 ${
        isPast
          ? 'border-gray-200/60 opacity-70'
          : 'border-gray-200/80 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/5 sm:aspect-9/16">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isPast ? 'grayscale-[30%]' : 'group-hover:scale-[1.03]'
          }`}
          referrerPolicy="no-referrer"
        />
        {isPast && (
          <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-2">
            <span className="flex items-center gap-1 bg-white/90 text-gray-700 text-[8px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
              Талқыланды
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 text-[8px] sm:text-[10px] font-medium text-gray-400">
          <div className="flex items-center gap-0.5">
            <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            {event.date}
          </div>
          {event.time && (
            <div className="flex items-center gap-0.5">
              <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              {event.time}
            </div>
          )}
        </div>
        <h3 className="text-[11px] sm:text-[13px] font-display font-semibold tracking-tight text-gray-900 leading-tight">
          {event.title}
        </h3>
        {event.author && (
          <p className="text-[9px] sm:text-[11px] text-gray-400 font-light mt-0.5 leading-tight">
            {event.author}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="events" className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-[11px] sm:text-[12px] font-semibold text-accent tracking-widest uppercase mb-3 block">
                Іс-шаралар
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
                Алдағы кездесулер
              </h2>
            </motion.div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-12">
              {upcoming.map((event, idx) => renderCard(event, idx, false))}
            </div>
          </>
        )}

        {/* Past */}
        {past.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {upcoming.length === 0 && (
                <span className="text-[11px] sm:text-[12px] font-semibold text-accent tracking-widest uppercase mb-3 block">
                  Іс-шаралар
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
                Өткен кездесулер
              </h2>
            </motion.div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {past.map((event, idx) => renderCard(event, idx, true))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
