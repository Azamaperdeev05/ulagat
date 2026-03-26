import { motion } from 'framer-motion';
import { MessageCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { subscribeBooks, type Book } from '../lib/bookService';

// Экспортталатын интерфейс (BookThread-те қолданылады)
export interface BookData {
  id: string;
  slug: string;
  title: string;
  author: string;
  year: string;
  description: string;
  image: string;
}

export default function Books() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeBooks((firebaseBooks) => {
      const mapped: BookData[] = firebaseBooks.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        author: b.author,
        year: b.year,
        description: b.description,
        image: b.image,
      }));
      setBooks(mapped);
      setLoading(false);
    });
    return () => unsubscribe();
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

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <span className="ml-3 text-gray-400 text-sm">Кітаптар жүктелуде...</span>
          </div>
        )}

        {/* Book Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.map((book, idx) => (
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
        )}

        {/* Кітап жоқ */}
        {!loading && books.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>Әзірге кітаптар қосылмаған</p>
          </div>
        )}
      </div>
    </section>
  );
}
