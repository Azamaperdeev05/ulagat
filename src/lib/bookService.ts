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
}

const booksCol = collection(db, 'books');

/** Кітаптардың тізімін алу (realtime) */
export function subscribeBooks(callback: (books: Book[]) => void) {
  const q = query(booksCol, orderBy('addedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const books: Book[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Book[];
    callback(books);
  });
}

/** Барлық кітаптарды бір рет алу */
export async function getBooks(): Promise<Book[]> {
  const q = query(booksCol, orderBy('addedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Book[];
}

/** Жаңа кітап қосу */
export async function addBook(book: Omit<Book, 'id' | 'addedAt'>) {
  return addDoc(booksCol, {
    ...book,
    addedAt: Timestamp.now(),
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

// ─── Пікірлер (comments) ───

export interface Comment {
  id: string;
  bookId: string;
  author: string;
  text: string;
  createdAt: Timestamp;
  likes: number;
}

/** Кітапқа пікірлер (realtime) */
export function subscribeComments(
  bookId: string,
  callback: (comments: Comment[]) => void
) {
  const commentsCol = collection(db, 'books', bookId, 'comments');
  const q = query(commentsCol, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const comments: Comment[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Comment[];
    callback(comments);
  });
}

/** Жаңа пікір қосу */
export async function addComment(
  bookId: string,
  comment: { author: string; text: string }
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

/** Пікірді жою */
export async function deleteComment(bookId: string, commentId: string) {
  return deleteDoc(doc(db, 'books', bookId, 'comments', commentId));
}
