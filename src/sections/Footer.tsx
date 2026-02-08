import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const navLinks = [
  { name: 'Start', href: '#hero' },
  { name: 'Über uns', href: '#team' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Kontakt', href: '#cta' },
];

const legalLinks = [
  { name: 'Impressum', href: '#' },
  { name: 'Datenschutz', href: '#' },
  { name: 'AGB', href: '#' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-brand-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}>
              <img
                src="/logo.webp"
                alt="24FITxCOMMUNITY"
                className="h-9 w-auto object-contain mb-6"
              />
            </a>
            <p className="text-brand-dark/60 text-sm leading-relaxed mb-6">
              Dein Weg zu einer gesünderen, fitteren Version deiner selbst.
              Mit Ernährung, Training und Community an deiner Seite.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www-fallback.instagram.com/24fit_community/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center
                         text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/people/24fit-Community/61571203906989/?locale=th_TH#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center
                         text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-brand-dark font-semibold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-brand-dark/60 hover:text-brand-green transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-brand-dark font-semibold text-lg mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-brand-dark/60 hover:text-brand-green transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-brand-dark font-semibold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-brand-green flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@24fitxcommunity.de"
                  className="text-brand-dark/60 hover:text-brand-green transition-colors duration-200"
                >
                  info@24fitxcommunity.de
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-brand-green flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+491234567890"
                  className="text-brand-dark/60 hover:text-brand-green transition-colors duration-200"
                >
                  +49 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-green flex-shrink-0 mt-0.5" />
                <span className="text-brand-dark/60">
                  Musterstraße 123
                  <br />
                  12345 Musterstadt
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-dark/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-brand-dark/60 text-sm">
              © 2026 24FITxCOMMUNITY. Alle Rechte vorbehalten.
            </p>
            <p className="text-brand-dark/60 text-sm">
              Made with{' '}
              <span className="text-brand-green">♥</span>
              {' '}für deine Transformation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
