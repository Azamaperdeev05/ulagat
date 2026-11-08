import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface LeadPayload {
  name: string;
  phone: string;
  city?: string;
  about?: string;
  interest: string;
  source: 'apply-page' | 'join-section' | 'manual-admin';
}

export interface Lead extends LeadPayload {
  id: string;
  createdAt: Timestamp;
  status: 'new' | 'contacted' | 'paid' | 'rejected';
  paid: boolean;
  fee: number;
  notes?: string;
}

const leadsCol = collection(db, 'leads');

export async function submitLead(payload: LeadPayload) {
  // 1. Save directly to Firestore leads collection
  let firestoreDocId = '';
  try {
    const docRef = await addDoc(leadsCol, {
      ...payload,
      createdAt: Timestamp.now(),
      status: 'new',
      paid: false,
      fee: 2000,
      notes: '',
    });
    firestoreDocId = docRef.id;
  } catch (err) {
    console.error('Firestore save lead error:', err);
  }

  // 2. Also send Telegram notification if configured
  try {
    await fetch('/api/telegram-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('Telegram notification skipped/failed:', err);
  }

  return { ok: true, id: firestoreDocId };
}

export function subscribeLeads(callback: (leads: Lead[]) => void) {
  const q = query(leadsCol, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const leads: Lead[] = snapshot.docs.map((d) => ({
        id: d.id,
        status: 'new',
        paid: false,
        fee: 2000,
        ...d.data(),
      })) as Lead[];
      callback(leads);
    },
    (err) => {
      console.error('subscribeLeads error:', err);
      callback([]);
    }
  );
}

export async function updateLeadStatus(
  leadId: string,
  data: Partial<Pick<Lead, 'status' | 'paid' | 'notes' | 'fee'>>
) {
  const ref = doc(db, 'leads', leadId);
  return updateDoc(ref, data);
}

export async function addManualLead(data: Omit<Lead, 'id' | 'createdAt'>) {
  return addDoc(leadsCol, {
    ...data,
    createdAt: Timestamp.now(),
  });
}

export async function deleteLead(leadId: string) {
  return deleteDoc(doc(db, 'leads', leadId));
}
