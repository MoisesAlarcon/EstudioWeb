import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, MapPin, Calendar, Music, UploadCloud, Headphones, ChevronRight, Mic, CheckCircle2, Sliders } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-[95%] max-w-5xl ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border border-surface shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="text-text font-heading font-bold text-xl tracking-wide flex items-center border border-white/10 px-3 py-1 rounded-full gap-2 bg-surface">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        StudioRadar
      </div>
      <div className="hidden md:flex gap-8 text-sm font-mono text-text/70">
        <a href="#beats" className="hover:text-accent transition-colors">Beats</a>
        <a href="#studios" className="hover:text-accent transition-colors">Estudios</a>
        <a href="#pricing" className="hover:text-accent transition-colors">Precios</a>
      </div>
      <button className="bg-accent text-white px-5 py-2 rounded-full font-mono text-sm font-bold shadow-lg hardware-shadow hover:scale-95 transition-transform duration-75">
        Empezar
      </button>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.1
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-12">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
          alt="Dark Studio Neon"
          className="w-full h-full object-cover scale-105 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/90 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl flex flex-col items-center gap-6 w-full">
        <div className="hero-text px-4 py-2 rounded-full border border-white/10 bg-surface/50 font-mono text-xs text-accent uppercase tracking-widest mb-4">
          La plataforma del creador
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-bold leading-[0.85] tracking-tighter w-full">
          <span className="hero-text block text-text">Del Beat</span>
          <span className="hero-text block text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#D8B4E2] drop-shadow-[0_0_15px_rgba(138,43,226,0.3)]">a Tu Canción.</span>
        </h1>
        <p className="hero-text max-w-2xl text-lg md:text-xl text-text/70 font-mono mt-6">
          Compra beats, encuentra estudios cerca de ti y graba tu música en un solo lugar.
        </p>
        <button className="hero-text mt-8 px-8 py-5 bg-accent text-white font-mono font-bold rounded-xl text-lg hardware-shadow active:scale-95 transition-transform duration-75 flex items-center gap-3 group hover:bg-[#9d44f0]">
          Empieza a Crear Tu Próxima Canción
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const Features = () => {
  const featsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        scrollTrigger: {
          trigger: featsRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out'
      });
    }, featsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={featsRef} id="beats" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card 1 - Sequencer */}
        <div className="feat-card bg-surface p-8 rounded-2xl hardware-shadow border border-white/5 flex flex-col gap-6 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(138,43,226,0.15)] transition-all duration-300">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-lg bg-background border border-white/5 flex items-center justify-center text-accent hardware-shadow group-hover:scale-105 transition-transform">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold leading-tight">Encuentra el Beat Perfecto en Segundos</h3>
          </div>
          <p className="text-text/70 font-mono text-sm leading-relaxed">
            Explora beats profesionales listos para grabar y compra licencias al instante sin procesos complicados.
          </p>
          <div className="mt-auto h-36 bg-background rounded-xl border border-white/5 relative overflow-hidden flex flex-col justify-center py-2">
             <div className="flex flex-col gap-2 opacity-80 h-full overflow-hidden absolute inset-0 py-3">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className={`flex gap-1 animate-pulse px-4`} style={{ animationDelay: `${i * 0.2}s` }}>
                   {[...Array(8)].map((_, j) => (
                      <div key={j} className={`h-6 flex-1 rounded-sm ${j % (i+2) === 0 ? 'bg-accent' : 'bg-surface border border-white/5'}`}></div>
                   ))}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Card 2 - Radar */}
        <div className="feat-card bg-surface p-8 rounded-2xl hardware-shadow border border-white/5 flex flex-col gap-6 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(138,43,226,0.15)] transition-all duration-300">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-lg bg-background border border-white/5 flex items-center justify-center text-accent hardware-shadow group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold leading-tight">Estudios Cerca de Ti, Listos para Grabar</h3>
          </div>
          <p className="text-text/70 font-mono text-sm leading-relaxed">
            Encuentra estudios disponibles cerca de tu ubicación y reserva sesiones directamente desde la plataforma.
          </p>
          <div className="mt-auto h-36 bg-background rounded-xl border border-white/5 relative flex items-center justify-center overflow-hidden">
             <div className="absolute w-40 h-40 rounded-full border border-accent/10"></div>
             <div className="absolute w-28 h-28 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '3s'}}></div>
             <div className="absolute w-16 h-16 rounded-full border border-accent/30"></div>
             <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_#8A2BE2] z-10 mb-4"></div>
             
             <div className="absolute top-6 left-6 w-2 h-2 bg-text/50 rounded-full"></div>
             <div className="absolute bottom-8 right-8 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#8A2BE2]"></div>
             
             <div className="absolute bottom-3 text-[10px] font-mono text-accent uppercase tracking-widest bg-accent/10 px-2 py-1 rounded">Scanning: Madrid - Vallecas</div>
          </div>
        </div>

        {/* Card 3 - Booking */}
        <div className="feat-card bg-surface p-8 rounded-2xl hardware-shadow border border-white/5 flex flex-col gap-6 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(138,43,226,0.15)] transition-all duration-300">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-lg bg-background border border-white/5 flex items-center justify-center text-accent hardware-shadow group-hover:scale-105 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold leading-tight">Convierte Tu Idea en una Canción Real</h3>
          </div>
          <p className="text-text/70 font-mono text-sm leading-relaxed">
            Compra un beat, reserva estudio y graba tu canción completa con mezcla y master en un solo proceso.
          </p>
          <div className="mt-auto h-36 bg-background rounded-xl border border-white/5 flex flex-col justify-center px-5 gap-3">
             <div className="w-full bg-surface border border-white/5 h-10 rounded-lg flex items-center px-3 justify-between">
               <span className="text-xs font-mono text-text/80">14 Oct - Session</span>
               <CheckCircle2 className="w-4 h-4 text-accent" />
             </div>
             <button className="w-full h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-xs text-accent font-bold font-mono tracking-widest uppercase hover:bg-accent hover:text-white transition-colors">
               Confirmar Sesión
             </button>
             <div className="w-full bg-surface/50 h-2 rounded-full overflow-hidden">
               <div className="w-full h-full bg-accent animate-pulse"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  const lineRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: true,
        }
      });
      
      gsap.from('.workflow-step', {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 60%',
        },
        x: -40,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Encuentra tu Beat', desc: 'Navega por el catálogo y elige el sonido que mejor encaje. Licencias instantáneas.' },
    { num: '02', title: 'Busca un Estudio', desc: 'El sistema geolocaliza estudios de alta calidad cerca de ti. Compara y elige.' },
    { num: '03', title: 'Graba tu Canción', desc: 'Preséntate a la sesión. Un ingeniero te grabará, mezclará y enviará el resultado.' },
  ];

  return (
    <section ref={triggerRef} className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-y border-white/5 mt-12 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -z-10"></div>
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">El Pipeline</h2>
        <p className="text-text/60 font-mono">Un flujo de trabajo diseñado para artistas que no quieren perder tiempo.</p>
      </div>

      <div className="relative flex flex-col gap-12 pl-8 md:pl-0 z-10">
        {/* Signal Line */}
        <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-surface">
          <div ref={lineRef} className="w-full bg-accent h-0 shadow-[0_0_10px_#8A2BE2]"></div>
        </div>

        {steps.map((step, i) => (
          <div key={i} className={`workflow-step relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Node */}
            <div className="absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-accent z-10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
            </div>
            
            <div className={`md:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
              <div className="text-accent font-mono text-sm mb-2">{step.num}</div>
              <h3 className="text-3xl font-heading font-bold mb-3">{step.title}</h3>
              <p className="text-text/70 font-mono text-sm max-w-sm">{step.desc}</p>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Commerce = () => {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Elige Tu Arsenal</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Beats Column */}
        <div className="flex-1">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-heading text-text flex items-center gap-2">
              <Sliders className="w-5 h-5 text-accent" />
              Licencias de Beats
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {/* Basic */}
            <div className="bg-surface p-6 rounded-xl border border-white/5 flex justify-between items-center hover:bg-surface/80 transition-colors">
              <div>
                <div className="font-heading text-xl font-bold">Basic</div>
                <div className="font-mono text-sm text-text/50">MP3 • Para Redes</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">29€</div>
              </div>
            </div>
            {/* Premium */}
            <div className="bg-gradient-to-br from-surface to-accent/20 p-[1px] rounded-xl relative">
              <div className="absolute top-0 right-4 -translate-y-1/2 bg-accent text-white text-[10px] font-mono px-2 py-1 rounded-sm uppercase tracking-widest font-bold">Más Popular</div>
              <div className="bg-background p-6 rounded-xl flex justify-between items-center h-full">
                <div>
                  <div className="font-heading text-xl font-bold text-accent">Premium</div>
                  <div className="font-mono text-sm text-text/50">WAV Alto Rendimiento + MP3</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl font-bold">79€</div>
                </div>
              </div>
            </div>
            {/* Exclusive */}
            <div className="bg-surface p-6 rounded-xl border border-white/5 flex justify-between items-center hover:bg-surface/80 transition-colors">
              <div>
                <div className="font-heading text-xl font-bold">Exclusive</div>
                <div className="font-mono text-sm text-text/50">Proyectos Mayores • Stems Completos</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-text/80">450€</div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Column */}
        <div className="flex-1" id="studios">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-heading text-text flex items-center gap-2">
              <Mic className="w-5 h-5 text-accent" />
              Sesiones de Estudio
            </h3>
          </div>
          <div className="bg-surface rounded-2xl p-8 border border-white/5 hardware-shadow h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px]"></div>
            
            <div className="z-10">
              <div className="font-mono text-xs text-accent mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                DISPONIBILIDAD EN MADRID
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                  <div className="font-heading text-lg">Alquiler de Estudio</div>
                  <div className="font-mono text-text/70 text-sm">desde 20€/h</div>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                  <div className="font-heading text-lg">Grabación con Ingeniero</div>
                  <div className="font-mono text-text/70 text-sm">desde 15€/h</div>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                  <div className="font-heading text-lg text-accent font-bold">Artist Session (Track Completo)</div>
                  <div className="font-mono text-text/70 text-sm">desde 350€</div>
                </div>
              </div>
            </div>

            <Link to="/radar" className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-mono text-sm uppercase tracking-widest transition-colors z-10 text-center block">
              Explorar Mapa de Estudios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-surface/30 overflow-hidden">
      <div className="flex items-center gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
        {[...Array(6)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background border border-white/10 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Artist" className="w-full h-full object-cover" />
              </div>
              <div className="font-mono text-sm">Prod. By Kael</div>
            </div>
            <div className="text-accent mx-4">•</div>
            <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-red-500/20">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="font-mono text-xs text-red-500 uppercase">Live Session: Studio 54</span>
            </div>
            <div className="text-accent mx-4">•</div>
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">StudioRadar</h2>
          <p className="text-text/60 font-mono text-sm max-w-sm">
            Donde los artistas convierten ideas en canciones listas para lanzar. El estándar de la industria, en tu bolsillo.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-accent text-sm mb-6 uppercase tracking-widest">Plataforma</h4>
          <ul className="space-y-4 font-mono text-sm text-text/60">
            <li><a href="#" className="hover:text-white transition-colors">Beats</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Estudios</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ingenieros</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-accent text-sm mb-6 uppercase tracking-widest">Soporte</h4>
          <ul className="space-y-4 font-mono text-sm text-text/60">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
        <div className="font-mono text-xs text-text/40">
          © {new Date().getFullYear()} StudioRadar. All rights reserved.
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-text/40 bg-white/5 px-3 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          System Operational
        </div>
      </div>
    </footer>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Commerce />
      <Community />
      <Footer />
    </div>
  );
}

export default Home;
