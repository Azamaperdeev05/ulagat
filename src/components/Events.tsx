import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Поэзиялық кеш',
      author: 'Қозы Көрпеш - Баян Сұлу мерекесі',
      date: '11 Сәуір',
      time: '17:00',
      image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop', // spring/love aesthetics
      link: 'https://koktem.vercel.app/'
    },
    {
      id: 2,
      title: 'Махаббат бекеті',
      author: 'Сезімге толы әдемі кеш',
      date: '19 Сәуір',
      time: '14:00',
      image: '/mahabbat.jpeg',
    },
    {
      id: 3,
      title: 'Көксерек (Жаңа топ)',
      author: 'Мұхтар Әуезов',
      date: '12 Сәуір',
      time: '14:00',
      image: 'https://simg.marwin.kz/media/catalog/product/f/i/uezov_m_kkserek.jpeg',
    },
    {
      id: 4,
      title: 'Тазының өлімі (Жалғастырушы)',
      author: 'Мұхтар Мағауин (Қисық ағаш)',
      date: '12 Сәуір',
      time: '16:00',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/p7d/pb7/1453139.jpeg?format=gallery-medium',
    },
  ];

  return (
    <section id="events" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:text-center"
        >
          <span className="text-[11px] sm:text-[12px] font-semibold text-accent tracking-widest uppercase mb-3 block">
            Іс-шаралар
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
            Алдағы кездесулер
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {upcomingEvents.map((event, idx) => {
            const ContentWrapper = event.link ? 'a' : 'div';
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                <ContentWrapper 
                  href={event.link} 
                  target={event.link ? '_blank' : undefined} 
                  rel={event.link ? 'noopener noreferrer' : undefined}
                  className="flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square sm:aspect-[4/5] object-cover">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-3 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-[11px] font-medium text-gray-500">
                      <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-gray-200 shadow-sm">
                        <Calendar className="w-3 h-3 text-accent" />
                        {event.date}
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-gray-200 shadow-sm">
                          <Clock className="w-3 h-3 text-accent" />
                          {event.time}
                        </div>
                      )}
                    </div>
                    <h3 className="text-[14px] sm:text-[16px] font-display font-semibold tracking-tight text-gray-900 leading-snug group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    {event.author && (
                      <p className="text-[11px] sm:text-[13px] text-gray-500 font-light mt-1.5 leading-relaxed line-clamp-2">
                        {event.author}
                      </p>
                    )}
                    
                    {/* Optional Button for external links */}
                    {event.link && (
                      <div className="mt-auto pt-4 w-full">
                        <span className="inline-flex w-full items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-[12px] sm:text-[13px] font-medium rounded-lg group-hover:bg-accent transition-colors">
                          Сайтқа өту
                        </span>
                      </div>
                    )}
                  </div>
                </ContentWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
