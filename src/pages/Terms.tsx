import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[12px] font-semibold text-accent tracking-widest uppercase mb-4 block">
            Заңды құжаттар
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-gray-900 tracking-tight mb-12">
            Пайдалану шарттары
          </h1>

          <div className="prose prose-gray max-w-none text-gray-600 space-y-8 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">1. Кіріспе</h2>
              <p>
                Бұл Пайдалану шарттары «ULAGAT» платформасы мен Клуб қызметтерінің жұмысын реттейді. Клуб мүшелігіне өтінім беру немесе сайтты қолдану арқылы сіз осы шарттарға келісетініңізді білдіресіз.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">2. Клуб мүшелігі</h2>
              <p>Клубқа мүше болу үшін:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Кітап оқу мен талқылауға деген шынайы қызығушылығыңыз болуы керек.</li>
                <li>Мүшелікке қабылдау өтінім арқылы және Клуб әкімшілігінің шешімімен жүзеге асады.</li>
                <li>Клуб ішінде өзара сыйлы және этикалық нормаларды сақтау міндетті.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">3. Зияткерлік меншік</h2>
              <p>
                Сайтта жарияланған барлық деректер (дизайн, логотип, мәтіндер) «ULAGAT» клубына тиесілі. Оларды коммерциялық мақсатта рұқсатсыз қолдануға тыйым салынады.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">4. Жауапкершілік</h2>
              <p>
                Біз сайт пен қызметтердің үздіксіз жұмысына ұмтыламыз, бірақ техникалық үзілістер үшін Клуб жауап бермейді. Сіздің берген ақпараттарыңыздың дұрыстығына өзіңіз жауаптысыз.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">5. Байланыс</h2>
              <p>
                Шарттар бойынша сұрақтарыңыз болса, бізге @ulagat.krg Instagram парақшасы немесе көрсетілген телефон нөмірі арқылы хабарласа аласыз.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
