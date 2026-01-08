import React from 'react';
import { Code2, Users, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Sobre Mí</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <p>
              Soy desarrollador web y analista de datos, especializado en crear soluciones digitales que integran diseño funcional, tecnología moderna y análisis estratégico de la información. Mi trabajo se enfoca tanto en el desarrollo de sitios web personalizados y eficientes, como en la construcción de dashboards informativos.
            </p>
            <p>
              Combino conocimientos en programación frontend y backend con herramientas de análisis y visualización de datos, lo que me permite entregar plataformas completas: desde la interfaz del usuario hasta los indicadores de gestión integrados.
            </p>
            <p>
              Mi enfoque profesional se basa en la excelencia técnica, la comprensión profunda de los objetivos del proyecto y una comunicación clara y colaborativa en todas las etapas del desarrollo.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start space-x-4 hover:shadow-md transition-shadow group">
              <div className="flex-shrink-0 pt-1">
                <Code2 className="text-primary group-hover:scale-110 transition-transform" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Desarrollo Moderno</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Utilizo las últimas tecnologías para crear sitios web rápidos y seguros.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start space-x-4 hover:shadow-md transition-shadow group">
              <div className="flex-shrink-0 pt-1">
                <Users className="text-primary group-hover:scale-110 transition-transform" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Enfoque en PYMEs</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Especializado en soluciones digitales para pequeñas y medianas empresas.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start space-x-4 hover:shadow-md transition-shadow group">
              <div className="flex-shrink-0 pt-1">
                <Lightbulb className="text-primary group-hover:scale-110 transition-transform" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Diseño Funcional</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Cada elemento tiene un propósito, priorizando la experiencia del usuario.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;