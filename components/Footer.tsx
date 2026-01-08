
import React from 'react';
import { Heart, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1">Alejandro Stuardo</h3>
            <p className="text-sm text-slate-400">Desarrollador Web y Analista de Datos | Chile</p>
          </div>
          <div className="flex items-center space-x-6">
            {['Inicio', 'Sobre mí', 'Proyectos', 'Habilidades', 'Contacto'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <a 
              href="#admin" 
              className="text-slate-700 hover:text-slate-500 transition-colors p-1"
              title="Acceso Admin"
            >
              <Shield size={14} />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p className="flex justify-center items-center">
            © 2026 Alejandro Stuardo. Hecho con <Heart size={14} className="text-red-500 mx-1 fill-red-500" /> en Chile
          </p>
          <p className="mt-2 text-xs">Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
