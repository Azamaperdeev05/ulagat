import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Books() {
  const books = [
    {
      id: 1,
      title: 'Абай жолы',
      author: 'Мұхтар Әуезов',
      rating: 5,
      status: 'Талқыланды',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2574&auto=format&fit=crop',
      review: 'Қазақ әдебиетінің шыңы. Әрбір қазақ оқуы тиіс ұлы туынды.',
    },
    {
      id: 2,
      title: 'Қан мен тер',
      author: 'Әбдіжәміл Нұрпейісов',
      rating: 4.8,
      status: 'Ай кітабы',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2712&auto=format&fit=crop',
      review: 'Арал тағдыры мен адам тағдыры астасқан күрделі шығарма.',
    },
    {
      id: 3,
      title: 'Махаббат, қызық мол жылдар',
      author: 'Әзілхан Нұршайықов',
      rating: 4.9,
      status: 'Ұсынылады',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop',
      review: 'Жастық шақ пен махаббаттың шынайы бейнесі.',
    },
  ];

  return (
    <section id="books" className="py-24 lg:py-36 bg-white">
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
            Кітаптар
          </span>
          <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
            Біз оқитын әлем
          </h2>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group bg-gray-50 rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 hover:shadow-lg transition-all duration-400 flex flex-col items-center text-center"
            >
              <div className="relative w-36 h-52 md:w-44 md:h-64 mb-6 rounded-xl overflow-hidden shadow-lg shadow-gray-900/8 group-hover:-translate-y-1 transition-transform duration-500">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Status Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-gray-700 shadow-sm border border-gray-200/60">
                  {book.status}
                </div>
              </div>

              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(book.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <h3 className="text-lg font-display font-semibold tracking-tight text-gray-900 mb-1 group-hover:text-accent transition-colors duration-200">
                {book.title}
              </h3>
              <p className="text-[12px] font-medium text-gray-400 mb-3 tracking-wide">
                {book.author}
              </p>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed italic">
                "{book.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
