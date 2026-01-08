
import React, { useState } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

const WHATSAPP_NUMBER = "56912345678"; // Reemplaza con tu número real

const projects: Project[] = [
  {
    id: 1,
    title: "JARAMA COLOR",
    description: "E-commerce completo para poleras personalizadas de anime y cultura pop. Permite explorar productos, gestionar carrito, pedidos directos y administración total mediante carga masiva.",
    image: "https://images.unsplash.com/photo-1767831147689-6be242464c6f?q?q=80&w=1974&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    demoUrl: "https://jaramacolor.cl/",
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Alejandro,%20vi%20tu%20proyecto%20JARAMA%20COLOR%20en%20tu%20portfolio%20y%20me%20gustaría%20saber%20más.`,
    details: {
      problemSolved: "Jaramacolor es una tienda de poleras personalizadas enfocada en anime, cultura pop y diseños únicos, donde cada cliente puede elegir estilos, colores y tallas, con un proceso de compra simple y directo.\n\nIncluye diseños exclusivos, personalización a pedido, compra directa por WhatsApp y una gestión completa desde el panel de administrador.",
      highlightsTitle: "Personalización de Productos",
      highlights: [
        "Elección de color de polera",
        "Tallas desde S a XXL",
        "Diseños anime / ilustraciones exclusivas",
        "Personalización por encargo (nombre, estilo, idea del cliente)",
        "Atención directa para ajustes antes de producir"
      ],
      featuresTitle: "Funcionalidades de la Tienda",
      featureSections: [
        {
          title: "Para Clientes",
          items: [
            "Catálogo por categorías",
            "Vista detallada del producto",
            "Carrito de compras",
            "Pedido directo vía WhatsApp",
            "Seguimiento del pedido"
          ]
        },
        {
          title: "Para Administrador",
          items: [
            "Gestión de productos",
            "Productos destacados",
            "Carga masiva de productos",
            "Control de pedidos",
            "Administración de stock y precios"
          ]
        }
      ],
      techStack: [
        { name: "React", description: "Frontend moderno y rápido" },
        { name: "Node.js", description: "Backend robusto" },
        { name: "MongoDB", description: "Base de datos escalable" },
        { name: "Tailwind CSS", description: "Diseño limpio y responsive" }
      ]
    }
  },
  {
    id: 2,
    title: "Sistema de Gestión Clínica Dental",
    description: "Plataforma integral para clínicas dentales. Gestión de fichas clínicas, odontograma interactivo, agenda de citas y control de inventario médico con interfaz moderna.",
    image: "https://images.unsplash.com/photo-1767831180797-2039fe5ecb8e?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    demoUrl: "https://ortodonciarhelmu.cl/",
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Alejandro,%20me%20interesó%20el%20Sistema%20de%20Gestión%20Clínica%20que%20desarrollaste.`,
    details: {
      problemSolved: "Ortodoncía Rhelmu es una plataforma digital diseñada para clínicas dentales y profesionales de la ortodoncia, que permite gestionar pacientes, tratamientos y procesos clínicos de forma ordenada, moderna y segura.\n\nEl sistema está enfocado en optimizar la gestión clínica, mejorar la experiencia del paciente y centralizar toda la información en un solo lugar.",
      highlightsTitle: "Funcionalidades Principales",
      highlights: [
        "Ficha clínica y de ortodoncia digital",
        "Odontograma interactivo y registro de imágenes",
        "Control de tratamientos y evolución del paciente",
        "Agenda organizada por profesional con estados",
        "Interfaz limpia y 100% responsive"
      ],
      featuresTitle: "Módulos y Gestión",
      featureSections: [
        {
          title: "Agenda y Comunicación",
          items: [
            "Agenda con vista diaria, semanal y mensual",
            "Identificación visual por colores",
            "Envío de mensajes vía WhatsApp",
            "Recordatorios automáticos",
            "Contacto directo con el paciente"
          ]
        },
        {
          title: "Panel Administrativo",
          items: [
            "Gestión de pacientes y presupuestos",
            "Control de inventario clínico",
            "Roles: Administrador, Doctor, Asistente",
            "Organización de usuarios y permisos",
            "Reportes básicos de gestión"
          ]
        }
      ],
      techStack: [
        { name: "React", description: "Interfaz moderna" },
        { name: "Node.js / Express", description: "Backend y API REST" },
        { name: "MongoDB", description: "Base de datos clínica" },
        { name: "Tailwind CSS", description: "Diseño responsive" },
        { name: "Auth / Roles", description: "Seguridad y control de acceso" }
      ]
    }
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    if (project.details) {
      setSelectedProject(project);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-[#161f32] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Mis Proyectos</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mi experiencia en desarrollo web y diseño de interfaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col h-full hover:transform hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-64 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.details ? (
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-white font-bold border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105"
                    >
                      Ver Detalles
                    </button>
                  ) : (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105"
                    >
                      Ver Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${tag === 'React' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                      ${tag === 'Node.js' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                      ${tag === 'MongoDB' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : ''}
                      ${tag === 'Tailwind' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' : ''}
                    `}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors">
                    <ExternalLink size={16} className="mr-2" /> Demo
                  </a>
                  <a href={project.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-whatsapp hover:bg-whatsapp-hover transition-colors">
                    <MessageCircle size={16} className="mr-2" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;
