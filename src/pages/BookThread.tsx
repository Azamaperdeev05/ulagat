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
} from 'lucide-react';
import { booksData } from '../components/Books';
import Footer from '../components/Footer';

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  likes: number;
  likedByMe: boolean;
}

function getStoredComments(slug: string): Comment[] {
  try {
    const stored = localStorage.getItem(`ulagat-comments-${slug}`);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function saveComments(slug: string, comments: Comment[]) {
  localStorage.setItem(`ulagat-comments-${slug}`, JSON.stringify(comments));
}

function getStoredLike(slug: string): boolean {
  return localStorage.getItem(`ulagat-like-${slug}`) === 'true';
}

function getStoredLikeCount(slug: string): number {
  const c = localStorage.getItem(`ulagat-likecount-${slug}`);
  return c ? parseInt(c, 10) : 0;
}

export default function BookThread() {
  const { slug } = useParams<{ slug: string }>();
  const book = booksData.find((b) => b.slug === slug);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    setComments(getStoredComments(slug));
    setLiked(getStoredLike(slug));
    setLikeCount(getStoredLikeCount(slug));
    const savedName = localStorage.getItem('ulagat-username');
    if (savedName) setAuthorName(savedName);
  }, [slug]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Кітап табылмады</p>
          <Link to="/#books" className="text-accent hover:underline text-sm">
            ← Кітаптарға оралу
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLiked(newLiked);
    setLikeCount(newCount);
    localStorage.setItem(`ulagat-like-${slug}`, String(newLiked));
    localStorage.setItem(`ulagat-likecount-${slug}`, String(newCount));
  };

  const handleCommentLike = (commentId: string) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          likedByMe: !c.likedByMe,
          likes: c.likedByMe ? c.likes - 1 : c.likes + 1,
        };
      }
      return c;
    });
    setComments(updated);
    saveComments(slug!, updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      text: newComment.trim(),
      time: 'Жаңа ғана',
      likes: 0,
      likedByMe: false,
    };

    const updated = [...comments, comment];
    setComments(updated);
    saveComments(slug!, updated);
    localStorage.setItem('ulagat-username', authorName.trim());
    setNewComment('');

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
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
                  <span className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
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

            {/* Book cover image — 9:16 */}
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
                <Heart
                  className={`w-[22px] h-[22px] transition-all duration-200 ${
                    liked
                      ? 'text-red-500 fill-red-500 scale-110'
                      : 'text-gray-400 group-hover/btn:text-red-400'
                  }`}
                />
                {likeCount > 0 && (
                  <span className={`text-[13px] ${liked ? 'text-red-500' : 'text-gray-400'}`}>
                    {likeCount}
                  </span>
                )}
              </button>

              <button className="flex items-center gap-1.5 text-gray-400">
                <MessageCircle className="w-[22px] h-[22px]" />
                {comments.length > 0 && (
                  <span className="text-[13px] text-gray-400">{comments.length}</span>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-gray-400 hover:text-accent transition-colors relative"
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
              {comments.map((comment, i) => (
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
                        <span className="text-[11px] text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-[14px] text-gray-700 font-light leading-relaxed whitespace-pre-wrap">
                        {comment.text}
                      </p>

                      {/* Comment actions */}
                      <div className="flex items-center gap-5 mt-2.5">
                        <button
                          onClick={() => handleCommentLike(comment.id)}
                          className="flex items-center gap-1 transition-colors"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-all ${
                              comment.likedByMe
                                ? 'text-red-500 fill-red-500'
                                : 'text-gray-400 hover:text-red-400'
                            }`}
                          />
                          {comment.likes > 0 && (
                            <span
                              className={`text-[11px] ${
                                comment.likedByMe ? 'text-red-500' : 'text-gray-400'
                              }`}
                            >
                              {comment.likes}
                            </span>
                          )}
                        </button>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div ref={bottomRef} />

          {/* ─── New comment input ─── */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-4 bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
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
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ой-пікіріңізді жазыңыз..."
                  rows={2}
                  className="w-full bg-transparent text-[14px] text-gray-900 placeholder-gray-400 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-4 pb-3 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim() || !authorName.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-full hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Жіберу
              </button>
            </div>
          </motion.form>

          {/* Hint */}
          <p className="text-center text-[11px] text-gray-400 mt-4 font-light">
            Пікірлер тек сіздің құрылғыңызда сақталады
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
