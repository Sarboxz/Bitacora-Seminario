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
        Sistemas Visuales <br />
        <span className="text-neutral-300">en la Era</span> <br />
        Generativa.
      </h1>
      <p className="text-lg md:text-xl text-neutral-500 max-w-md leading-relaxed font-light">
        Exploración sobre la intersección entre el diseño paramétrico y la inteligencia artificial como herramientas de co-creación en la identidad visual contemporánea.
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
          <p className="text-sm font-medium">hola@estudiante.design</p>
          <p className="text-sm font-medium">@estudiante_design</p>
        </div>
      </div>
      
      <div className="md:col-span-7 space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold tracking-tight">Nombre del Estudiante</h2>
          <div className="h-1 w-20 bg-accent" />
        </div>
        
        <div className="space-y-6 text-neutral-600 leading-relaxed text-lg font-light">
          <p>
            Actualmente curso el último año de la Licenciatura en Diseño Gráfico. Mi práctica se centra en la búsqueda de nuevas narrativas visuales a través de la experimentación tecnológica y el pensamiento crítico.
          </p>
          <p>
            Me apasiona cómo el diseño puede actuar como un puente entre la complejidad técnica y la experiencia humana. Mis intereses principales incluyen la tipografía experimental, el diseño de interfaces y la teoría de la imagen.
          </p>
          <p>
            Esta bitácora es el registro vivo de mi proceso de investigación, un espacio donde las ideas convergen y se transforman en propuestas visuales con propósito.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Enfoque</h4>
            <p className="text-sm">Diseño Editorial & Digital</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Ubicación</h4>
            <p className="text-sm">Ciudad de Diseño, 2026</p>
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
        { title: 'Tema', content: 'La Inteligencia Artificial Generativa en el proceso creativo del diseño gráfico.', icon: '01' },
        { title: 'Problema', content: '¿Cómo afecta la automatización de la estética a la originalidad y el rol del diseñador?', icon: '02' },
        { title: 'Contexto', content: 'Estudios de diseño contemporáneos y plataformas de creación digital masiva.', icon: '03' },
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
            "Algoritmos de la Creatividad: Un análisis crítico sobre la co-autoría entre humanos y máquinas en la identidad visual."
          </p>
        </div>
        <p className="text-neutral-500 leading-relaxed font-light">
          La investigación busca desglosar los mecanismos de producción visual actuales, identificando puntos de fricción y oportunidad donde el diseñador deja de ser un ejecutor para convertirse en un curador de sistemas.
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
          La primera fase de esta bitácora se centra en el mapeo de referentes y la identificación de las corrientes estéticas dominantes en el diseño asistido por algoritmos. Se han seleccionado tres ejes fundamentales de análisis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-neutral-100 overflow-hidden">
          <img
            src="https://picsum.photos/seed/inquiry1/800/800"
            alt="Exploration 1"
            className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="aspect-square bg-neutral-100 overflow-hidden">
          <img
            src="https://picsum.photos/seed/inquiry2/800/800"
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
            { title: 'Despersonalización de la Estética', desc: 'Análisis de cómo los modelos de difusión tienden a homogeneizar los resultados visuales basados en promedios estadísticos.' },
            { title: 'Nuevas Herramientas de Control', desc: 'Evaluación de interfaces como Midjourney, Stable Diffusion y herramientas paramétricas en Figma/Adobe.' },
            { title: 'El Rol de la Curaduría', desc: 'El diseñador como filtro crítico ante la sobreproducción de imágenes generativas.' },
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
          "No se trata de si la máquina puede diseñar, sino de cómo el diseño se redefine cuando la ejecución es instantánea. El valor se desplaza de la técnica a la intención y la estructura conceptual."
        </p>
      </div>

      <div className="space-y-8">
        <p className="text-neutral-600 leading-relaxed font-light">
          A continuación se presentan los primeros bocetos de diagramación y las pruebas de prompts iniciales que servirán como base para el desarrollo del marco teórico. Este contenido es dinámico y se actualizará conforme avance la investigación.
        </p>
        <div className="aspect-video bg-neutral-100 border border-neutral-200 flex items-center justify-center">
           <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Espacio para Galería de Exploración Visual</span>
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
          Vol. 01 / AI & Visual Systems
        </div>
      </div>
    </div>
  );
}
