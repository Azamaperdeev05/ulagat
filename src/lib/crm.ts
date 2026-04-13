export interface LeadPayload {
  name: string;
  phone: string;
  city?: string;
  about?: string;
  interest: string;
  source: 'apply-page' | 'join-section';
}

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/telegram-lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.error || 'Lead submit failed');
  }

  return result;
}
