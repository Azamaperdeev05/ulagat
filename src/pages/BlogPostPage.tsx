import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown';
import { useSeo } from '../lib/seo';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useSeo({
    title: post ? `${post.title} | ULAGAT блогы` : 'Блог - ULAGAT',
    description: post?.excerpt || 'ULAGAT блогындағы мақаланы оқыңыз.',
    path: post ? `/blog/${post.slug}` : '/blog',
    image: post?.image,
    type: post ? 'article' : 'website',
    structuredData: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: [post.image],
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'ULAGAT',
          },
          mainEntityOfPage: `https://ulagat-krg.vercel.app/blog/${post.slug}`,
        }
      : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Sticky Back Button */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-6 py-3">
        <div className="max-w-3xl mx-auto w-full">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900 transition-colors font-medium group"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Блогқа оралу
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-[11px] font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-[12px] text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-[44px] font-display font-semibold text-white leading-tight tracking-tight">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Author + Content */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Author bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-gray-900">{post.author}</p>
              <p className="text-[12px] text-gray-400">ULAGAT клубының сайтологі</p>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-display prose-headings:tracking-tight prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-gray-600 prose-p:font-light
              prose-li:text-[15px] prose-li:text-gray-600 prose-li:font-light
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-table:text-sm
              prose-th:bg-gray-100 prose-th:px-4 prose-th:py-2
              prose-td:px-4 prose-td:py-2 prose-td:border-gray-200
            "
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.div>

          {/* Share / CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center"
          >
            <p className="text-[15px] text-gray-600 font-light mb-4">
              Мақала ұнады ма? ULAGAT клубына қосылыңыз — кітап оқып, бірге өсейік!
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-[13px] font-medium rounded-full hover:bg-accent transition-colors"
            >
              Клубқа қосылу
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xl md:text-2xl font-display font-semibold text-gray-900 mb-8 tracking-tight">
            Тағы да оқыңыз
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((rPost, idx) => (
              <motion.article
                key={rPost.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/blog/${rPost.slug}`} className="flex flex-col flex-grow">
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-gray-700">
                      {rPost.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-2 text-[11px] font-medium text-gray-400">
                      <span>{rPost.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rPost.readTime}
                      </div>
                    </div>
                    <h4 className="text-[15px] font-display font-semibold tracking-tight text-gray-900 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h4>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
