import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  '100% kostenlos & unverbindlich',
  'Persönliche Zielanalyse',
  'Individuelle Beratung',
];

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  };

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
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Bereit, deine Geschichte neu zu schreiben?
          </h2>

          {/* Description */}
          <p
            className={`text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Warte nicht länger auf den perfekten Moment. Der perfekte Moment ist jetzt.
            Mache den ersten Schritt und buche dein 100% kostenloses und unverbindliches
            Erstgespräch.
          </p>

          {/* Benefits */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className={`btn-white flex items-center gap-3 mx-auto transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
              }`}
            >
              <Calendar size={24} />
              JETZT KOSTENLOSES ERSTGESPRÄCH BUCHEN
              <ArrowRight size={24} />
            </button>
          ) : !isSubmitted ? (
            <div
              className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                Erstgespräch buchen
              </h3>
              <p className="text-brand-dark-light mb-6">
                Fülle das Formular aus und wir melden uns bei dir.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Dein Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none 
                             focus:ring-2 focus:ring-brand-green focus:border-transparent
                             text-brand-dark placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Deine E-Mail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none 
                             focus:ring-2 focus:ring-brand-green focus:border-transparent
                             text-brand-dark placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Deine Telefonnummer (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none 
                             focus:ring-2 focus:ring-brand-green focus:border-transparent
                             text-brand-dark placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-green text-white py-4 rounded-lg font-bold text-lg
                           transition-all duration-300 hover:bg-brand-green-dark hover:scale-[1.02]"
                >
                  Termin vereinbaren
                </button>
              </form>
            </div>
          ) : (
            <div
              className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-brand-green" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                Vielen Dank!
              </h3>
              <p className="text-brand-dark-light">
                Wir haben deine Anfrage erhalten und melden uns in Kürze bei dir.
              </p>
            </div>
          )}

          {/* Trust Badge */}
          {!showForm && (
            <p
              className={`text-white/70 text-sm mt-6 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Keine versteckten Kosten. Keine Verpflichtungen.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
