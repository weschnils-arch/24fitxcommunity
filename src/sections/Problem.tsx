import { useEffect, useRef, useState } from 'react';
import { Scale, BatteryWarning, Zap, Utensils, Frown, Dumbbell } from 'lucide-react';

const painPoints = [
  {
    icon: Scale,
    text: 'Du nimmst einfach nicht ab, egal was du probierst.',
  },
  {
    icon: BatteryWarning,
    text: 'Dir fehlt die Motivation für regelmäßiges Training.',
  },
  {
    icon: Zap,
    text: 'Du fühlst dich oft müde, schlapp und energielos.',
  },
  {
    icon: Utensils,
    text: 'Gesunde Ernährung im Alltag überfordert dich.',
  },
  {
    icon: Frown,
    text: 'Du fühlst dich in deinem Körper einfach nicht mehr wohl.',
  },
  {
    icon: Dumbbell,
    text: 'Du trainierst hart, aber der Muskelaufbau stagniert.',
  },
];

export default function Problem() {
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

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-brand-dark section-padding overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`block text-brand-green font-bold tracking-[0.2em] text-sm uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Das Problem
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Kommt dir das bekannt vor?
          </h2>
          <p
            className={`text-brand-gray-text text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Du bist nicht allein. Viele unserer Mitglieder standen genau an diesem Punkt – frustriert,
            demotiviert und auf der Suche nach einer echten Lösung.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={`glass-card-dark p-6 rounded-xl transition-all duration-500 card-hover
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <point.icon size={24} className="text-brand-green" />
                </div>
                <p className="text-white text-lg leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
