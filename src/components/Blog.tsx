import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  const previewPosts = blogPosts.slice(0, 3);

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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/blog"
              className="group flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Барлық мақалалар
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {previewPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-300 hover:shadow-lg transition-all duration-400 h-full"
            >
              <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[3/2] shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold text-gray-700 border border-gray-200/60">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 flex flex-col grow">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-[11px] font-medium text-gray-400">
                    <span>{post.date}</span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300" />
                    <div className="hidden sm:flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-[13px] sm:text-[15px] font-display font-semibold tracking-tight text-gray-900 mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}
