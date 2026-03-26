import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface BookData {
  id: number;
  slug: string;
  title: string;
  author: string;
  year: string;
  description: string;
  image: string;
}

export const booksData: BookData[] = [
  {
    id: 1,
    slug: 'kok-balak',
    title: 'Көк балақ',
    author: 'Мұхтар Мағауин',
    year: '2023',
    description:
      'Домбыра күй өнеріне арналған роман. Атақты күйші Тоқсобаның тағдыры арқылы ХХ ғасырдағы қазақ халқының тарихи оқиғалары, ұлттық рухани еркіндік және мәдени мұраны сақтау мәселелері көтеріледі.',
    image:
      'https://resources.cdn-kaspi.kz/img/m/p/h78/h7f/64694828335134.jpg?format=gallery-large',
  },
  {
    id: 2,
    slug: 'robinzon-kruzo',
    title: 'Робинзон Крузо',
    author: 'Даниэль Дефо',
    year: '1719',
    description:
      'Әлемдік классиканың ең танымал шығармасы. Шалғай аралға түскен Робинзон Крузо 28 жыл бойы бір өзі өмір сүреді. Адамның табиғатпен күресі, ерік-жігері мен тапқырлығы туралы мәңгілік шығарма.',
    image:
      'https://simg.marwin.kz/media/catalog/product/cache/8d1771fdd19ec2393e47701ba45e606d/_/1/defo_d_robinzon_kruzo.jpeg',
  },
  {
    id: 3,
    slug: 'ak-tunder',
    title: 'Ақ түндер',
    author: 'Фёдор Достоевский',
    year: '1848',
    description:
      'Санкт-Петербургтің ақ түндеріндегі жалғыз қиялшыл жігіт пен Настя арасындағы махаббат хикаясы. Жалғыздық, махаббат, үміт пен қиял — Достоевскийдің ерте кезеңіндегі ең нәзік шығармасы.',
    image:
      'https://resources.cdn-kaspi.kz/img/m/p/hca/h4b/64531305660446.jpg?format=gallery-large',
  },
];

function getCommentCount(slug: string): number {
  try {
    const stored = localStorage.getItem(`ulagat-comments-${slug}`);
    if (stored) {
      return JSON.parse(stored).length;
    }
  } catch { /* ignore */ }
  return 0;
}

export default function Books() {
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const counts: Record<string, number> = {};
    booksData.forEach((b) => {
      counts[b.slug] = getCommentCount(b.slug);
    });
    setCommentCounts(counts);
  }, []);

  return (
    <section id="books" className="py-24 lg:py-36 bg-gray-50">
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
            Біз оқыған кітаптар
          </h2>
          <p className="text-[15px] text-gray-500 font-light mt-3 max-w-lg leading-relaxed">
            Кітапты таңдап, оқырмандар ой-пікірлерін оқыңыз және талқылауға қатысыңыз.
          </p>
        </motion.div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {booksData.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/books/${book.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-gray-900/6 transition-all duration-500"
              >
                {/* 9:16 Book cover */}
                <div className="relative aspect-[9/16] max-h-[320px] sm:max-h-[400px] overflow-hidden bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Comment count */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span className="text-[12px] font-medium text-white">
                      {commentCounts[book.slug] || 0} пікір
                    </span>
                  </div>
                </div>

                {/* Book info */}
                <div className="p-5">
                  <h3 className="text-[17px] font-display font-semibold text-gray-900 tracking-tight group-hover:text-accent transition-colors mb-1">
                    {book.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 font-medium mb-3">
                    {book.author} · {book.year}
                  </p>
                  <p className="text-[13px] text-gray-500 font-light leading-relaxed line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-[13px] text-accent font-medium group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
                      Талқылауға кіру
                      <span className="text-accent">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
