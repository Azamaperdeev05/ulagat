import { motion } from 'framer-motion';
import { ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import { useSeo } from '../lib/seo';

export default function BlogPage() {
  useSeo({
    title: 'Блог - ULAGAT',
    description:
      'ULAGAT блогы: кітап оқу мәдениеті, қазақ әдебиеті, өнер, тіл және жастар дамуы туралы мақалалар.',
    path: '/blog',
  });

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Басты бетке
            </Link>
            <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
              Блог
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-white leading-tight tracking-tight mb-4">
              Ой бөлісу алаңы
            </h1>
            <p className="text-base md:text-lg text-gray-400 font-light max-w-xl leading-relaxed">
              Кітап, мәдениет, тіл, өнер және жеке дамыту туралы ойлар мен түсініктер.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-3xl overflow-hidden border border-gray-200/80 hover:border-accent/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide">
                  Таңдаулы
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 lg:p-10 lg:pr-12">
                <div className="flex items-center gap-3 mb-4 text-[12px] font-medium text-gray-400">
                  <span className="bg-gray-200/80 px-2.5 py-0.5 rounded-full text-gray-600 text-[11px] font-semibold">{featured.category}</span>
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 leading-snug tracking-tight mb-4 group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[13px] font-medium text-accent">
                  Толығырақ оқу
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-display font-semibold text-gray-900 mb-10 tracking-tight"
          >
            Барлық мақалалар
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {rest.map((post, idx) => {
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-300 hover:shadow-xl transition-all duration-400 h-full"
                >
                  <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[3/2] shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold text-gray-700 border border-gray-200/60">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-5 lg:p-6 flex flex-col grow">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-[11px] font-medium text-gray-400">
                        <span>{post.date}</span>
                        <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300" />
                        <div className="hidden sm:flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-[13px] sm:text-[16px] font-display font-semibold tracking-tight text-gray-900 mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-200 leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="hidden sm:block text-[13px] text-gray-500 font-light leading-relaxed mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-100/50 sm:border-gray-100 flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[12px] font-medium text-accent">
                        Толығырақ
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
