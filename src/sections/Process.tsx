import { useEffect, useRef, useState } from 'react';
import { Handshake, ClipboardList, Rocket, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Handshake,
    number: '01',
    title: 'Kennenlernen',
    description:
      'Buche dein kostenloses Erstgespräch. Wir analysieren deine Ziele und klären alle deine Fragen.',
  },
  {
    icon: ClipboardList,
    number: '02',
    title: 'Plan erstellen',
    description:
      'Du erhältst deinen individuellen Plan, der perfekt auf dich und deinen Alltag zugeschnitten ist.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Durchstarten',
    description:
      'Werde Teil unserer Community, nimm an den Live-Workouts teil und setze deinen Plan mit unserer Hilfe um.',
  },
  {
    icon: Trophy,
    number: '04',
    title: 'Erfolge feiern',
    description:
      'Wir begleiten dich, feiern deine Meilensteine und sorgen dafür, dass du deine Ziele nicht nur erreichst, sondern auch langfristig hältst.',
  },
];

export default function Process() {
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
      id="process"
      ref={sectionRef}
      className="relative bg-white section-padding overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`section-title transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            DEIN WEG ZU UNS
          </h2>
          <h3
            className={`section-headline transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            In 4 einfachen Schritten zu deinem neuen Ich.
          </h3>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-brand-green/20 rounded-full" />

            {/* Steps */}
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative text-center transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Number Circle */}
                  <div className="relative z-10 w-20 h-20 mx-auto mb-6 bg-brand-green rounded-full flex items-center justify-center shadow-lg card-hover">
                    <span className="text-white text-2xl font-bold">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 bg-brand-green/10 rounded-xl flex items-center justify-center">
                    <step.icon size={28} className="text-brand-green" />
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-brand-dark mb-3">{step.title}</h4>
                  <p className="text-brand-dark-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile/Tablet */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-brand-green/20 rounded-full" />

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Number Circle */}
                  <div className="relative z-10 w-16 h-16 flex-shrink-0 bg-brand-green rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-brand-green/5 rounded-xl p-5 border-l-4 border-brand-green">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon size={20} className="text-brand-green" />
                      <h4 className="text-lg font-bold text-brand-dark">{step.title}</h4>
                    </div>
                    <p className="text-brand-dark-light text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
