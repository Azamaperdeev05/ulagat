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

/* ── Helpers ── */
const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const avatarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-amber-500',
  'bg-emerald-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500',
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const formatTime = (c: FBComment) => {
  if (!c.createdAt) return 'Жаңа ғана';
  const date = c.createdAt.toDate();
  const diff = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diff < 1) return 'Жаңа ғана';
  if (diff < 60) return `${diff} мин`;
  const h = Math.floor(diff / 60);
  if (h < 24) return `${h} сағ`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} к`;
  return date.toLocaleDateString('kk-KZ');
};

/* ── Comment thread type ── */
interface CommentThread {
  parent: FBComment;
  replies: FBComment[];
}

function buildThreads(comments: FBComment[]): CommentThread[] {
  const parentMap = new Map<string, FBComment>();
  const replyMap = new Map<string, FBComment[]>();

  // Алдымен барлық ата-комментарийлерді табу
  comments.forEach((c) => {
    if (!c.replyTo) {
      parentMap.set(c.id, c);
      if (!replyMap.has(c.id)) replyMap.set(c.id, []);
    }
  });

  // Жауаптарды ата-комментарийлеріне бөлу
  comments.forEach((c) => {
    if (c.replyTo) {
      const list = replyMap.get(c.replyTo);
      if (list) {
        list.push(c);
      } else {
        // Ата-комментарий жойылған болса, жеке thread ретінде көрсету
        parentMap.set(c.id, c);
        replyMap.set(c.id, []);
      }
    }
  });

  const threads: CommentThread[] = [];
  // Ата-комментарийлерді createdAt бойынша сұрыптау
  const sortedParents = [...parentMap.values()].sort((a, b) => {
    const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
    const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
    return aTime - bTime;
  });

  sortedParents.forEach((parent) => {
    const replies = (replyMap.get(parent.id) || []).sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
      const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
      return aTime - bTime;
    });
    threads.push({ parent, replies });
  });

  return threads;
}

/* ── Single Comment Component ── */
function CommentBubble({
  comment,
  isReply,
  isLiked,
  onLike,
  onReply,
}: {
  comment: FBComment;
  isReply: boolean;
  isLiked: boolean;
  onLike: () => void;
  onReply: () => void;
  isLastReply?: boolean;
}) {
  return (
    <div className={`flex gap-3 ${isReply ? '' : ''}`}>
      {/* Avatar */}
      <div
        className={`shrink-0 ${isReply ? 'w-7 h-7' : 'w-9 h-9'} rounded-full ${getAvatarColor(
          comment.author
        )} flex items-center justify-center shadow-sm relative z-10`}
      >
        <span className={`text-white font-bold ${isReply ? 'text-[9px]' : 'text-[11px]'}`}>
          {getInitials(comment.author)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`font-semibold text-gray-900 ${isReply ? 'text-[12px]' : 'text-[13px]'}`}>
            {comment.author}
          </span>
          <span className="text-[11px] text-gray-400">{formatTime(comment)}</span>
        </div>

        {/* Reply indicator */}
        {isReply && comment.replyToAuthor && (
          <span className="text-[11px] text-blue-500 font-medium mb-0.5 block">
            @{comment.replyToAuthor}
          </span>
        )}

        <p className={`text-gray-700 font-light leading-relaxed whitespace-pre-wrap ${
          isReply ? 'text-[13px]' : 'text-[14px]'
        }`}>
          {comment.text}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-5 mt-2">
          <button
            onClick={onLike}
            className="flex items-center gap-1 transition-colors group/like"
          >
            <motion.div whileTap={{ scale: 1.4 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Heart
                className={`w-3.5 h-3.5 transition-all ${
                  isLiked
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-400 group-hover/like:text-red-400'
                }`}
              />
            </motion.div>
            {comment.likes > 0 && (
              <span className={`text-[11px] ${isLiked ? 'text-red-500' : 'text-gray-400'}`}>
                {comment.likes}
              </span>
            )}
          </button>
          <button
            onClick={onReply}
            className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-[11px]">Жауап</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
/*  MAIN COMPONENT                                */
/* ══════════════════════════════════════════════ */
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

  useEffect(() => {
    const unsub = subscribeBooks((books) => {
      setBook(books.find((b) => b.slug === slug) || null);
      setLoading(false);
    });
    return () => unsub();
  }, [slug]);

  useEffect(() => {
    if (!book) return;
    const unsub = subscribeComments(book.id, setComments);
    return () => unsub();
  }, [book]);

  useEffect(() => {
    const savedName = localStorage.getItem('ulagat-username');
    if (savedName) setAuthorName(savedName);
    if (slug) {
      setLiked(localStorage.getItem(`ulagat-like-${slug}`) === 'true');
      const saved = localStorage.getItem(`ulagat-comment-likes-${slug}`);
      if (saved) try { setLikedComments(new Set(JSON.parse(saved))); } catch { /* skip */ }
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
          <Link to="/#books" className="text-amber-500 hover:underline text-sm">← Кітаптарға оралу</Link>
        </div>
      </div>
    );
  }

  /* ── Handlers ── */
  const handleLike = async () => {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`ulagat-like-${slug}`, String(next));
    try { next ? await likeBook(book.id) : await unlikeBook(book.id); }
    catch { setLiked(!next); localStorage.setItem(`ulagat-like-${slug}`, String(!next)); }
  };

  const handleCommentLike = async (commentId: string) => {
    const isLiked = likedComments.has(commentId);
    const next = new Set(likedComments);
    isLiked ? next.delete(commentId) : next.add(commentId);
    setLikedComments(next);
    localStorage.setItem(`ulagat-comment-likes-${slug}`, JSON.stringify([...next]));
    try { isLiked ? await unlikeComment(book.id, commentId) : await likeComment(book.id, commentId); }
    catch { /* revert silently */ }
  };

  const handleReply = (commentId: string, author: string) => {
    setReplyTo({ id: commentId, author });
    setTimeout(() => commentInputRef.current?.focus(), 100);
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
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) { console.error('Пікір қосу қатесі:', err); }
    finally { setSubmitting(false); }
  };

  const handleShare = async () => {
    const url = `https://ulagat-krg.vercel.app/books/${slug}`;
    try { await navigator.clipboard.writeText(url); }
    catch { const el = document.createElement('input'); el.value = url; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const likeCount = book.likes || 0;
  const threads = buildThreads(comments);
  const totalComments = comments.length;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link
            to="/#books"
            className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Кітаптарға оралу
          </Link>

          {/* ─── Main post card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
          >
            {/* Author */}
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

            {/* Content */}
            <div className="px-5 pt-4 pb-3">
              <p className="text-[15px] text-gray-800 leading-relaxed">
                📚 <span className="font-semibold">{book.title}</span> — {book.author} ({book.year})
              </p>
              <p className="text-[14px] text-gray-600 font-light leading-relaxed mt-2">
                {book.description}
              </p>
            </div>

            {/* Image */}
            <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-gray-100">
              <div className="relative aspect-9/14 sm:aspect-9/16 max-h-[400px] sm:max-h-[500px] bg-gray-100">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-4 flex items-center gap-6 border-t border-gray-100 pt-3">
              <button onClick={handleLike} className="flex items-center gap-1.5 group/btn transition-colors">
                <motion.div whileTap={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Heart className={`w-[22px] h-[22px] transition-all duration-200 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400 group-hover/btn:text-red-400'}`} />
                </motion.div>
                {likeCount > 0 && (
                  <span className={`text-[13px] font-medium ${liked ? 'text-red-500' : 'text-gray-400'}`}>{likeCount}</span>
                )}
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-[22px] h-[22px]" />
                {totalComments > 0 && <span className="text-[13px] font-medium text-gray-400">{totalComments}</span>}
              </button>
              <button onClick={handleShare} className="flex items-center gap-1.5 text-gray-400 hover:text-amber-500 transition-colors relative">
                <Share2 className="w-[20px] h-[20px]" />
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg"
                    >
                      Көшірілді!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="px-2 py-3 flex items-center gap-4 text-[12px] text-gray-400">
            {likeCount > 0 && <span>{likeCount} ұнату</span>}
            {totalComments > 0 && <span>{totalComments} пікір</span>}
          </div>

          {/* ─── Threaded comments ─── */}
          {threads.length > 0 && (
            <div className="space-y-0">
              {threads.map((thread, ti) => (
                <motion.div
                  key={thread.parent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: ti * 0.05 }}
                  className="bg-white border border-gray-200/80 first:rounded-t-2xl last:rounded-b-2xl border-t-0 first:border-t"
                >
                  <div className="p-4 sm:p-5">
                    {/* ── Parent comment ── */}
                    <CommentBubble
                      comment={thread.parent}
                      isReply={false}
                      isLiked={likedComments.has(thread.parent.id)}
                      onLike={() => handleCommentLike(thread.parent.id)}
                      onReply={() => handleReply(thread.parent.id, thread.parent.author)}
                    />

                    {/* ── Replies with Threads-style connector ── */}
                    {thread.replies.length > 0 && (
                      <div className="ml-[18px] mt-0 border-l-2 border-gray-200 pl-0">
                        {thread.replies.map((reply, ri) => (
                          <div key={reply.id} className="relative mt-3">
                            {/* Horizontal connector from vertical line to reply avatar */}
                            <div className="absolute left-0 top-[14px] w-5 h-0 border-t-2 border-gray-200" />
                            <div className="ml-7">
                              <CommentBubble
                                comment={reply}
                                isReply
                                isLastReply={ri === thread.replies.length - 1}
                                isLiked={likedComments.has(reply.id)}
                                onLike={() => handleCommentLike(reply.id)}
                                onReply={() => handleReply(thread.parent.id, reply.author)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
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
                className="mt-3 mx-1 flex items-center gap-2 text-[13px]"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-blue-500" />
                </div>
                <span className="text-blue-500 font-medium">@{replyTo.author}</span>
                <span className="text-gray-400">адамына жауап жазу</span>
                <button onClick={() => setReplyTo(null)} className="ml-auto text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── New comment ─── */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onSubmit={handleSubmit}
            className={`mt-3 bg-white rounded-2xl border overflow-hidden shadow-sm transition-colors ${
              replyTo ? 'border-blue-300' : 'border-gray-200/80'
            }`}
          >
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
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                {replyTo ? 'Жауап' : 'Жіберу'}
              </button>
            </div>
          </motion.form>

          <p className="text-center text-[11px] text-gray-400 mt-4 font-light">
            Пікірлер Firebase Firestore-да сақталады — барлық оқырмандар көре алады ✨
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
