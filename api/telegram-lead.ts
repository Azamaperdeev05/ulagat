function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const interestLabel: Record<string, string> = {
  books: 'Кітап оқу',
  ensemble: 'ULAGAT Үні ансамблі',
  both: 'Екеуі де',
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({
      error: 'CRM config missing: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const name = String(body?.name || '').trim();
    const phone = String(body?.phone || '').trim();
    const city = String(body?.city || '').trim();
    const about = String(body?.about || '').trim();
    const interest = String(body?.interest || 'books').trim();
    const source = String(body?.source || 'apply-page').trim();

    if (!name || !phone) {
      return res.status(400).json({ error: 'name and phone are required' });
    }

    const message = [
      '🆕 <b>Жаңа өтінім (ULAGAT)</b>',
      '',
      `<b>Көзі:</b> ${escapeHtml(source)}`,
      `<b>Аты-жөні:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Қала:</b> ${escapeHtml(city || '-')}`,
      `<b>Бағыты:</b> ${escapeHtml(interestLabel[interest] || interest)}`,
      `<b>Өзі туралы:</b> ${escapeHtml(about || '-')}`,
      `<b>Уақыты:</b> ${escapeHtml(new Date().toISOString())}`,
    ].join('\n');

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const tgResult = await tgResponse.json();

    if (!tgResponse.ok || !tgResult?.ok) {
      return res.status(502).json({ error: 'Telegram API error', details: tgResult });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Unexpected server error' });
  }
}
