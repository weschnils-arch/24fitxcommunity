import { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.1 }
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
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold text-brand-green mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            ÜBER UNS
          </h2>
          <h3
            className={`text-2xl md:text-3xl font-semibold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Wir sind für dich da
          </h3>
          <p
            className={`text-brand-gray-text text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Lerne die Menschen kennen, die dich auf deinem Weg begleiten werden – mit Expertise, Empathie und echter Leidenschaft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Patrick Card */}
          <div className={`glass-card-dark rounded-3xl overflow-hidden flex flex-col transition-all duration-700 delay-300 card-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-brand-dark">
              <img src="/images/team/Patrick.webp" alt="Patrick" className="w-full h-full object-cover object-top" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col bg-brand-dark/40 relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">Patrick</h3>
              <p className="text-brand-green font-semibold mb-6">Community Gründer</p>

              <p className="text-brand-gray-text leading-relaxed mb-8 flex-1">
                Mit über 8 Jahren Erfahrung hat Patrick hunderten Menschen geholfen, ihre Ziele zu erreichen. Seine Leidenschaft: mit Spaß und Leichtigkeit Menschen zu ihrer besten Version zu führen.
              </p>

              {/* Pills */}
              <div className="flex flex-col items-center gap-2 mt-auto w-full">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <span className="px-2 sm:px-3 py-1.5 bg-brand-green/10 text-brand-green text-xs sm:text-sm rounded-full border border-brand-green/20 text-center whitespace-normal flex items-center justify-center leading-snug">
                    ehemaliger Sportlehrer
                  </span>
                  <span className="px-2 sm:px-3 py-1.5 bg-brand-green/10 text-brand-green text-xs sm:text-sm rounded-full border border-brand-green/20 text-center whitespace-normal flex items-center justify-center leading-snug">
                    Lifestyle Coach
                  </span>
                </div>
                <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green text-xs sm:text-sm rounded-full border border-brand-green/20 text-center whitespace-normal w-max max-w-full inline-block leading-snug">
                  Ex-Fußballer
                </span>
              </div>
            </div>
          </div>

          {/* Sarah Card */}
          <div className={`glass-card-dark rounded-3xl overflow-hidden flex flex-col transition-all duration-700 delay-400 card-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-brand-dark">
              <img src="/images/team/Sarah.webp" alt="Sarah" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col bg-brand-dark/40 relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">Sarah</h3>
              <p className="text-brand-green font-semibold mb-6">Co-Gründerin</p>

              <p className="text-brand-gray-text leading-relaxed mb-8 flex-1">
                Sarah versteht die Herausforderungen wenn trotz Sport Resultate ausbleiben. Mit dem Ernährungskonzept und ihren Erfahrungen zeigt sie wo der Schlüssel zu deinem Erfolg wirklich liegt.
              </p>

              {/* Pills */}
              <div className="flex flex-col items-center gap-2 mt-auto w-full">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <span className="px-2 sm:px-3 py-1.5 bg-brand-green/10 text-brand-green text-xs sm:text-sm rounded-full border border-brand-green/20 text-center whitespace-normal flex items-center justify-center leading-snug">
                    Women Empowerment
                  </span>
                  <span className="px-2 sm:px-3 py-1.5 bg-brand-green/10 text-brand-green text-xs sm:text-sm rounded-full border border-brand-green/20 text-center whitespace-normal flex items-center justify-center leading-snug">
                    Powerdance
                  </span>
                </div>
                <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green text-xs sm:text-sm rounded-full border border-brand-green/20 text-center whitespace-normal w-max max-w-full inline-block leading-snug">
                  Weltenbummlerin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
