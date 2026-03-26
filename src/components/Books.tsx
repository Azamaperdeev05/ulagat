import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Repeat2, Send, ArrowLeft, BookOpen } from 'lucide-react';

interface Thread {
  id: number;
  author: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  replies: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  description: string;
  image: string;
  threads: Thread[];
}

const books: Book[] = [
  {
    id: 1,
    title: 'Көк балақ',
    author: 'Мұхтар Мағауин',
    year: '2023',
    description:
      'Домбыра күй өнеріне арналған роман. Атақты күйші Тоқсобаның тағдыры арқылы ХХ ғасырдағы қазақ халқының тарихи оқиғалары, ұлттық рухани еркіндік және мәдени мұраны сақтау мәселелері көтеріледі.',
    image:
      'https://resources.cdn-kaspi.kz/img/m/p/h78/h7f/64694828335134.jpg?format=gallery-large',
    threads: [
      {
        id: 1,
        author: 'Айгерім',
        avatar: '🎵',
        time: '2 күн бұрын',
        text: 'Тоқсобаның тағдыры мені қатты толғандырды. Онер адамдарының қадірін білмейтін орта — қазірдің өзінде маңызды мәселе.',
        likes: 24,
        replies: 5,
      },
      {
        id: 2,
        author: 'Ерлан',
        avatar: '📖',
        time: '3 күн бұрын',
        text: 'Қазақ күйінің құдіреті осы романда кереметтей ашылады. Мағауиннің тілі — поэзия!',
        likes: 18,
        replies: 3,
      },
      {
        id: 3,
        author: 'Дана',
        avatar: '✨',
        time: '5 күн бұрын',
        text: 'Нәріктің бейнесі арқылы жастардың ұлттық мұраға деген көзқарасы өте жақсы берілген.',
        likes: 12,
        replies: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Робинзон Крузо',
    author: 'Даниэль Дефо',
    year: '1719',
    description:
      'Әлемдік классиканың ең танымал шығармасы. Кеме апаты кезінде шалғай аралға түскен Робинзон Крузо 28 жыл бойы бір өзі өмір сүреді. Адамның табиғатпен күресі, ерік-жігері мен тапқырлығы туралы мәңгілік шығарма.',
    image:
      'https://simg.marwin.kz/media/catalog/product/cache/8d1771fdd19ec2393e47701ba45e606d/_/1/defo_d_robinzon_kruzo.jpeg',
    threads: [
      {
        id: 1,
        author: 'Бекзат',
        avatar: '🏝️',
        time: '1 апта бұрын',
        text: 'Бала кезде оқыған кітабымды қайта оқыдым — мүлдем басқа көзбен көрдім. Робинзонның қиындықтарға төзімділігі шабыт береді.',
        likes: 31,
        replies: 7,
      },
      {
        id: 2,
        author: 'Назерке',
        avatar: '🌊',
        time: '1 апта бұрын',
        text: 'Жастарға міндетті түрде оқылатын кітап. Ерік-жігер, еңбек, шыдамдылық — осының бәрі Робинзон бейнесінде.',
        likes: 22,
        replies: 4,
      },
    ],
  },
  {
    id: 3,
    title: 'Ақ түндер',
    author: 'Фёдор Достоевский',
    year: '1848',
    description:
      'Санкт-Петербургтің ақ түндеріндегі жалғыз қиялшыл жігіт пен Настя арасындағы махаббат хикаясы. Жалғыздық, махаббат, үміт пен қиял — Достоевскийдің ерте кезеңіндегі ең нәзік шығармасы.',
    image:
      'https://resources.cdn-kaspi.kz/img/m/p/h7e/h11/63826439110686.jpg?format=gallery-large',
    threads: [
      {
        id: 1,
        author: 'Мадина',
        avatar: '🌙',
        time: '4 күн бұрын',
        text: 'Достоевский жалғыздықты осыншама нәзік жаза білетініне таңғалдым. Ақ түндер — жүрекке жақын шығарма.',
        likes: 28,
        replies: 6,
      },
      {
        id: 2,
        author: 'Арман',
        avatar: '💭',
        time: '6 күн бұрын',
        text: '«Қиялшыл» кейіпкер біздің әрқайсымыздың ішінде бар. Бұл кітапты оқыған кезде өзіңді тануға мәжбүр боласың.',
        likes: 19,
        replies: 3,
      },
      {
        id: 3,
        author: 'Сәуле',
        avatar: '🌸',
        time: '1 апта бұрын',
        text: 'Тек 4 түннің ішінде адам тағдыры қалай өзгеретіні — Достоевскийдің шеберлігі!',
        likes: 15,
        replies: 2,
      },
    ],
  },
];

export default function Books() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <section id="books" className="py-24 lg:py-36 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
            Кітаптар
          </span>
          <h2 className="text-3xl md:text-[42px] font-display font-semibold text-gray-900 leading-tight tracking-tight">
            Біз оқыған кітаптар
          </h2>
          <p className="text-base text-gray-500 font-light mt-3 max-w-lg">
            Әр кітапты таңдап, оқырмандар ой-пікірлерін оқыңыз. Өз пікіріңізді де қалдыра аласыз.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedBook ? (
            /* ───────────── Book Grid ───────────── */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {books.map((book, idx) => (
                <motion.button
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setSelectedBook(book)}
                  className="group text-left bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-gray-900/[0.06] transition-all duration-500"
                >
                  {/* Book cover */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {/* Thread count badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/60">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-[12px] font-semibold text-gray-700">
                        {book.threads.length} пікір
                      </span>
                    </div>
                  </div>

                  {/* Book info */}
                  <div className="p-5">
                    <h3 className="text-lg font-display font-semibold text-gray-900 tracking-tight group-hover:text-accent transition-colors mb-1">
                      {book.title}
                    </h3>
                    <p className="text-[13px] text-gray-400 font-medium mb-3">
                      {book.author} · {book.year}
                    </p>
                    <p className="text-[13px] text-gray-500 font-light leading-relaxed line-clamp-2">
                      {book.description}
                    </p>

                    {/* Preview avatars */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex -space-x-2">
                        {book.threads.slice(0, 3).map((t) => (
                          <div
                            key={t.id}
                            className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm"
                          >
                            {t.avatar}
                          </div>
                        ))}
                      </div>
                      <span className="text-[12px] text-gray-400 font-light">
                        Талқылауға кіру →
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* ───────────── Thread View (Threads-style) ───────────── */
            <motion.div
              key="thread"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl mx-auto"
            >
              {/* Back button */}
              <button
                onClick={() => setSelectedBook(null)}
                className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Кітаптарға оралу
              </button>

              {/* Book header post */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 mb-4 shadow-sm">
                <div className="flex gap-4">
                  {/* Book cover thumbnail */}
                  <div className="shrink-0 w-16 h-24 rounded-xl overflow-hidden shadow-md bg-gray-100">
                    <img
                      src={selectedBook.image}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                        <BookOpen className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[13px] font-semibold text-gray-900">Ulagat Club</span>
                      <span className="text-[11px] text-gray-400">· Ай кітабы</span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 tracking-tight">
                      {selectedBook.title}
                    </h3>
                    <p className="text-[13px] text-gray-400 font-medium">
                      {selectedBook.author} · {selectedBook.year}
                    </p>
                    <p className="text-[14px] text-gray-600 font-light leading-relaxed mt-3">
                      {selectedBook.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-100">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-[12px]">42</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[12px]">{selectedBook.threads.length}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-green-500 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-[12px]">8</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-accent transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thread replies */}
              <div className="space-y-0">
                {selectedBook.threads.map((thread, i) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative bg-white border border-gray-200/80 border-t-0 first:border-t first:rounded-t-2xl last:rounded-b-2xl p-5"
                  >
                    {/* Thread line */}
                    {i < selectedBook.threads.length - 1 && (
                      <div className="absolute left-[34px] bottom-0 w-0.5 h-5 bg-gray-100 translate-y-full z-10" />
                    )}

                    <div className="flex gap-3.5">
                      {/* Avatar */}
                      <div className="shrink-0 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg border border-gray-200/60">
                        {thread.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] font-semibold text-gray-900">
                            {thread.author}
                          </span>
                          <span className="text-[11px] text-gray-400">{thread.time}</span>
                        </div>
                        <p className="text-[14px] text-gray-700 font-light leading-relaxed">
                          {thread.text}
                        </p>

                        {/* Thread actions */}
                        <div className="flex items-center gap-5 mt-3">
                          <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{thread.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{thread.replies}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors">
                            <Repeat2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Reply input */}
              <div className="mt-4 bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-sm">📝</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Ой-пікіріңізді жазыңыз..."
                    className="flex-1 bg-transparent text-[14px] text-gray-900 placeholder-gray-400 outline-none"
                  />
                  <button className="px-4 py-2 bg-gray-900 text-white text-[12px] font-medium rounded-full hover:bg-gray-800 transition-colors">
                    Жіберу
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
