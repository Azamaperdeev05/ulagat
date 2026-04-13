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
