import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Books from './components/Books';
import Blog from './components/Blog';
import Team from './components/Team';
import Join from './components/Join';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Events />
        <Gallery />
        <Books />
        <Blog />
        <Team />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
