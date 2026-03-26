import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Кітап оқу мәдениеті: Неден бастау керек?',
      category: 'Ой толғау',
      date: '10 Наурыз, 2026',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2670&auto=format&fit=crop',
      excerpt: 'Күнделікті күйбең тіршілікте кітап оқуға қалай уақыт табуға болады?',
    },
    {
      id: 2,
      title: 'Абайдың қара сөздері бүгінгі қоғамда',
      category: 'Мәдениет',
      date: '5 Наурыз, 2026',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop',
      excerpt: 'Ұлы ойшылдың мұрасы қазіргі жастар үшін неліктен маңызды?',
    },
    {
      id: 3,
      title: 'Үздік 10 қазақ романы',
      category: 'Кітап review',
      date: '1 Наурыз, 2026',
      readTime: '12 мин',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2656&auto=format&fit=crop',
      excerpt: 'Оқырман клубы ұсынатын ең үздік отандық шығармалар тізімі.',
    },
  ];

  return (
    <section id="blog" className="py-24 lg:py-36 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
              Блог
            </span>
            <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
              Ой бөлісу алаңы
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#all-posts"
            className="group flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Барлық мақалалар
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-300 hover:shadow-lg transition-all duration-400"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-gray-700 border border-gray-200/60">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3 text-[11px] font-medium text-gray-400">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-[15px] font-display font-semibold tracking-tight text-gray-900 mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-4 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <a
                  href={`#post-${post.id}`}
                  className="group/link flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors mt-auto"
                >
                  Толығырақ
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
