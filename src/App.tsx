import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, User, BookOpen, Search, Home as HomeIcon } from 'lucide-react';

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'about', label: 'Acerca del Autor', icon: User },
    { id: 'idea', label: 'Idea de Investigación', icon: BookOpen },
    { id: 'preliminary', label: 'Indagación Preliminar', icon: Search },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-lg font-bold tracking-tighter uppercase">
          Bitácora<span className="text-accent">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''} relative py-2`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-neutral-100 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-widest font-medium ${
                    activeSection === item.id ? 'text-accent' : 'text-neutral-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionWrapper = ({ children, id, activeSection }: { children: ReactNode, id: string, activeSection: string }) => {
  return (
    <AnimatePresence mode="wait">
      {activeSection === id && (
        <motion.section
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="section-container"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

// --- Sections ---

const Home = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-3 py-1 bg-neutral-100 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500 rounded-full"
      >
        Proyecto de Investigación 2026
      </motion.div>
      <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
        Sistema de Diseño <br />
        <span className="text-neutral-300">para la movilidad </span> <br />
        estudiantil en Tunja.
      </h1>
      <p className="text-lg md:text-xl text-neutral-500 max-w-md leading-relaxed font-light">
        Este proyecto busca explorar cómo el diseño gráfico puede contribuir a mejorar la experiencia de movilidad de estudiantes foráneos en Tunja. A partir del análisis del sistema actual de transporte público, se plantea una investigación enfocada en la comprensión de la información, la orientación en el espacio urbano y la relación entre señalización y herramientas digitales.
      </p>
      <div className="flex items-center space-x-4">
        <button className="px-8 py-4 bg-neutral-900 text-white text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors duration-300 flex items-center group">
          Explorar Proyecto
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
        </button>
      </div>
    </div>
    <div className="relative aspect-square lg:aspect-[4/5] bg-neutral-100 overflow-hidden group">
      <img
        src="https://picsum.photos/seed/design-abstract/1200/1500"
        alt="Abstract Design Texture"
        className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      <div className="absolute bottom-8 left-8">
        <div className="w-12 h-1 bg-accent" />
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="max-w-5xl mx-auto w-full">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
      <div className="md:col-span-5 space-y-8">
        <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
          <img
            src="https://picsum.photos/seed/student-profile/800/1000"
            alt="Profile"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-0 right-0 p-4">
            <div className="text-[10px] uppercase tracking-widest font-bold text-white mix-blend-difference">
              Estudiante de Diseño
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-400">Contacto</h3>
          <p className="text-sm font-medium">sebavila@uniboyaca.edu.co</p>
          <p className="text-sm font-medium">@Sarboxz</p>
        </div>
      </div>
      
      <div className="md:col-span-7 space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold tracking-tight">Nombre del Estudiante</h2>
          <div className="h-1 w-20 bg-accent" />
        </div>
        
        <div className="space-y-6 text-neutral-600 leading-relaxed text-lg font-light">
          <p>
            Desde hace tiempo me ha llamado la atención esta problematica para desarrollarla como proyecto de grado, asi que usaré la clase de seminario para estructurar las bases del proyecto de investigación.
          </p>
          <p>
            Me apasiona cómo el diseño puede actuar como un puente entre la complejidad técnica y la experiencia humana. Mis intereses principales son el motion graphics, el diseño de interfaces y la comunicacion acertiva a partir de estos.
          </p>
          <p>
            Esta bitácora es el registro vivo de mi proceso de investigación, un espacio donde las ideas convergen para reflexionar, proponer y tal vez crear en un futuro.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Enfoque</h4>
            <p className="text-sm">Edicion & Motion graphics</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Ubicación</h4>
            <p className="text-sm">Tunja, 2026</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResearchIdea = () => (
  <div className="space-y-20 max-w-6xl mx-auto w-full">
    <div className="text-center space-y-4">
      <h2 className="text-5xl font-bold tracking-tight">Idea de Investigación</h2>
      <p className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold">Estructura Conceptual</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: 'Tema', content: 'Sistemas de orientación y señalética urbana aplicados a la movilidad estudiantil.', icon: '01' },
        { title: 'Problema', content: '¿Cómo mitigar la desorientación de estudiantes foráneos en el sistema de transporte de Tunja?', icon: '02' },
        { title: 'Contexto', content: 'El sistema de transporte público colectivo y las principales rutas universitarias de la ciudad.', icon: '03' },
      ].map((item, idx) => (
        <div key={item.title} className="p-10 bg-neutral-50 border border-neutral-100 space-y-6 relative overflow-hidden group hover:border-accent transition-colors duration-500">
          <span className="text-8xl font-bold text-neutral-100 absolute -top-4 -right-4 group-hover:text-accent/5 transition-colors">
            {item.icon}
          </span>
          <h3 className="text-xl font-bold relative z-10">{item.title}</h3>
          <p className="text-neutral-500 leading-relaxed font-light relative z-10">
            {item.content}
          </p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Propuesta de Título</h3>
          <p className="text-xl italic text-neutral-600 font-light leading-relaxed">
            "Diseño de un sistema de Diseño para la mejora de la movilidad estudiantil en la ciudad de Tunja."
          </p>
        </div>
        <p className="text-neutral-500 leading-relaxed font-light">
          La investigación busca analizar las deficiencias en la comunicación visual del transporte actual y proponer una solución que integre señalética física y soportes digitales para facilitar el desplazamiento de los estudiantes.
        </p>
      </div>
      <div className="aspect-video bg-neutral-100 flex items-center justify-center border border-dashed border-neutral-300 relative group">
        <img
          src="https://picsum.photos/seed/diagram/1000/600"
          alt="Diagram Placeholder"
          className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-70 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 border-2 border-neutral-300 rounded-full flex items-center justify-center">
            <BookOpen size={20} className="text-neutral-400" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Diagrama del Triángulo de Investigación</span>
        </div>
      </div>
    </div>
  </div>
);

const PreliminaryInquiry = () => (
  <div className="max-w-4xl mx-auto w-full space-y-16">
    <header className="space-y-6 border-b border-neutral-100 pb-12">
      <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest font-bold text-accent">
        <span>Módulo 01</span>
        <span className="w-8 h-px bg-accent/30" />
        <span className="text-neutral-400">Exploración Inicial</span>
      </div>
      <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">Indagación Preliminar y Estado del Arte</h2>
      <div className="flex items-center space-x-6 text-sm text-neutral-400">
        <span>Fecha: Marzo 2026</span>
        <span>Lectura: 8 min</span>
      </div>
    </header>

    <article className="prose prose-neutral max-w-none space-y-12">
      <div className="space-y-6">
        <p className="text-xl text-neutral-600 leading-relaxed font-light">
          La primera fase de esta bitácora se centra en el análisis del entorno urbano de Tunja y la identificación de los puntos críticos de desorientación en las rutas de transporte más utilizadas por la comunidad universitaria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-neutral-100 overflow-hidden">
          <img
            src="https://picsum.photos/seed/tunja-mobility1/800/800"
            alt="Exploration 1"
            className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="aspect-square bg-neutral-100 overflow-hidden">
          <img
            src="https://picsum.photos/seed/tunja-mobility2/800/800"
            alt="Exploration 2"
            className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold tracking-tight">Puntos Clave de la Exploración</h3>
        <ul className="space-y-6 list-none p-0">
          {[
            { title: 'Legibilidad del Sistema Actual', desc: 'Evaluación de la señalética existente en paraderos y vehículos, identificando vacíos de información.' },
            { title: 'Necesidades del Estudiante Foráneo', desc: 'Mapeo de recorridos habituales y obstáculos cognitivos durante el desplazamiento urbano.' },
            { title: 'Integración Digital', desc: 'Estudio de la viabilidad de herramientas de apoyo en tiempo real para la orientación universitaria.' },
          ].map((item) => (
            <li key={item.title} className="flex items-start space-x-6 group">
              <div className="mt-2 w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform" />
              <div className="space-y-1">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-12 bg-neutral-900 text-white space-y-6">
        <h3 className="text-2xl font-bold text-white">Reflexión de Taller</h3>
        <p className="font-light italic opacity-80 leading-relaxed">
          "La movilidad no es solo el acto de desplazarse, sino la capacidad de comprender el entorno para habitarlo. El diseño gráfico es la herramienta que transforma el caos urbano en una red de significados accesibles."
        </p>
      </div>

      <div className="space-y-8">
        <p className="text-neutral-600 leading-relaxed font-light">
          Se han realizado los primeros levantamientos fotográficos y encuestas preliminares a estudiantes de primer semestre. Los resultados indican una fuerte dependencia de la comunicación verbal directa ante la ausencia de un sistema visual coherente.
        </p>
        <div className="aspect-video bg-neutral-100 border border-neutral-200 flex items-center justify-center">
           <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Espacio para Mapas de Empatía y Recorridos</span>
        </div>
      </div>
    </article>

    <footer className="pt-12 border-t border-neutral-100 flex justify-between items-center">
      <div className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Fin del Módulo 01</div>
      <div className="flex space-x-4">
        <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 cursor-pointer transition-colors">
          <ArrowRight size={14} className="rotate-180" />
        </div>
        <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 cursor-pointer transition-colors">
          <ArrowRight size={14} />
        </div>
      </div>
    </footer>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="pt-20">
        <SectionWrapper id="home" activeSection={activeSection}>
          <Home />
        </SectionWrapper>

        <SectionWrapper id="about" activeSection={activeSection}>
          <About />
        </SectionWrapper>

        <SectionWrapper id="idea" activeSection={activeSection}>
          <ResearchIdea />
        </SectionWrapper>

        <SectionWrapper id="preliminary" activeSection={activeSection}>
          <PreliminaryInquiry />
        </SectionWrapper>
      </main>

      {/* Footer / Meta info */}
      <footer className="fixed bottom-8 left-8 z-40 hidden md:block">
        <div className="flex items-center space-x-4">
          <div className="h-px w-12 bg-neutral-200" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-300">
            Design Research Log 2026
          </span>
        </div>
      </footer>

      <div className="fixed bottom-8 right-8 z-40 hidden md:block">
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-300">
          Vol. 01 / Movilidad Estudiantil Tunja
        </div>
      </div>
    </div>
  );
}
