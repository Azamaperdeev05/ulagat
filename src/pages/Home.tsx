import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import Books from '../components/Books';
import Blog from '../components/Blog';
import Team from '../components/Team';
import Join from '../components/Join';
import Footer from '../components/Footer';
import { useSeo } from '../lib/seo';

export default function Home() {
  useSeo({
    title: 'ULAGAT - Оқырман клубы | Қарағанды',
    description:
      'Ұлағат - Қарағанды қаласындағы оқырман клубы. Кітап талқылауы, мәдени орта, ULAGAT Үні ансамблі және жастар қауымдастығы.',
    path: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'ULAGAT клубына қалай қосылуға болады?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'ulagatkrg.kz/apply бетіндегі өтінім формасын толтырыңыз. Команда сізбен байланысады.',
              },
            },
            {
              '@type': 'Question',
              name: 'Клуб тек Қарағанды тұрғындарына ма?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Негізгі офлайн кездесулер Қарағандыда өтеді, бірақ онлайн контент барлығына ашық.',
              },
            },
            {
              '@type': 'Question',
              name: 'Ансамбльге бөлек өтінім беруге бола ма?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Иә, өтінім формасында қызығушылық бағыты ретінде ансамбльді таңдауға болады.',
              },
            },
          ],
        },
        {
          '@type': 'Event',
          name: 'Махаббат бекеті',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          startDate: '2026-04-19T14:00:00+05:00',
          location: {
            '@type': 'Place',
            name: 'Қарағанды',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Қарағанды',
              addressCountry: 'KZ',
            },
          },
          organizer: {
            '@type': 'Organization',
            name: 'ULAGAT',
            url: 'https://ulagatkrg.kz',
          },
        },
      ],
    },
  });

  return (
    <>
      <Hero />
      <About />
      <Events />
      <Books />
      <Blog />
      <Team />
      <Join />
      <Footer />
    </>
  );
}
