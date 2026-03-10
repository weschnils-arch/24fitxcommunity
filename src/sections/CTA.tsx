import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

import { ContactPopup } from '@/components/ContactPopup';

const benefits = [
  'Kostenlos',
  'Unverbindlich',
  'Persönlich',
];

export default function CTA() {
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
      id="cta"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-green to-brand-green-dark" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Headline */}
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Worauf wartest du noch?
          </h2>

          {/* Description */}
          <p
            className={`text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Dein kostenloses, unverbindliches Erstgespräch ist nur einen Klick entfernt. Lass uns gemeinsam herausfinden, wie du deine Ziele erreichst.
          </p>

          {/* Benefits */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle size={20} className="text-white" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button or Form */}
          <ContactPopup>
            <button
              className={`btn-white flex items-center justify-center gap-3 font-bold text-[17px] mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
                }`}
            >
              Jetzt kostenloses Erstgespräch buchen
              <ArrowRight size={20} />
            </button>
          </ContactPopup>

          {/* Trust Badge */}
          <div
            className={`inline-flex items-center justify-center gap-2 bg-black/20 px-5 py-2.5 rounded-full text-white/90 text-sm mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Clock size={16} />
            <span>Sichere dir jetzt einen der <strong className="font-semibold text-white">limitierten Plätze</strong> diese Woche</span>
          </div>
        </div>
      </div>
    </section>
  );
}
