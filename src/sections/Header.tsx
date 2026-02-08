import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Start', href: '#hero' },
  { name: 'Fit-Check', href: '#fit-check' },
  { name: 'Problem', href: '#problem' },
  { name: 'Lösung', href: '#solution' },
  { name: 'Resultate', href: '#results' },
  { name: 'Über uns', href: '#team' },
  { name: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
        : 'bg-white py-4'
        }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex items-center">
          {/* Logo Area - Left Aligned */}
          <div className="w-[200px] md:w-[250px] flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center"
            >
              <img
                src="/logo.webp"
                alt="24FITxCOMMUNITY"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation - Truly Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-grow space-x-6 xl:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-brand-dark hover:text-brand-green font-bold transition-all duration-200 text-sm xl:text-[15px] uppercase tracking-wide whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button Area - Right Aligned */}
          <div className="hidden lg:flex items-center justify-end w-[200px] md:w-[250px] flex-shrink-0">
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#cta');
              }}
              className="bg-brand-green text-white px-6 py-2.5 rounded-xl font-bold whitespace-nowrap
                         transition-all duration-300 hover:bg-brand-green-dark hover:scale-105 text-sm xl:text-base shadow-lg shadow-brand-green/10"
            >
              Erstgespräch buchen
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-1 flex items-center justify-end">
            <button
              className="p-2 text-brand-dark hover:text-brand-green transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2'
          }`}
      >
        <nav className="flex flex-col py-4 px-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="py-3 px-4 text-brand-dark hover:text-brand-green hover:bg-brand-gray 
                         font-medium transition-colors duration-200 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#cta');
            }}
            className="mt-4 mx-4 bg-brand-green text-white px-6 py-3 rounded-lg font-semibold 
                       text-center transition-all duration-300 hover:bg-brand-green-dark"
          >
            Erstgespräch buchen
          </a>
        </nav>
      </div>
    </header>
  );
}
