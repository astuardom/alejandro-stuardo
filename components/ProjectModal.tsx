import React from 'react';
import { 
  X, ExternalLink, MessageCircle, Sparkles, Layers, Cpu, Check,
  Atom, Database, Server, Wind, Terminal, Flame, ShieldCheck, Code,
  FileJson, Palette, BarChart, PieChart, Globe
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project || !project.details) return null;

  // Helper function to map technology names to icons
  const getTechIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return <Atom size={20} className="text-cyan-400" />;
    if (n.includes('node') || n.includes('express') || n.includes('server')) return <Server size={20} className="text-green-500" />;
    if (n.includes('mongodb') || n.includes('mysql') || n.includes('sql') || n.includes('database')) return <Database size={20} className="text-emerald-500" />;
    if (n.includes('tailwind')) return <Wind size={20} className="text-teal-400" />;
    if (n.includes('firebase')) return <Flame size={20} className="text-orange-500" />;
    if (n.includes('auth') || n.includes('roles') || n.includes('seguridad')) return <ShieldCheck size={20} className="text-indigo-400" />;
    if (n.includes('python') || n.includes('php') || n.includes('terminal')) return <Terminal size={20} className="text-blue-400" />;
    if (n.includes('vue')) return <Code size={20} className="text-emerald-400" />;
    if (n.includes('javascript') || n.includes('js')) return <FileJson size={20} className="text-yellow-400" />;
    if (n.includes('css')) return <Palette size={20} className="text-blue-400" />;
    if (n.includes('html')) return <Code size={20} className="text-orange-400" />;
    if (n.includes('power bi') || n.includes('tableau') || n.includes('análisis')) return <BarChart size={20} className="text-yellow-500" />;
    return <Globe size={20} className="text-primary" />;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="project-modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/80 transition-opacity backdrop-blur-sm" onClick={onClose}></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
          
          {/* Header with Image */}
          <div className="relative h-48 sm:h-64 w-full bg-gray-200 dark:bg-gray-800 shrink-0">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h2 className="text-3xl font-bold text-white shadow-sm" id="project-modal-title">{project.title}</h2>
              </div>
            </div>
            <button
              type="button"
              className="absolute right-4 top-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            
            {/* 1. Descripción Ampliada */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary rounded-full inline-block"></span>
                Descripción del Proyecto
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                {project.details.problemSolved}
              </p>
            </div>

            {/* 2. Highlights (Customization/Features) */}
            <div className="mb-10 bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-primary" />
                {project.details.highlightsTitle || "Características Destacadas"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.details.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <Check size={14} className="text-primary" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Feature Sections */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Layers className="text-primary" />
                {project.details.featuresTitle || "Funcionalidades del Sistema"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.details.featureSections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-xl border border-transparent dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full ${sectionIdx % 2 === 0 ? 'bg-green-500' : 'bg-purple-500'}`}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Tecnologías (Mejorado Visualmente) */}
            <div className="mb-6">
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Cpu className="text-primary" />
                Tecnologías Utilizadas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {project.details.techStack.map((tech, idx) => (
                  <div key={idx} className="group flex flex-col items-center p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                      {getTechIcon(tech.name)}
                    </div>
                    <span className="block font-bold text-slate-800 dark:text-slate-200 text-xs text-center mb-1">{tech.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-500 text-center leading-tight line-clamp-2">{tech.description}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-end gap-3 shrink-0">
             <a 
              href={project.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-whatsapp hover:bg-whatsapp-hover transition-all transform hover:scale-[1.02]"
            >
              <MessageCircle size={18} className="mr-2" /> Consultar por WhatsApp
            </a>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-all transform hover:scale-[1.02]"
            >
              <ExternalLink size={18} className="mr-2" /> Visitar Sitio Web
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;