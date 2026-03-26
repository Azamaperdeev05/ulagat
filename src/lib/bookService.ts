import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  increment,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── Кітаптар (books) ───

export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  description: string;
  image: string;
  slug: string;
  addedAt: Timestamp;
  likes: number;
}

const booksCol = collection(db, 'books');

/** Кітаптардың тізімін алу (realtime) */
export function subscribeBooks(callback: (books: Book[]) => void) {
  const q = query(booksCol, orderBy('addedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const books: Book[] = snapshot.docs.map((d) => ({
      id: d.id,
      likes: 0,
      ...d.data(),
    })) as Book[];
    callback(books);
  });
}

/** Барлық кітаптарды бір рет алу */
export async function getBooks(): Promise<Book[]> {
  const q = query(booksCol, orderBy('addedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    likes: 0,
    ...d.data(),
  })) as Book[];
}

/** Жаңа кітап қосу */
export async function addBook(book: Omit<Book, 'id' | 'addedAt' | 'likes'>) {
  return addDoc(booksCol, {
    ...book,
    addedAt: Timestamp.now(),
    likes: 0,
  });
}

/** Кітапты жаңарту */
export async function updateBook(bookId: string, data: Partial<Book>) {
  return updateDoc(doc(db, 'books', bookId), data);
}

/** Кітапты жою */
export async function deleteBook(bookId: string) {
  return deleteDoc(doc(db, 'books', bookId));
}

/** Кітапқа лайк */
export async function likeBook(bookId: string) {
  const bookRef = doc(db, 'books', bookId);
  return updateDoc(bookRef, { likes: increment(1) });
}

/** Кітаптан лайкты алу */
export async function unlikeBook(bookId: string) {
  const bookRef = doc(db, 'books', bookId);
  return updateDoc(bookRef, { likes: increment(-1) });
}

// ─── Пікірлер (comments) ───

export interface Comment {
  id: string;
  bookId: string;
  author: string;
  text: string;
  createdAt: Timestamp;
  likes: number;
  replyTo?: string;       // жауап берілген комментарий ID
  replyToAuthor?: string; // жауап берілген адамның аты
}

/** Кітапқа пікірлер (realtime) */
export function subscribeComments(
  bookId: string,
  callback: (comments: Comment[]) => void
) {
  const commentsCol = collection(db, 'books', bookId, 'comments');
  const q = query(commentsCol, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const comments: Comment[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Comment[];
    callback(comments);
  });
}

/** Жаңа пікір қосу */
export async function addComment(
  bookId: string,
  comment: { author: string; text: string; replyTo?: string; replyToAuthor?: string }
) {
  const commentsCol = collection(db, 'books', bookId, 'comments');
  return addDoc(commentsCol, {
    ...comment,
    bookId,
    createdAt: Timestamp.now(),
    likes: 0,
  });
}

/** Пікірге лайк */
export async function likeComment(bookId: string, commentId: string) {
  const commentRef = doc(db, 'books', bookId, 'comments', commentId);
  return updateDoc(commentRef, { likes: increment(1) });
}

/** Пікірден лайкты алу */
export async function unlikeComment(bookId: string, commentId: string) {
  const commentRef = doc(db, 'books', bookId, 'comments', commentId);
  return updateDoc(commentRef, { likes: increment(-1) });
}

/** Пікірді жою */
export async function deleteComment(bookId: string, commentId: string) {
  return deleteDoc(doc(db, 'books', bookId, 'comments', commentId));
}
