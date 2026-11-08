import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  BookOpen,
  Users,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Download,
  MessageCircle,
  X,
  Check,
  Lock,
  RefreshCw,
  Phone,
  MapPin,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  subscribeLeads,
  updateLeadStatus,
  addManualLead,
  deleteLead,
  Lead,
} from '../lib/crm';
import {
  subscribeBooks,
  addBook,
  updateBook,
  deleteBook,
  Book,
} from '../lib/bookService';
import {
  subscribeEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  EventItem,
} from '../lib/eventService';

export default function Admin() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ulagat_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'books' | 'events' | 'settings'>('dashboard');

  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscriptions
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const unsubLeads = subscribeLeads((data) => {
      setLeads(data);
      setLoading(false);
    });

    const unsubBooks = subscribeBooks((data) => {
      setBooks(data);
    });

    const unsubEvents = subscribeEvents((data) => {
      setEvents(data);
    });

    return () => {
      unsubLeads();
      unsubBooks();
      unsubEvents();
    };
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('ulagat_admin_pass') || 'ulagat2026';
    if (passwordInput.trim() === storedPass) {
      sessionStorage.setItem('ulagat_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Құпиясөз қате. Қайта көріңіз.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ulagat_admin_auth');
    setIsAuthenticated(false);
  };

  // ── CRM Filter & Search ──
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'new' | 'contacted' | 'paid' | 'rejected'>('all');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.phone.includes(leadSearch) ||
        (lead.city && lead.city.toLowerCase().includes(leadSearch.toLowerCase()));
      const matchStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, leadSearch, leadStatusFilter]);

  // Lead metrics
  const totalRevenue = useMemo(() => {
    return leads.filter((l) => l.paid || l.status === 'paid').length * 2000;
  }, [leads]);

  const paidCount = useMemo(() => {
    return leads.filter((l) => l.paid || l.status === 'paid').length;
  }, [leads]);

  const newLeadsCount = useMemo(() => {
    return leads.filter((l) => l.status === 'new').length;
  }, [leads]);

  // ── Modals state ──
  // Lead modal
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    city: 'Қарағанды',
    interest: 'books',
    about: '',
    paid: false,
    status: 'new' as Lead['status'],
  });

  // Book modal
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [bookFormData, setBookFormData] = useState({
    title: '',
    author: '',
    year: '2026',
    slug: '',
    image: '',
    description: '',
  });

  // Event modal
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    author: '',
    date: '',
    time: '',
    image: '',
    link: '',
    location: 'Qasymkitap, Қарағанды',
  });

  // Settings: change password
  const [newPassword, setNewPassword] = useState('');
  const [passSaveMsg, setPassSaveMsg] = useState('');

  // ── Handlers ──
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name.trim() || !newLeadData.phone.trim()) return;
    await addManualLead({
      name: newLeadData.name.trim(),
      phone: newLeadData.phone.trim(),
      city: newLeadData.city.trim(),
      interest: newLeadData.interest,
      about: newLeadData.about.trim(),
      source: 'manual-admin',
      status: newLeadData.status,
      paid: newLeadData.paid,
      fee: 2000,
    });
    setIsAddLeadModalOpen(false);
    setNewLeadData({
      name: '',
      phone: '',
      city: 'Қарағанды',
      interest: 'books',
      about: '',
      paid: false,
      status: 'new',
    });
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookFormData.title.trim()) return;

    const slug =
      bookFormData.slug.trim() ||
      bookFormData.title
        .toLowerCase()
        .replace(/[^a-z0-9а-яёәіңғүұқөһ]/gi, '-')
        .replace(/-+/g, '-');

    if (editingBookId) {
      await updateBook(editingBookId, {
        title: bookFormData.title.trim(),
        author: bookFormData.author.trim(),
        year: bookFormData.year.trim(),
        image: bookFormData.image.trim(),
        description: bookFormData.description.trim(),
        slug,
      });
    } else {
      await addBook({
        title: bookFormData.title.trim(),
        author: bookFormData.author.trim(),
        year: bookFormData.year.trim(),
        image: bookFormData.image.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
        description: bookFormData.description.trim(),
        slug,
      });
    }
    setIsBookModalOpen(false);
    setEditingBookId(null);
    setBookFormData({ title: '', author: '', year: '2026', slug: '', image: '', description: '' });
  };

  const handleOpenEditBook = (book: Book) => {
    setEditingBookId(book.id);
    setBookFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      slug: book.slug,
      image: book.image,
      description: book.description,
    });
    setIsBookModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventFormData.title.trim()) return;

    if (editingEventId && !editingEventId.startsWith('default-')) {
      await updateEvent(editingEventId, eventFormData);
    } else {
      await addEvent(eventFormData);
    }
    setIsEventModalOpen(false);
    setEditingEventId(null);
    setEventFormData({
      title: '',
      author: '',
      date: '',
      time: '',
      image: '',
      link: '',
      location: 'Qasymkitap, Қарағанды',
    });
  };

  const handleOpenEditEvent = (ev: EventItem) => {
    setEditingEventId(ev.id);
    setEventFormData({
      title: ev.title,
      author: ev.author,
      date: ev.date,
      time: ev.time,
      image: ev.image,
      link: ev.link || '',
      location: ev.location || 'Qasymkitap, Қарағанды',
    });
    setIsEventModalOpen(true);
  };

  const exportLeadsCSV = () => {
    const headers = ['Аты-жөні', 'Телефон', 'Қала', 'Бағыты', 'Жарна (₸)', 'Мәртебесі', 'Төленді', 'Өзі туралы', 'Күні'];
    const rows = leads.map((l) => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.city || ''}"`,
      `"${l.interest}"`,
      l.fee || 2000,
      `"${l.status}"`,
      l.paid ? 'Иә' : 'Жоқ',
      `"${(l.about || '').replace(/"/g, '""')}"`,
      l.createdAt?.toDate ? l.createdAt.toDate().toLocaleString('kk-KZ') : '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ulagat_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openWhatsAppToLead = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(
      `Сәлеметсіз бе, ${lead.name}! Ұлағат оқырман клубынан хабарласып тұрмыз. Клубқа кіру жарнасы (2 000 ₸) және алдағы кездесу туралы ақпарат беруге дайынбыз.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${greeting}`, '_blank');
  };

  // ── 1. If not authenticated: show Login Screen ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-xl shadow-gray-900/5 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-light border border-accent/20 mb-6">
            <Shield className="w-8 h-8 text-accent" />
          </div>

          <h1 className="text-2xl font-display font-semibold text-gray-900 tracking-tight mb-2">
            ULAGAT әкімшілік панелі
          </h1>
          <p className="text-[13px] text-gray-500 font-light mb-8">
            Оқырман клубы мен өтінімдерді басқару үшін құпиясөзді енгізіңіз.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Құпиясөз (пароль)"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            </div>

            {authError && (
              <p className="text-[12px] text-red-500 font-medium text-left">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl text-[14px] transition-colors shadow-md"
            >
              Кіру
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-[12px] text-gray-400">
            <span>Бастапқы кілт: ulagat2026</span>
            <Link to="/" className="text-accent hover:underline">
              Сайтқа қайту
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── 2. Authenticated Dashboard ──
  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/ulagat (1).svg" alt="ULAGAT" className="w-6 h-6 object-contain" />
              <span className="font-display font-bold text-lg tracking-tight">ULAGAT</span>
            </Link>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-accent-light text-accent font-semibold border border-accent/20">
              Басқару панелі
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Сайтты көру
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Шығу
            </button>
          </div>
        </div>
      </header>

      {/* Main Nav Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto flex gap-1 sm:gap-6 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Шолу (Дашборд)', icon: DollarSign },
            { id: 'leads', label: `Өтінімдер (${leads.length})`, icon: Users },
            { id: 'books', label: `Кітаптар (${books.length})`, icon: BookOpen },
            { id: 'events', label: `Іс-шаралар (${events.length})`, icon: Calendar },
            { id: 'settings', label: 'Баптаулар', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-accent text-gray-900 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'leads' && newLeadsCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                    {newLeadsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full grow">
        {/* ── TAB 1: DASHBOARD ── */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[12px] font-medium uppercase tracking-wider">Барлық өтінім</span>
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900">{leads.length}</div>
                <div className="text-[12px] text-gray-400 mt-1">
                  Жаңа өтінімдер: <span className="font-semibold text-amber-600">{newLeadsCount}</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[12px] font-medium uppercase tracking-wider">Төленген мүшелік</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900">{paidCount}</div>
                <div className="text-[12px] text-emerald-600 mt-1">2 000 ₸ жарнасы расталған</div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[12px] font-medium uppercase tracking-wider">Жалпы жарна сомасы</span>
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900">
                  {totalRevenue.toLocaleString('kk-KZ')} <span className="text-lg text-accent">₸</span>
                </div>
                <div className="text-[12px] text-gray-400 mt-1">Оқырман жарналарынан</div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[12px] font-medium uppercase tracking-wider">Кітапхана қоры</span>
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900">{books.length}</div>
                <div className="text-[12px] text-gray-400 mt-1">
                  Алдағы іс-шаралар: <span className="font-semibold text-gray-700">{events.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Leads (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-display font-semibold text-gray-900">Соңғы өтінімдер</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-[12px] text-accent font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Барлығын ашу <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 text-sm">Әзірге өтінімдер түскен жоқ</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {leads.slice(0, 5).map((lead) => (
                      <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-medium text-[14px] text-gray-900">{lead.name}</div>
                          <div className="text-[12px] text-gray-400 flex items-center gap-2 mt-0.5">
                            <span>{lead.phone}</span>
                            <span>•</span>
                            <span>{lead.city || 'Қарағанды'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              lead.status === 'paid' || lead.paid
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : lead.status === 'contacted'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {lead.status === 'paid' || lead.paid
                              ? '2 000 ₸ Төленді'
                              : lead.status === 'contacted'
                              ? 'Байланысылды'
                              : 'Жаңа'}
                          </span>

                          <button
                            onClick={() => openWhatsAppToLead(lead)}
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                            title="WhatsApp арқылы жазу"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions Panel (1 col) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-display font-semibold text-gray-900 mb-3">Жылдам әрекеттер</h3>
                  <p className="text-[12px] text-gray-500 font-light mb-6">
                    Жаңа деректерді сайтқа бірден қосу және басқару.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setEditingBookId(null);
                        setBookFormData({ title: '', author: '', year: '2026', slug: '', image: '', description: '' });
                        setIsBookModalOpen(true);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left flex items-center justify-between text-[13px] font-medium text-gray-800 transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-accent" />
                        Жаңа кітап қосу
                      </span>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                      onClick={() => {
                        setEditingEventId(null);
                        setEventFormData({
                          title: '',
                          author: '',
                          date: '',
                          time: '',
                          image: '',
                          link: '',
                          location: 'Qasymkitap, Қарағанды',
                        });
                        setIsEventModalOpen(true);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left flex items-center justify-between text-[13px] font-medium text-gray-800 transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-accent" />
                        Іс-шара / кездесу қосу
                      </span>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                      onClick={() => setIsAddLeadModalOpen(true)}
                      className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left flex items-center justify-between text-[13px] font-medium text-gray-800 transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-accent" />
                        Қолмен оқырман тіркеу
                      </span>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Байланыс үйлестірушісі
                  </div>
                  <div className="text-[13px] font-medium text-gray-900">Айбану (+7 747 447 6486)</div>
                  <div className="text-[12px] text-gray-500">Клуб мүшелігі мен қабылдау менеджері</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: LEADS CRM ── */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  Өтінімдер мен мүшелер ({leads.length})
                </h2>
                <p className="text-[13px] text-gray-500 font-light mt-0.5">
                  Сайттан түскен барлық сауалдар, төлем мәртебесі және байланыс.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportLeadsCSV}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-[13px] font-medium text-gray-700 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Excel / CSV
                </button>
                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Өтінім қосу
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Аты немесе телефон бойынша іздеу..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                {[
                  { id: 'all', label: 'Барлығы' },
                  { id: 'new', label: 'Жаңа' },
                  { id: 'contacted', label: 'Байланысылды' },
                  { id: 'paid', label: '2 000 ₸ Төленді' },
                  { id: 'rejected', label: 'Бас тартылды' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setLeadStatusFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-medium transition-colors whitespace-nowrap ${
                      leadStatusFilter === st.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-medium">
                    <tr>
                      <th className="py-3.5 px-4">Аты-жөні</th>
                      <th className="py-3.5 px-4">Телефон</th>
                      <th className="py-3.5 px-4">Қаласы</th>
                      <th className="py-3.5 px-4">Бағыты</th>
                      <th className="py-3.5 px-4">Жарна (2 000 ₸)</th>
                      <th className="py-3.5 px-4">Мәртебесі</th>
                      <th className="py-3.5 px-4 text-right">Әрекеттер</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-gray-400">
                          Өтінімдер табылмады
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-900">{lead.name}</div>
                            {lead.about && (
                              <div className="text-[11px] text-gray-400 truncate max-w-[200px]" title={lead.about}>
                                {lead.about}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-gray-700">
                            {lead.phone}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600">{lead.city || 'Қарағанды'}</td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px]">
                              {lead.interest === 'ensemble'
                                ? 'Ансамбль'
                                : lead.interest === 'both'
                                ? 'Екеуі де'
                                : 'Кітап оқу'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <button
                              onClick={() => {
                                const nextPaid = !lead.paid;
                                updateLeadStatus(lead.id, {
                                  paid: nextPaid,
                                  status: nextPaid ? 'paid' : 'contacted',
                                });
                              }}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                                lead.paid || lead.status === 'paid'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : 'bg-gray-100 text-gray-500 border-gray-200 hover:border-gray-400'
                              }`}
                            >
                              <Check
                                className={`w-3 h-3 ${
                                  lead.paid || lead.status === 'paid' ? 'opacity-100' : 'opacity-40'
                                }`}
                              />
                              2 000 ₸ {lead.paid || lead.status === 'paid' ? 'Төленді' : 'Төленбеді'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                const newSt = e.target.value as Lead['status'];
                                updateLeadStatus(lead.id, {
                                  status: newSt,
                                  paid: newSt === 'paid' ? true : lead.paid,
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-[12px] font-medium text-gray-700 focus:outline-none"
                            >
                              <option value="new">Жаңа</option>
                              <option value="contacted">Байланысылды</option>
                              <option value="paid">2 000 ₸ төленді</option>
                              <option value="rejected">Бас тартылды</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => openWhatsAppToLead(lead)}
                                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                title="WhatsApp арқылы жазу"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`${lead.name} өтінімін жоюға сенімдісіз бе?`)) {
                                    deleteLead(lead.id);
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                title="Жою"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: BOOKS ── */}
        {activeTab === 'books' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  Кітаптар қоры ({books.length})
                </h2>
                <p className="text-[13px] text-gray-500 font-light mt-0.5">
                  Басты беттегі кітаптар каталогын қосу, өзгерту немесе өшіру.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBookId(null);
                  setBookFormData({ title: '', author: '', year: '2026', slug: '', image: '', description: '' });
                  setIsBookModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Жаңа кітап қосу
              </button>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl border border-gray-200/90 p-5 flex flex-col justify-between shadow-xs hover:border-accent/40 transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-xl bg-gray-100 shrink-0 border border-gray-100 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="grow">
                      <h3 className="font-display font-semibold text-[15px] text-gray-900 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-[12px] text-accent font-medium">{book.author}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{book.year} жыл</p>
                      <p className="text-[12px] text-gray-500 font-light line-clamp-2 mt-2">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/books/${book.slug}`}
                      target="_blank"
                      className="text-[12px] text-gray-500 hover:text-gray-900 inline-flex items-center gap-1"
                    >
                      <span>Талқылау беті</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditBook(book)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Өңдеу"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`«${book.title}» кітабын жоюға сенімдісіз бе?`)) {
                            deleteBook(book.id);
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        title="Жою"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: EVENTS ── */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  Алдағы іс-шаралар мен кездесулер ({events.length})
                </h2>
                <p className="text-[13px] text-gray-500 font-light mt-0.5">
                  Басты бетте көрсетілетін кездесу күндерін реттеу.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingEventId(null);
                  setEventFormData({
                    title: '',
                    author: '',
                    date: '',
                    time: '',
                    image: '',
                    link: '',
                    location: 'Qasymkitap, Қарағанды',
                  });
                  setIsEventModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Іс-шара қосу
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white rounded-2xl border border-gray-200/90 p-5 flex flex-col justify-between shadow-xs hover:border-accent/40 transition-all"
                >
                  <div>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-accent mb-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.date}</span>
                      {ev.time && <span>• {ev.time}</span>}
                    </div>
                    <h3 className="font-display font-semibold text-[16px] text-gray-900 mb-1">
                      {ev.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 font-light">{ev.author}</p>
                    {ev.location && (
                      <div className="text-[12px] text-gray-400 flex items-center gap-1 mt-2">
                        <MapPin className="w-3 h-3" />
                        <span>{ev.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleOpenEditEvent(ev)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                      title="Өңдеу"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`«${ev.title}» шарасын жоюға сенімдісіз бе?`)) {
                          deleteEvent(ev.id);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                      title="Жою"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-900">Әкімшілік баптаулары</h2>
              <p className="text-[13px] text-gray-500 font-light mt-0.5">
                Қауіпсіздік және жүйелік параметрлер.
              </p>
            </div>

            {/* Change Password Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-display font-semibold text-gray-900">
                Админ құпиясөзін өзгерту
              </h3>
              <p className="text-[13px] text-gray-500 font-light">
                Панельге кіру үшін жаңа құпиясөз енгізіңіз.
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Жаңа құпиясөз..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPassword.trim().length >= 4) {
                      localStorage.setItem('ulagat_admin_pass', newPassword.trim());
                      setPassSaveMsg('Құпиясөз сәтті сақталды!');
                      setNewPassword('');
                      setTimeout(() => setPassSaveMsg(''), 3000);
                    } else {
                      alert('Құпиясөз кем дегенде 4 таңбадан тұруы керек.');
                    }
                  }}
                  className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-xl transition-colors"
                >
                  Сақтау
                </button>
              </div>
              {passSaveMsg && <p className="text-[12px] text-emerald-600 font-medium">{passSaveMsg}</p>}
            </div>

            {/* System Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-display font-semibold text-gray-900">Жүйелік ақпарат</h3>
              <div className="divide-y divide-gray-100 text-[13px]">
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-500">Дерекқор:</span>
                  <span className="font-semibold text-gray-800">Firebase Firestore (ulagat-club)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-500">Клубқа кіру жарнасы:</span>
                  <span className="font-semibold text-accent">2 000 ₸</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-500">Қабылдау үйлестірушісі:</span>
                  <span className="font-semibold text-gray-800">Айбану (+7 747 447 6486)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-500">Сайт домені:</span>
                  <span className="font-semibold text-gray-800">ulagatkrg.kz</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── MODALS ── */}

      {/* 1. Add Lead Modal */}
      <AnimatePresence>
        {isAddLeadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-display font-semibold text-gray-900">
                  Қолмен жаңа оқырман тіркеу
                </h3>
                <button
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="space-y-4 pt-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Аты-жөні *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    placeholder="Мысалы: Мұхтар Әуезов"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Телефон (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="+7 7xx xxx xx xx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">
                      Қаласы
                    </label>
                    <input
                      type="text"
                      value={newLeadData.city}
                      onChange={(e) => setNewLeadData({ ...newLeadData, city: e.target.value })}
                      placeholder="Қарағанды"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">
                      Бағыты
                    </label>
                    <select
                      value={newLeadData.interest}
                      onChange={(e) => setNewLeadData({ ...newLeadData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                    >
                      <option value="books">Кітап оқу</option>
                      <option value="ensemble">Ансамбль</option>
                      <option value="both">Екеуі де</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
                    <input
                      type="checkbox"
                      checked={newLeadData.paid}
                      onChange={(e) =>
                        setNewLeadData({
                          ...newLeadData,
                          paid: e.target.checked,
                          status: e.target.checked ? 'paid' : 'contacted',
                        })
                      }
                      className="w-4 h-4 rounded text-accent focus:ring-accent"
                    />
                    <span>2 000 ₸ жарнасы бірден төленді</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Ескертпе немесе пікір
                  </label>
                  <textarea
                    rows={3}
                    value={newLeadData.about}
                    onChange={(e) => setNewLeadData({ ...newLeadData, about: e.target.value })}
                    placeholder="Қосымша мәлімет..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Болдырмау
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium"
                  >
                    Қосу
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Book Modal (Add / Edit) */}
      <AnimatePresence>
        {isBookModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-display font-semibold text-gray-900">
                  {editingBookId ? 'Кітапты өңдеу' : 'Жаңа кітап қосу'}
                </h3>
                <button
                  onClick={() => setIsBookModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBook} className="space-y-4 pt-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Кітап атауы *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookFormData.title}
                    onChange={(e) => setBookFormData({ ...bookFormData, title: e.target.value })}
                    placeholder="Мысалы: Абай жолы"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">
                      Авторы
                    </label>
                    <input
                      type="text"
                      value={bookFormData.author}
                      onChange={(e) => setBookFormData({ ...bookFormData, author: e.target.value })}
                      placeholder="Мұхтар Әуезов"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">
                      Жылы
                    </label>
                    <input
                      type="text"
                      value={bookFormData.year}
                      onChange={(e) => setBookFormData({ ...bookFormData, year: e.target.value })}
                      placeholder="1942"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Мұқаба суретінің сілтемесі (Image URL)
                  </label>
                  <input
                    type="url"
                    value={bookFormData.image}
                    onChange={(e) => setBookFormData({ ...bookFormData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Сілтеме аты (URL Slug)
                  </label>
                  <input
                    type="text"
                    value={bookFormData.slug}
                    onChange={(e) => setBookFormData({ ...bookFormData, slug: e.target.value })}
                    placeholder="abai-zholy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Қысқаша сипаттамасы
                  </label>
                  <textarea
                    rows={4}
                    value={bookFormData.description}
                    onChange={(e) => setBookFormData({ ...bookFormData, description: e.target.value })}
                    placeholder="Кітап жайлы қысқаша мәлімет..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Болдырмау
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Event Modal (Add / Edit) */}
      <AnimatePresence>
        {isEventModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-display font-semibold text-gray-900">
                  {editingEventId ? 'Іс-шараны өңдеу' : 'Жаңа кездесу қосу'}
                </h3>
                <button
                  onClick={() => setIsEventModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-4 pt-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Кездесу атауы *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="Махаббат бекеті немесе Кітап талдауы"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Спикер / Тақырып / Автор
                  </label>
                  <input
                    type="text"
                    value={eventFormData.author}
                    onChange={(e) => setEventFormData({ ...eventFormData, author: e.target.value })}
                    placeholder="Сезімге толы әдемі кеш"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">
                      Күні
                    </label>
                    <input
                      type="text"
                      value={eventFormData.date}
                      onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                      placeholder="19 Сәуір"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">
                      Уақыты
                    </label>
                    <input
                      type="text"
                      value={eventFormData.time}
                      onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                      placeholder="14:00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Өтетін орны
                  </label>
                  <input
                    type="text"
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    placeholder="Qasymkitap, Қарағанды"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Постер немесе фото сілтемесі (Image URL)
                  </label>
                  <input
                    type="text"
                    value={eventFormData.image}
                    onChange={(e) => setEventFormData({ ...eventFormData, image: e.target.value })}
                    placeholder="/mahabbat.jpeg немесе https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">
                    Қосымша сыртқы сілтеме (Link)
                  </label>
                  <input
                    type="url"
                    value={eventFormData.link}
                    onChange={(e) => setEventFormData({ ...eventFormData, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEventModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Болдырмау
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
