import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, X } from 'lucide-react';

const transformations = [
  {
    image: '/images/results/Patrizia_P.webp',
    name: 'PATRIZIA P.',
    title: 'Working Mom',
    description: '„Mit zwei Kindern und Job dachte ich ehrlich, das schaffe ich nie. Jetzt habe ich abgenommen, mein Bauch ist straffer und ich habe endlich wieder Energie für meine Familie.“'
  },
  {
    image: '/images/results/Ogi_O.webp',
    name: 'OGI O.',
    title: 'Fitness Transformation',
    description: '„Ich war unsportlich und saß gefühlt nur auf der Couch. Mit dem Konzept habe ich wieder Energie, einfache Ernährungslösungen für den Alltag, viele Kilos verloren und wieder Motivation für Sport!"'
  },
  {
    image: '/images/results/Marcela_K.webp',
    name: 'MARCELA K.',
    title: 'Krankenschwester',
    description: '„Mein Job ist stressig und die Schichten als Krankenschwester wechseln ständig. Das Konzept hat mir gezeigt, dass gesunde Routinen trotzdem möglich sind.“'
  },
  {
    image: '/images/results/Eva_K.webp',
    name: 'EVA K.',
    title: 'Power ab 50',
    description: '„Mit über 50 dachte ich, große Veränderungen sind kaum noch möglich. Die Unterstützung in der Community hat so viel in mir ausgelöst. Ich habe nicht nur abgenommen, sondern auch ein völlig neues Mindset entwickelt.“'
  },
  {
    image: '/images/results/Manu_H.webp',
    name: 'MANU H.',
    title: 'Fitter & Definierter',
    description: '„Sport war immer Teil meines Lebens, aber Ernährung habe ich unterschätzt. Mit den Lösungen bin ich jetzt leistungsfähiger, definierter und einfach fitter.“'
  },
  {
    image: '/images/results/Martina_O.webp',
    name: 'MARTINA O.',
    title: 'Fit nach Schwangerschaft',
    description: '„Nach der Schwangerschaft wollte ich mich wieder wohlfühlen. Ich habe schnell wieder meine Form bekommen, mein Hautbild verbessert und auch viel mehr Energie für meinen Sohn.“'
  }
];

const feedbackImages = [
  { src: '/feedback1.webp', alt: 'Feedback 1' },
  { src: '/feedback2.webp', alt: 'Feedback 2' },
  { src: '/feedback3.webp', alt: 'Feedback 3' },
  { src: '/feedback4.webp', alt: 'Feedback 4' },
];

export default function Results() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  const scrollToCTA = () => {
    const element = document.querySelector('#cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative bg-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-brand-green font-bold text-xs tracking-[0.3em] uppercase mb-4 block">
            Erfolgsgeschichten
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 leading-tight">
            UNSERE <span className="text-brand-green">RESULTATE</span>
          </h2>
          <p className="text-brand-dark/40 text-lg md:text-xl whitespace-nowrap mx-auto">
            Keine leeren Versprechen - echte Menschen mit echten Ergebnissen.
          </p>
        </div>

        {/* Transformations Carousel - Redesigned to Horizontal Boxes */}
        <div className={`relative mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {transformations.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto bg-brand-gray/30 rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-10 shadow-sm border border-brand-dark/5">

                    {/* Left: Transformation Image (Smaller) */}
                    <div className="w-full md:w-[320px] lg:w-[350px] flex-shrink-0 mb-8 md:mb-0">
                      <div className="relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                        <img
                          src={item.image}
                          alt={`${item.name} Transformation`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 md:pl-12 flex flex-col items-center text-center relative">
                      <span className="absolute -top-6 -left-2 text-8xl text-brand-dark/5 font-serif pointer-events-none">"</span>

                      <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tighter mb-1 uppercase">
                          {item.name}
                        </h3>
                        <p className="text-brand-green font-semibold italic text-sm md:text-base">
                          {item.title}
                        </p>
                      </div>

                      <div className="mb-10 min-h-[100px] flex items-center">
                        <p className="text-brand-dark/70 text-base md:text-lg leading-relaxed px-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={scrollToCTA}
                          className="bg-brand-dark/20 text-brand-dark hover:bg-brand-green hover:text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300"
                        >
                          JETZT DEIN RESULTAT ERZIELEN!
                        </button>
                      </div>

                      <span className="absolute -bottom-10 -right-2 text-8xl text-brand-dark/5 font-serif pointer-events-none rotate-180">"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury Navigation */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={prevSlide}
              className="w-14 h-14 border border-brand-dark/10 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-green hover:border-brand-green hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === index ? 'bg-brand-green w-12' : 'bg-brand-dark/10 w-4'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-14 h-14 border border-brand-dark/10 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-green hover:border-brand-green hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Feedback Images Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {feedbackImages.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover cursor-pointer"
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Global CTA Button */}
        <div className="text-center">
          <button
            onClick={scrollToCTA}
            className={`bg-brand-green text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 mx-auto 
                       transition-all duration-500 hover:bg-brand-green-dark hover:scale-105 shadow-xl shadow-brand-green/20`}
          >
            Schreibe nun DEINE Erfolgsgeschichte
            <ArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged feedback"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
