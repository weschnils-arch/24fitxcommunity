import { useEffect, useRef, useState } from 'react';
import { Play, Star, ArrowRight, Flame, Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToCTA = () => {
    const element = document.querySelector('#cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A1A12]"
    >
      {/* Background with Patterns and Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image Container with Diagonal Clip */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:bg-right transition-all duration-1000"
          style={{
            backgroundImage: "url('/hero-bg-v2.webp')",
            clipPath: 'polygon(100% 0, 100% 100%, 35% 100%)'
          }}
        />

        {/* Dark Left Side with Radial Gradient for Depth */}
        <div
          className="absolute inset-0 bg-[#0A1A12]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 35% 100%, 0 100%)'
          }}
        />

        {/* Subtle Decorative Grid/Lines */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(45deg, #2D9B6B 1px, transparent 1px), linear-gradient(-45deg, #2D9B6B 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text & CTAs */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>

            {/* Scarcity Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-4 py-2 rounded-lg mb-8">
              <Flame size={14} className="text-brand-green animate-pulse" />
              <span className="text-brand-green text-xs font-bold uppercase tracking-wider">
                NUR 5 PLÄTZE DIESE WOCHE
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8 lg:max-w-xl">
              WERDE ZUR <br />
              <span className="text-brand-green">BESTEN VERSION</span> <br />
              DEINER SELBST
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-lg leading-relaxed">
              80% Ernährung - 20% Sport - 100% alltagstauglich
            </p>
            <p className="text-lg md:text-xl text-brand-green font-semibold mb-10">
              Keine Ausreden. Nur Resultate.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 mb-16">
              <button
                onClick={scrollToCTA}
                className="w-full sm:w-auto bg-brand-green text-white px-10 py-5 rounded-xl font-bold text-lg
                           flex items-center justify-center gap-3 transition-all duration-300 hover:bg-brand-green-dark hover:scale-105 shadow-xl shadow-brand-green/20"
              >
                JETZT STARTEN
                <ArrowRight size={22} />
              </button>
              <button
                onClick={scrollToCTA}
                className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-5 rounded-xl
                           font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10"
              >
                <div className="w-8 h-8 bg-brand-green/20 rounded-full flex items-center justify-center">
                  <Play size={16} fill="white" className="ml-0.5" />
                </div>
                VIDEO ANSEHEN
              </button>
            </div>

            {/* Micro Stats */}
            <div className="flex flex-wrap gap-8 items-center border-t border-white/5 pt-10">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">1000+</span>
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">CHALLENGER</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-brand-green">4.9★</span>
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">BEWERTUNG</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">100%</span>
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">ERFOLGSQUOTE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Video Preview */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>

            {/* Top Rated Floating Badge */}
            <div className="absolute -top-6 -right-6 z-20 bg-white px-5 py-3 rounded-xl shadow-2xl hidden md:flex items-center gap-2 animate-bounce">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-brand-green fill-brand-green" />
                ))}
              </div>
              <span className="text-[#0A1A12] font-black text-[10px] uppercase tracking-tighter">TOP RATED</span>
            </div>

            {/* Video Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-green/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                >
                  <source src="/videos/hero-video.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-[#0A1A12]/10 transition-colors" />

                {/* Speaker Toggle Overlay */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-brand-green transition-all duration-300 shadow-xl"
                  aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                {/* Badge on Video */}
                <div className="absolute bottom-6 left-6 bg-brand-green/90 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="text-white font-bold text-xs uppercase">+12 NEUSTARTER</span>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-green/50 rounded-tl-3xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-green/50 rounded-br-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
