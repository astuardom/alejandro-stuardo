import React from 'react';
import { Github, Code, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-16 bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,hsla(253,16%,7%,1)_0,transparent_50%),radial-gradient(at_50%_0%,hsla(225,39%,30%,1)_0,transparent_50%),radial-gradient(at_100%_0%,hsla(339,49%,30%,1)_0,transparent_50%)]"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 border border-blue-500/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-24 text-white/5 animate-pulse">
          <Code size={120} strokeWidth={1} />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8 relative inline-block group cursor-pointer">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 relative z-10 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
            <Github size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Alejandro Stuardo Matus
        </h1>
        <h2 className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
          Desarrollador Web y Analista de Datos
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Creo sitios web modernos y funcionales que ayudan a las pequeñas empresas a destacar en el mundo digital.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#projects" 
            onClick={(e) => handleNavClick(e, '#projects')}
            className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-lg border border-slate-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Ver Proyectos
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-block bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Contáctame
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <a 
          href="#about" 
          onClick={(e) => handleNavClick(e, '#about')}
          className="text-slate-500 hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;