import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';

interface ContactPopupProps {
    children: React.ReactNode;
}

export function ContactPopup({ children }: ContactPopupProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
                // Close after 3 seconds
                setTimeout(() => {
                    setOpen(false);
                    setTimeout(() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', phone: '', message: '' });
                    }, 300); // Reset after closing animation
                }, 3000);
            } else {
                throw new Error('Fehler beim Senden der Nachricht. Bitte versuche es später erneut.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-gray-200 text-brand-dark p-0 gap-0 overflow-hidden" showCloseButton={false}>
                {/* Custom Close Button to match the screenshot better if needed, but DialogContent has one inside it by default. We disabled the default one to add our own with custom styling if necessary, but actually the default one uses an XIcon. Let's add it manually for precise positioning. */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-brand-dark transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    <span className="sr-only">Close</span>
                </button>

                <div className="p-8">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-brand-dark">Vielen Dank!</h2>
                            <p className="text-brand-dark-light">Deine Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei dir.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <img src="/logo.webp" alt="24FITxCOMMUNITY" className="h-8 w-auto mb-6" />
                                <DialogTitle className="text-3xl font-bold mb-2 text-brand-dark">Jetzt anfragen</DialogTitle>
                                <p className="text-brand-dark-light text-[15px] leading-relaxed">
                                    Buche ein kostenloses Erstgespräch oder fordere weitere Informationen an.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-brand-dark">
                                        Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Dein Name"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-brand-dark">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="email@test.de"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-brand-dark">
                                        Phone*
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+43 660 1234567"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-brand-dark">
                                        Message ( Optional )
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Hast du in der Vergangenheit schon einmal sport gemacht?"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm mt-2">{error}</div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                                        ) : (
                                            "Jetzt unverbindlich anfragen"
                                        )}
                                    </button>
                                </div>

                                <p className="text-center text-xs text-brand-dark-light mt-4">
                                    Kostenlos & unverbindlich – du gehst keine Verpflichtung ein
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
