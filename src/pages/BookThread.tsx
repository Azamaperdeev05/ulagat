import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  BookOpen,
  Send,
  Check,
  Loader2,
  Reply,
  X,
} from 'lucide-react';
import {
  subscribeBooks,
  subscribeComments,
  addComment,
  likeComment,
  unlikeComment,
  likeBook,
  unlikeBook,
  type Book,
  type Comment as FBComment,
} from '../lib/bookService';
import Footer from '../components/Footer';

export default function BookThread() {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<FBComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Кітаптарды Firestore-дан іздеу
  useEffect(() => {
    const unsubscribe = subscribeBooks((books) => {
      const found = books.find((b) => b.slug === slug);
      setBook(found || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [slug]);

  // Кітап табылғанда пікірлерді жүктеу
  useEffect(() => {
    if (!book) return;
    const unsubscribe = subscribeComments(book.id, (fbComments) => {
      setComments(fbComments);
    });
    return () => unsubscribe();
  }, [book]);

  // localStorage-дан аты мен лайктарды қалпына келтіру
  useEffect(() => {
    const savedName = localStorage.getItem('ulagat-username');
    if (savedName) setAuthorName(savedName);
    if (slug) {
      setLiked(localStorage.getItem(`ulagat-like-${slug}`) === 'true');
      // Лайк қойылған комментарийлерді қалпына келтіру
      const savedCommentLikes = localStorage.getItem(`ulagat-comment-likes-${slug}`);
      if (savedCommentLikes) {
        try {
          setLikedComments(new Set(JSON.parse(savedCommentLikes)));
        } catch { /* ignore */ }
      }
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="ml-3 text-gray-400">Жүктелуде...</span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Кітап табылмады</p>
          <Link to="/#books" className="text-amber-500 hover:underline text-sm">
            ← Кітаптарға оралу
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = async () => {
    if (!book) return;
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`ulagat-like-${slug}`, String(newLiked));
    try {
      if (newLiked) {
        await likeBook(book.id);
      } else {
        await unlikeBook(book.id);
      }
    } catch (err) {
      // Revert on error
      setLiked(!newLiked);
      localStorage.setItem(`ulagat-like-${slug}`, String(!newLiked));
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (!book) return;
    const isLiked = likedComments.has(commentId);
    const newSet = new Set(likedComments);
    
    if (isLiked) {
      newSet.delete(commentId);
      setLikedComments(newSet);
      localStorage.setItem(`ulagat-comment-likes-${slug}`, JSON.stringify([...newSet]));
      try {
        await unlikeComment(book.id, commentId);
      } catch { /* revert */ }
    } else {
      newSet.add(commentId);
      setLikedComments(newSet);
      localStorage.setItem(`ulagat-comment-likes-${slug}`, JSON.stringify([...newSet]));
      try {
        await likeComment(book.id, commentId);
      } catch { /* revert */ }
    }
  };

  const handleReply = (commentId: string, author: string) => {
    setReplyTo({ id: commentId, author });
    commentInputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim() || !book) return;

    setSubmitting(true);
    try {
      await addComment(book.id, {
        author: authorName.trim(),
        text: newComment.trim(),
        ...(replyTo ? { replyTo: replyTo.id, replyToAuthor: replyTo.author } : {}),
      });
      localStorage.setItem('ulagat-username', authorName.trim());
      setNewComment('');
      setReplyTo(null);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Пікір қосу қатесі:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    const url = `https://ulagat-krg.vercel.app/books/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const formatTime = (comment: FBComment) => {
    if (!comment.createdAt) return 'Жаңа ғана';
    const date = comment.createdAt.toDate();
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Жаңа ғана';
    if (diffMin < 60) return `${diffMin} мин`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} сағ`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} к`;
    return date.toLocaleDateString('kk-KZ');
  };

  const likeCount = book.likes || 0;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <Link
            to="/#books"
            className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Кітаптарға оралу
          </Link>

          {/* ─── Thread header: Main post ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
          >
            {/* Author line */}
            <div className="px-5 pt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-sm">
                <BookOpen className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-gray-900">ulagat.club</span>
                  <span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">Оқырман клубы</span>
              </div>
            </div>

            {/* Text content */}
            <div className="px-5 pt-4 pb-3">
              <p className="text-[15px] text-gray-800 leading-relaxed">
                📚 <span className="font-semibold">{book.title}</span> — {book.author} ({book.year})
              </p>
              <p className="text-[14px] text-gray-600 font-light leading-relaxed mt-2">
                {book.description}
              </p>
            </div>

            {/* Book cover image */}
            <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-gray-100">
              <div className="relative aspect-9/14 sm:aspect-9/16 max-h-[400px] sm:max-h-[500px] bg-gray-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Action bar */}
            <div className="px-5 pb-4 flex items-center gap-6 border-t border-gray-100 pt-3">
              <button
                onClick={handleLike}
                className="flex items-center gap-1.5 group/btn transition-colors"
              >
                <motion.div
                  whileTap={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Heart
                    className={`w-[22px] h-[22px] transition-all duration-200 ${
                      liked
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-400 group-hover/btn:text-red-400'
                    }`}
                  />
                </motion.div>
                {likeCount > 0 && (
                  <span className={`text-[13px] font-medium ${liked ? 'text-red-500' : 'text-gray-400'}`}>
                    {likeCount}
                  </span>
                )}
              </button>

              <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-[22px] h-[22px]" />
                {comments.length > 0 && (
                  <span className="text-[13px] font-medium text-gray-400">{comments.length}</span>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-gray-400 hover:text-amber-500 transition-colors relative"
              >
                <Share2 className="w-[20px] h-[20px]" />
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg"
                    >
                      Көшірілді!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>

          {/* ─── Stats line ─── */}
          <div className="px-2 py-3 flex items-center gap-4 text-[12px] text-gray-400">
            {likeCount > 0 && <span>{likeCount} ұнату</span>}
            {comments.length > 0 && <span>{comments.length} пікір</span>}
          </div>

          {/* ─── Comments section (Threads-style) ─── */}
          {comments.length > 0 && (
            <div className="space-y-0">
              {comments.map((comment, i) => {
                const isCommentLiked = likedComments.has(comment.id);
                return (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white border border-gray-200/80 first:rounded-t-2xl last:rounded-b-2xl border-t-0 first:border-t"
                  >
                    <div className="p-4 sm:p-5 flex gap-3">
                      {/* Avatar */}
                      <div
                        className={`shrink-0 w-9 h-9 rounded-full ${getAvatarColor(
                          comment.author
                        )} flex items-center justify-center shadow-sm`}
                      >
                        <span className="text-white text-[11px] font-bold">
                          {getInitials(comment.author)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] font-semibold text-gray-900">
                            {comment.author}
                          </span>
                          <span className="text-[11px] text-gray-400">{formatTime(comment)}</span>
                        </div>

                        {/* Reply indicator */}
                        {comment.replyToAuthor && (
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Reply className="w-3 h-3 text-blue-400 rotate-180" />
                            <span className="text-[12px] text-blue-500 font-medium">
                              @{comment.replyToAuthor}
                            </span>
                          </div>
                        )}

                        <p className="text-[14px] text-gray-700 font-light leading-relaxed whitespace-pre-wrap">
                          {comment.text}
                        </p>

                        {/* Comment actions */}
                        <div className="flex items-center gap-5 mt-2.5">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className="flex items-center gap-1 transition-colors group/like"
                          >
                            <motion.div
                              whileTap={{ scale: 1.4 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 transition-all ${
                                  isCommentLiked
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-gray-400 group-hover/like:text-red-400'
                                }`}
                              />
                            </motion.div>
                            {comment.likes > 0 && (
                              <span className={`text-[11px] ${isCommentLiked ? 'text-red-500' : 'text-gray-400'}`}>
                                {comment.likes}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => handleReply(comment.id, comment.author)}
                            className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Жауап</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div ref={bottomRef} />

          {/* ─── Reply indicator ─── */}
          <AnimatePresence>
            {replyTo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 mx-1 flex items-center gap-2 text-[13px] text-blue-500"
              >
                <Reply className="w-3.5 h-3.5 rotate-180" />
                <span className="font-medium">@{replyTo.author}</span>
                <span className="text-gray-400">адамына жауап</span>
                <button
                  onClick={() => setReplyTo(null)}
                  className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── New comment input ─── */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-3 bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
          >
            {/* Author name input */}
            {!localStorage.getItem('ulagat-username') && (
              <div className="px-4 pt-4 pb-2 border-b border-gray-100">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Атыңыз"
                  className="w-full bg-transparent text-[14px] text-gray-900 placeholder-gray-400 outline-none font-medium"
                  required
                />
              </div>
            )}

            {/* Comment text */}
            <div className="px-4 py-3 flex items-start gap-3">
              <div
                className={`shrink-0 mt-0.5 w-9 h-9 rounded-full ${
                  authorName ? getAvatarColor(authorName) : 'bg-gray-300'
                } flex items-center justify-center shadow-sm`}
              >
                <span className="text-white text-[11px] font-bold">
                  {authorName ? getInitials(authorName) : '?'}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  ref={commentInputRef}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={replyTo ? `@${replyTo.author} адамына жауап...` : 'Ой-пікіріңізді жазыңыз...'}
                  rows={2}
                  className="w-full bg-transparent text-[14px] text-gray-900 placeholder-gray-400 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-4 pb-3 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim() || !authorName.trim() || submitting}
                className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-full hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {submitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {replyTo ? 'Жауап' : 'Жіберу'}
              </button>
            </div>
          </motion.form>

          {/* Hint */}
          <p className="text-center text-[11px] text-gray-400 mt-4 font-light">
            Пікірлер Firebase Firestore-да сақталады — барлық оқырмандар көре алады ✨
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
