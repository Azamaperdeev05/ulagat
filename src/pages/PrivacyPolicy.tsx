import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
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
            Құпиялылық саясаты
          </h1>

          <div className="prose prose-gray max-w-none text-gray-600 space-y-8 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">1. Жалпы ережелер</h2>
              <p>
                Осы Құпиялылық саясаты «ULAGAT» оқырман клубы (бұдан әрі — Клуб) пайдаланушыларының дербес деректерін жинау, сақтау және өңдеу тәртібін анықтайды. Біз сіздің құпиялылығыңызды құрметтейміз және деректеріңіздің қауіпсіздігін қамтамасыз етуге міндеттенеміз.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">2. Қандай деректерді жинаймыз?</h2>
              <p>Біз келесі ақпаратты жинауымыз мүмкін:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Аты-жөніңіз;</li>
                <li>Байланыс телефон нөмірі;</li>
                <li>Электрондық пошта мекенжайы (егер ұсынылса);</li>
                <li>Сіздің қызығушылықтарыңыз бен оқыған кітаптарыңыз туралы ақпарат.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">3. Деректерді пайдалану мақсаты</h2>
              <p>Жиналған деректер келесі мақсаттарда қолданылады:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Клуб мүшелігіне қабылдау және тіркеу;</li>
                <li>Алдағы іс-шаралар туралы хабарландыру;</li>
                <li>Қолданушылармен кері байланыс орнату;</li>
                <li>Қызмет көрсету сапасын жақсарту.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">4. Деректерді қорғау</h2>
              <p>
                Біз сіздің дербес деректеріңізді рұқсатсыз кіруден, өзгертуден немесе жоюдан қорғау үшін заманауи техникалық және ұйымдастырушылық шараларды қолданамыз. Біз сіздің деректеріңізді үшінші тұлғаларға сатпаймыз және бермейміз.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">5. Өзгерістер</h2>
              <p>
                Клуб осы Құпиялылық саясатына кез келген уақытта өзгерістер енгізу құқығын өзіне қалдырады. Жаңартылған саясат сайтта жарияланған сәттен бастап күшіне енеді.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
