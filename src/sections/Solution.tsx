import { useEffect, useRef, useState } from 'react';
import { Salad, Dumbbell, Users, ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: Salad,
    title: 'Ernährung',
    description: 'Maßgeschneiderte Programme, die schmecken und funktionieren.',
  },
  {
    icon: Dumbbell,
    title: 'Training',
    description: 'Effektive Workouts, die Spaß machen und Resultate liefern.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Motivation und Unterstützung von Gleichgesinnten, die dich verstehen.',
  },
];

export default function Solution() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToCTA = () => {
    const element = document.querySelector('#cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative bg-white section-padding overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/team_new.webp"
                alt="Sarah & Patrick - Deine Coaches"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Glassmorphism Border Effect */}
              <div className="absolute inset-0 border-4 border-brand-green/30 rounded-2xl pointer-events-none" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-green/10 rounded-full blur-xl" />
          </div>

          {/* Content */}
          <div>
            <h2
              className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              DEINE PERSÖNLICHE TRANSFORMATION
            </h2>
            <h3
              className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Unser Konzept kombiniert, was wirklich zählt.
            </h3>
            <p
              className={`text-brand-dark-light text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Wir haben einen einfachen Plan entwickelt, der sich nahtlos in deinen Alltag
              integriert. Unser Erfolg basiert auf drei Säulen, die dich sicher an dein Ziel
              bringen: eine ausgewogene Ernährung, effektive Workouts und eine Community,
              die dich trägt.
            </p>

            {/* Three Pillars */}
            <div className="space-y-4 mb-8">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-5 bg-brand-green/5 border-l-4 border-brand-green 
                             rounded-r-lg transition-all duration-500 card-hover
                             ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <pillar.icon size={24} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-dark mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-brand-dark-light">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToCTA}
              className={`btn-primary flex items-center gap-2 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Entdecke unser Konzept
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
