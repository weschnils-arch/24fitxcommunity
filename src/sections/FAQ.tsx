import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Wie viel Zeit muss ich pro Woche investieren?',
    answer:
      'Unsere Programme sind für vielbeschäftigte Menschen konzipiert. Mit nur 3-4 Trainingseinheiten à 30-45 Minuten pro Woche erreichst du bereits großartige Ergebnisse. Die Ernährungsumstellung erfolgt schrittweise und passt sich deinem Alltag an – keine zeitraubenden Meal-Preps erforderlich.',
  },
  {
    question: 'Ist das auch für komplette Anfänger geeignet?',
    answer:
      'Absolut! Wir legen den Fokus auf die Ernährung und beim Sport holen wir dich da ab, wo du gerade stehst. Die Fitclubs sind für jedes Fitnesslevel und du kannst deine Schwierigkeit und dein Tempo wählen! Ebenso kannst du auch mit dem Ernährungskonzept starten, ohne dass du zusätzlich Sport machst!',
  },
  {
    question: 'Was kostet das Erstgespräch?',
    answer:
      'Das Erstgespräch ist komplett kostenlos und unverbindlich ( 30 minuten ). Es dient dazu, dich und deine Ziele kennenzulernen und herauszufinden, ob wir dir helfen können und ob das Konzept zu dir passt. Es ist ganz locker und ohne Druck.',
  },
  {
    question: 'Wie läuft das Erstgespräch ab?',
    answer:
      'In einem lockeren Videocall besprechen wir deine aktuelle Situation, deine Herausforderungen und deine Ziele. Wenn wir merken, dass eine Zusammenarbeit für beide Seiten sinnvoll ist, stellen wir dir vor, wie dein individueller Weg aussehen kann.',
  },
  {
    question: 'Muss ich eine strenge Diät einhalten?',
    answer:
      'Nein. Wir glauben nicht an kurzfristige Crash-Diäten. Wir etablieren gemeinsam mit dir langfristige, gesunde Gewohnheiten, bei denen auch Ausnahmen erlaubt sind, ohne den Fortschritt zu gefährden.',
  },
  {
    question: 'Kann ich auch von zu Hause trainieren?',
    answer:
      'Ja, definitiv! Unserer Powerworkouts & Fitclubs sind online verfügbar und kannst du sie live mitmachen oder auch ganz bequem nachmachen!',
  },
];

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-brand-gray section-padding overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`block text-brand-green font-bold tracking-[0.2em] text-sm uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            FAQ
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Häufige Fragen
          </h2>
          <p
            className={`text-brand-dark-light text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Hier findest du Antworten auf die häufigsten Fragen. Falls deine Frage nicht dabei ist, beantworten wir sie gerne im Erstgespräch.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${openIndex === index ? 'border-brand-green' : 'border-[#E5E5E5] hover:border-brand-green/40'}`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-7 text-left transition-all duration-300"
              >
                <span className="text-[17px] md:text-lg font-semibold text-brand-dark pr-4">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-green' : 'text-brand-dark/50'}`}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 md:px-7 pb-6 md:pb-7 pt-0 w-full">
                  <p className="text-brand-dark-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
