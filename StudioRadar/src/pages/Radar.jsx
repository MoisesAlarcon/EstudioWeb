import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Clock, Calendar, CheckCircle2, Mic } from 'lucide-react';

const Radar = () => {
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState('select'); // 'select', 'checkout', 'success'

  const studios = [
    {
      id: 1,
      name: 'Central Room A',
      location: 'Madrid Centro',
      price: 25,
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=500',
      coords: { top: '30%', left: '40%' }
    },
    {
      id: 2,
      name: 'Vallecas Bounce',
      location: 'Vallecas',
      price: 15,
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1621532429402-4fc43e18f2cb?auto=format&fit=crop&q=80&w=500',
      coords: { top: '60%', left: '60%' }
    },
    {
      id: 3,
      name: 'Platinum Vault',
      location: 'Torrejón',
      price: 35,
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=500',
      coords: { top: '45%', left: '75%' }
    }
  ];

  const times = ['10:00', '12:00', '16:00', '18:00', '21:00'];

  const handleCheckout = () => {
    setStep('checkout');
  };

  const handlePayment = () => {
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Top Navbar Mobile */}
      <div className="md:hidden flex items-center p-4 border-b border-white/5 bg-surface/50 backdrop-blur-md z-20">
        <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors mr-4">
          <ArrowLeft className="w-5 h-5 text-accent" />
        </Link>
        <div className="font-heading font-bold text-lg">Radar de Estudios</div>
      </div>

      {/* Map Area Simulation */}
      <div className="flex-1 relative h-[50vh] md:h-screen overflow-hidden bg-[#0A0A0A]">
        {/* Radar grids */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#8A2BE2 1px, transparent 1px), linear-gradient(90deg, #8A2BE2 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>
        
        {/* Radar pulses */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-accent/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-accent/30 animate-[spin_10s_linear_infinite] border-t-accent"></div>
        
        <div className="absolute top-8 left-8 hidden md:block z-20">
          <Link to="/" className="flex items-center gap-2 bg-surface/80 backdrop-blur border border-white/10 px-4 py-2 rounded-full font-mono text-sm hover:bg-white/5 transition-colors shadow-lg hardware-shadow">
            <ArrowLeft className="w-4 h-4 text-accent" />
            Volver
          </Link>
        </div>

        {/* Studio Pins */}
        {studios.map(studio => (
          <button 
            key={studio.id}
            onClick={() => { setSelectedStudio(studio); setStep('select'); setSelectedTime(null); }}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${selectedStudio?.id === studio.id ? 'scale-125 z-20' : 'hover:scale-110'}`}
            style={{ top: studio.coords.top, left: studio.coords.left }}
          >
            <div className="relative flex items-center justify-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] hardware-shadow ${selectedStudio?.id === studio.id ? 'bg-accent border-white' : 'bg-surface border-accent'}`}>
                <MapPin className={`w-5 h-5 ${selectedStudio?.id === studio.id ? 'text-white' : 'text-accent'}`} />
              </div>
              {selectedStudio?.id === studio.id && (
                <div className="absolute -inset-2 bg-accent/30 rounded-full animate-ping -z-10"></div>
              )}
              
              <div className="absolute top-12 whitespace-nowrap bg-background/90 backdrop-blur px-3 py-1 rounded-md border border-white/10 font-mono text-xs shadow-xl pointer-events-none">
                {studio.name} <span className="text-accent ml-1">{studio.price}€/h</span>
              </div>
            </div>
          </button>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 md:translate-x-0 md:left-8 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full font-mono text-xs text-accent uppercase tracking-widest flex items-center gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          Scanning Area: Madrid
        </div>
      </div>

      {/* Sidebar Interface */}
      <div className="w-full md:w-[450px] bg-surface h-[50vh] md:h-screen flex flex-col border-l border-white/5 shadow-2xl relative z-20 overflow-y-auto">
        
        {step === 'select' && (
          <div className="p-6 md:p-8 flex flex-col h-full animate-[fadeIn_0.3s_ease-out]">
            <h2 className="font-heading text-3xl font-bold mb-2">Reserva de Estudio</h2>
            <p className="font-mono text-sm text-text/60 mb-8 border-b border-white/5 pb-4">
              Selecciona un punto en el radar para ver disponibilidad.
            </p>

            {selectedStudio ? (
              <div className="flex flex-col gap-6 flex-1">
                <div className="rounded-xl overflow-hidden h-40 relative border border-white/5 hardware-shadow">
                  <img src={selectedStudio.image} alt={selectedStudio.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-heading text-xl font-bold">{selectedStudio.name}</h3>
                    <div className="font-mono text-xs text-text/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" /> {selectedStudio.location}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Fecha: Hoy
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map(t => (
                      <button 
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 rounded-lg font-mono text-sm border hardware-shadow transition-all ${
                          selectedTime === t 
                            ? 'bg-accent/20 border-accent text-accent shadow-[0_0_15px_rgba(138,43,226,0.2)]' 
                            : 'bg-background border-white/5 hover:border-white/20'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="bg-background rounded-xl p-4 border border-white/5 mb-4 flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm text-text/60">Precio Total (2h min)</div>
                      <div className="font-heading text-2xl font-bold text-accent">{selectedStudio.price * 2}€</div>
                    </div>
                    <Mic className="w-8 h-8 text-white/5" />
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={!selectedTime}
                    className="w-full py-4 rounded-xl font-mono font-bold uppercase tracking-widest transition-all hardware-shadow active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-accent text-white hover:bg-[#9d44f0]"
                  >
                    Confirmar Horario
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white/40" />
                </div>
                <div className="font-mono text-sm">Esperando señal...</div>
              </div>
            )}
          </div>
        )}

        {step === 'checkout' && selectedStudio && (
          <div className="p-6 md:p-8 flex flex-col h-full animate-[fadeIn_0.3s_ease-out]">
            <button onClick={() => setStep('select')} className="flex items-center gap-2 text-text/60 hover:text-white font-mono text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
            <h2 className="font-heading text-3xl font-bold mb-6">Checkout</h2>

            <div className="bg-background rounded-xl p-6 border border-white/5 hardware-shadow mb-8 space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-4">
                <div className="font-mono text-sm text-text/80">Estudio</div>
                <div className="font-heading font-bold">{selectedStudio.name}</div>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <div className="font-mono text-sm text-text/80">Horario</div>
                <div className="font-mono text-accent flex items-center gap-2"><Clock className="w-4 h-4"/> Hoy, {selectedTime}</div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="font-mono text-sm text-text/80">Total</div>
                <div className="font-heading text-2xl font-bold">{selectedStudio.price * 2}€</div>
              </div>
            </div>

            <div className="space-y-4 mb-auto">
              <div>
                <label className="font-mono text-xs text-text/60 uppercase tracking-widest block mb-2">Nombre Artistico</label>
                <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 font-mono text-sm outline-none focus:border-accent transition-colors" placeholder="EJ. KAEL" />
              </div>
              <div>
                <label className="font-mono text-xs text-text/60 uppercase tracking-widest block mb-2">Tarjeta de Crédito</label>
                <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 font-mono text-sm outline-none focus:border-accent transition-colors" placeholder="**** **** **** 4242" />
              </div>
            </div>

            <button 
              onClick={handlePayment}
              className="w-full py-4 mt-6 rounded-xl font-mono font-bold uppercase tracking-widest transition-all hardware-shadow active:scale-95 bg-accent text-white hover:bg-[#9d44f0] flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Pagar {selectedStudio.price * 2}€
            </button>
          </div>
        )}

        {step === 'success' && selectedStudio && (
          <div className="p-6 md:p-8 flex flex-col h-full bg-gradient-to-b from-surface to-accent/10 items-center justify-center text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="w-20 h-20 bg-background rounded-full border-2 border-accent flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(138,43,226,0.3)] hardware-shadow">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-2">Sesión Confirmada</h2>
            <p className="font-mono text-sm text-text/70 mb-8 max-w-[250px]">
              Tu reserva en <strong className="text-white">{selectedStudio.name}</strong> a las <strong className="text-white">{selectedTime}</strong> ha sido bloqueada en el sistema.
            </p>
            
            <Link to="/" className="w-full py-4 bg-background border border-white/10 rounded-xl font-mono text-sm font-bold uppercase tracking-widest hover:border-accent transition-colors">
              Volver al Console
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Radar;
