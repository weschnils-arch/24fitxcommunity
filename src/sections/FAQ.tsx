import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Für wen ist das Coaching geeignet?',
    answer:
      'Für jeden, der bereit ist, eine positive Veränderung in seinem Leben vorzunehmen – egal ob du abnehmen, Muskeln aufbauen oder einfach fitter und gesünder leben möchtest.',
  },
  {
    question: 'Muss ich Vorkenntnisse haben?',
    answer:
      'Nein, absolut nicht. Unsere Programme sind für jedes Fitnesslevel geeignet, vom absoluten Anfänger bis zum fortgeschrittenen Sportler.',
  },
  {
    question: 'Wie viel Zeit muss ich investieren?',
    answer:
      'Unser Konzept ist darauf ausgelegt, alltagstauglich zu sein. Die Workouts sind kurz und effektiv, und die Ernährung lässt sich einfach integrieren.',
  },
  {
    question: 'Was kostet das Coaching?',
    answer:
      'Die Kosten sind individuell, je nachdem, welches Programm am besten zu dir passt. In unserem kostenlosen Erstgespräch finden wir gemeinsam die perfekte Lösung für dich und dein Budget.',
  },
  {
    question: 'Muss ich dann direkt in ein Knebelabo gehen?',
    answer:
      'Nein. Bei uns gibt es keine versteckten Kosten oder Knebelverträge. Wir setzen auf Transparenz und deinen Erfolg. Du entscheidest, wie lange du Teil unserer Community sein möchtest.',
  },
  {
    question: 'Wie schnell sehe ich erste Ergebnisse?',
    answer:
      'Das hängt von deinen Zielen und deinem Engagement ab. Viele unserer Challenger sehen bereits nach 2-3 Wochen erste Veränderungen (mehr Energie, besserer Schlaf). Sichtbare körperliche Veränderungen zeigen sich meist nach 4-6 Wochen.',
  },
  {
    question: 'Kann ich die Community auch nutzen, wenn ich nur Kunde bin und kein Berater werden möchte?',
    answer:
      'Absolut! Die Community ist für alle Challenger offen, unabhängig davon, ob sie Berater werden möchten oder nicht. Dein Erfolg und dein Wohlbefinden stehen im Vordergrund.',
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
        <div className="text-center mb-12">
          <h2
            className={`section-title transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            NOCH FRAGEN?
          </h2>
          <h3
            className={`section-headline transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Hier findest du die Antworten.
          </h3>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 ${
                  openIndex === index ? 'bg-brand-green/10' : 'hover:bg-brand-gray'
                }`}
              >
                <span className="text-lg font-semibold text-brand-dark pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-brand-green text-white rotate-180'
                      : 'bg-brand-green/10 text-brand-green'
                  }`}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0 border-t border-brand-gray">
                  <p className="text-brand-dark-light leading-relaxed pt-4">
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
