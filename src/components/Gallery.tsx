import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2656&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2574&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2573&auto=format&fit=crop',
  ];

  return (
    <section id="gallery" className="py-24 lg:py-36 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
            Галерея
          </span>
          <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 tracking-tight">
            Әсерлі сәттер
          </h2>
        </motion.div>

        <div className="masonry-grid">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.12 }}
              className="masonry-item relative group overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={src}
                alt={`Галерея ${idx + 1}`}
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://azamatperdeev.gallery.photo/gallery/qasym-kitap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all text-[13px] shadow-lg shadow-gray-900/10"
          >
            Қасым кітап галереясы
          </a>
          <a
            href="https://azamatperdeev.gallery.photo/gallery/ulagat-uni"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-all text-[13px]"
          >
            Ұлағат түні галереясы
          </a>
        </motion.div>
      </div>
    </section>
  );
}
