import Header from './sections/Header';
import Hero from './sections/Hero';
import FitCheck from './sections/FitCheck';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Results from './sections/Results';
import Process from './sections/Process';
import Team from './sections/Team';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Results />
        <Process />
        <Team />
        <FitCheck />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
