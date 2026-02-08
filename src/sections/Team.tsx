import { useEffect, useRef, useState } from 'react';
import { Award, Users, Star, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '1000+', label: 'Begleitete Challenger' },
  { icon: Star, value: '4.9★', label: 'Durchschnittsbewertung' },
  { icon: TrendingUp, value: '95%', label: 'Erfolgsquote' },
  { icon: Award, value: '5+', label: 'Jahre Erfahrung' },
];

export default function Team() {
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
      id="team"
      ref={sectionRef}
      className="relative bg-brand-dark section-padding overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold text-brand-green mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            DEINE COACHES
          </h2>
          <h3
            className={`text-2xl md:text-3xl font-semibold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Wir sind Sarah & Patrick.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/Sarah&Patrick.webp"
                alt="Sarah & Patrick - Deine Coaches"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Glassmorphism Border */}
              <div className="absolute inset-0 border-4 border-brand-green/40 rounded-2xl pointer-events-none" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-green/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-green/20 rounded-full blur-xl" />
          </div>

          {/* Content */}
          <div>
            <p
              className={`text-brand-gray-text text-lg leading-relaxed mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Aus eigener Erfahrung wissen wir, wie es sich anfühlt, unzufrieden zu sein.
              Wir haben unsere eigenen Transformationen durchlebt und unsere Leidenschaft
              zum Beruf gemacht. Mit über 1000+ begleiteten Challengern, unserer Expertise
              und einer riesigen Portion Motivation stehen wir dir zur Seite. Wir sind nicht
              nur deine Coaches, wir sind deine Partner auf diesem Weg.
            </p>

            {/* Stats Grid */}
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card-dark p-5 rounded-xl text-center card-hover"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-brand-green/20 rounded-lg flex items-center justify-center">
                    <stat.icon size={24} className="text-brand-green" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-brand-gray-text text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
