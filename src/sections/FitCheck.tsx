import { useState } from 'react';
import { Zap, Dumbbell, Salad, ArrowRight, Check } from 'lucide-react';

const options = [
    {
        id: 'energy',
        title: 'Mehr Energie & Wohlbefinden',
        description: 'Im Alltag fitter und vitaler fühlen',
        icon: <Zap className="text-brand-green" size={24} />,
    },
    {
        id: 'muscle',
        title: 'Muskelaufbau oder Gewichtsreduktion',
        description: 'Deinen Traumkörper erreichen',
        icon: <Dumbbell className="text-brand-green" size={24} />,
    },
    {
        id: 'nutrition',
        title: 'Gesunde Ernährung',
        description: 'Einfache Tipps für den Alltag',
        icon: <Salad className="text-brand-green" size={24} />,
    },
];

export default function FitCheck() {
    const [selected, setSelected] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const toggleOption = (id: string) => {
        setSelected((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }
            if (prev.length < 3) {
                return [...prev, id];
            }
            return prev;
        });
    };

    const scrollToCTA = () => {
        const element = document.querySelector('#cta');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (showResults) {
        return (
            <section id="fit-check" className="bg-brand-gray/30 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-[2rem] border-2 border-brand-green/20 p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4">
                        {/* Top Border Accent */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-brand-green" />

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-8">
                                <Check className="text-brand-green" size={40} strokeWidth={3} />
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">
                                Super, das ist spannend!
                            </h2>

                            <p className="text-lg md:text-xl text-brand-dark/60 mb-10 max-w-2xl leading-relaxed">
                                Genau bei diesen Themen können wir dir am besten helfen. Der nächste Schritt ist ein <span className="text-brand-dark font-bold">kurzes, kostenloses Erstgespräch</span>, in dem wir unverbindlich schauen, wie wir deine Ziele am schnellsten erreichen.
                            </p>

                            <button
                                onClick={scrollToCTA}
                                className="w-full md:w-auto bg-[#2D6A4F] text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#1B4332] hover:scale-105 shadow-xl"
                            >
                                Jetzt kostenloses Erstgespräch buchen
                                <ArrowRight size={22} />
                            </button>

                            <button
                                onClick={() => setShowResults(false)}
                                className="mt-8 text-brand-dark/40 hover:text-brand-green font-semibold transition-colors flex items-center gap-2"
                            >
                                ← Zurück zur Auswahl
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="fit-check" className="bg-brand-gray/30 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-brand-green font-bold text-xs tracking-widest uppercase mb-4 block">
                        Dein Fit-Check
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                        Was ist dir aktuell <span className="text-brand-green">am wichtigsten?</span>
                    </h2>
                    <p className="text-brand-dark/60 text-lg">
                        Wähle bis zu 3 Bereiche aus, und wir zeigen dir den nächsten Schritt.
                    </p>
                </div>

                <div className="space-y-4 mb-10">
                    {options.map((option) => {
                        const isSelected = selected.includes(option.id);
                        return (
                            <button
                                key={option.id}
                                onClick={() => toggleOption(option.id)}
                                className={`w-full flex items-center p-6 rounded-2xl border-2 transition-all duration-300 text-left group
                           ${isSelected
                                        ? 'border-brand-green bg-white shadow-lg scale-[1.01]'
                                        : 'border-white bg-white hover:border-brand-green/30 shadow-sm'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-6 transition-colors duration-300
                               ${isSelected ? 'bg-brand-green/10' : 'bg-brand-gray'}`}>
                                    {option.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-brand-dark">{option.title}</h3>
                                    <p className="text-brand-dark/40">{option.description}</p>
                                </div>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                               ${isSelected
                                        ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20'
                                        : 'border-brand-gray-text group-hover:border-brand-green/40'}`}>
                                    {isSelected && <Check size={18} strokeWidth={3} />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => setShowResults(true)}
                        disabled={selected.length === 0}
                        className={`w-full md:w-auto min-w-[300px] py-5 px-10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300
                       ${selected.length > 0
                                ? 'bg-brand-green text-white hover:bg-brand-green-dark hover:scale-105 shadow-xl shadow-brand-green/20'
                                : 'bg-brand-green/40 text-white cursor-not-allowed'
                            }`}
                    >
                        Analyse starten
                        <ArrowRight size={22} />
                    </button>
                    <p className="mt-4 text-brand-dark/40 text-sm font-medium">
                        {selected.length}/3 ausgewählt
                    </p>
                </div>
            </div>
        </section>
    );
}
