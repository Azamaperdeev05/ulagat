import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Махаббат бекеті',
      date: '19 Сәуір, 2026',
      image: '/mahabbat.jpeg',
    },
    {
      id: 2,
      title: 'Қыпшақ аруы',
      author: 'Мұқтар Мағауин',
      date: '29 Наурыз, 2026',
      time: '12:00',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/p32/pd9/72132017.PNG?format=gallery-large',
    },
    {
      id: 3,
      title: 'Қажымұрат',
      author: 'Лев Толстой',
      date: '29 Наурыз, 2026',
      time: '14:00',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h36/h26/64876499075102.jpg?format=gallery-large',
    },
  ];

  return (
    <section id="events" className="py-24 lg:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
            Іс-шаралар
          </span>
          <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
            Алдағы кездесулер
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-300 hover:shadow-lg transition-all duration-400"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] font-medium text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-display font-semibold tracking-tight text-gray-900 group-hover:text-accent transition-colors duration-200">
                  {event.title}
                </h3>
                {event.author && (
                  <p className="text-[13px] text-gray-500 font-light mt-1">{event.author}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
