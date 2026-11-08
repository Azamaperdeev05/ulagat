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
} from 'firebase/firestore';
import { db } from './firebase';

export interface EventItem {
  id: string;
  title: string;
  author: string;
  date: string;
  time: string;
  image: string;
  link?: string;
  location?: string;
  addedAt?: Timestamp;
}

export const initialDefaultEvents: Omit<EventItem, 'id'>[] = [
  {
    title: 'Поэзиялық кеш',
    author: 'Қозы Көрпеш - Баян Сұлу мерекесі',
    date: '11 Сәуір',
    time: '17:00',
    image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop',
    link: 'https://koktem.vercel.app/',
    location: 'Qasymkitap, Қарағанды',
  },
  {
    title: 'Махаббат бекеті',
    author: 'Сезімге толы әдемі кеш',
    date: '19 Сәуір',
    time: '14:00',
    image: '/mahabbat.jpeg',
    location: 'Qasymkitap, Қарағанды',
  },
  {
    title: 'Көксерек (Жаңа топ)',
    author: 'Мұхтар Әуезов',
    date: '12 Сәуір',
    time: '14:00',
    image: 'https://simg.marwin.kz/media/catalog/product/f/i/uezov_m_kkserek.jpeg',
    location: 'Qasymkitap, Қарағанды',
  },
  {
    title: 'Тазының өлімі (Жалғастырушы)',
    author: 'Мұхтар Мағауин (Қисық ағаш)',
    date: '12 Сәуір',
    time: '16:00',
    image: 'https://resources.cdn-kaspi.kz/img/m/p/p7d/pb7/1453139.jpeg?format=gallery-medium',
    location: 'Qasymkitap, Қарағанды',
  },
];

const eventsCol = collection(db, 'events');

export function subscribeEvents(callback: (events: EventItem[]) => void) {
  const q = query(eventsCol, orderBy('addedAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        callback(
          initialDefaultEvents.map((e, idx) => ({
            id: `default-${idx}`,
            ...e,
          }))
        );
      } else {
        const list: EventItem[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as EventItem[];
        callback(list);
      }
    },
    (err) => {
      console.warn('subscribeEvents fallback:', err);
      callback(
        initialDefaultEvents.map((e, idx) => ({
          id: `default-${idx}`,
          ...e,
        }))
      );
    }
  );
}

export async function addEvent(item: Omit<EventItem, 'id' | 'addedAt'>) {
  return addDoc(eventsCol, {
    ...item,
    addedAt: Timestamp.now(),
  });
}

export async function updateEvent(eventId: string, data: Partial<EventItem>) {
  return updateDoc(doc(db, 'events', eventId), data);
}

export async function deleteEvent(eventId: string) {
  return deleteDoc(doc(db, 'events', eventId));
}
