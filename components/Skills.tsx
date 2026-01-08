import React, { useEffect, useRef, useState } from "react";
import {
  FileCode2,
  Palette,
  FileJson,
  Atom,
  Database,
  Wind,
  GitBranch,
  Terminal,
  BarChart,
  PieChart,
  Flame,
  Layout,
  Code,
  X,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { SkillData } from "../types";

const skillData: SkillData[] = [
  { subject: "Frontend", A: 90, fullMark: 100 },
  { subject: "Backend", A: 80, fullMark: 100 },
  { subject: "Data Analysis", A: 85, fullMark: 100 },
  { subject: "UI/UX", A: 75, fullMark: 100 },
  { subject: "Bases de Datos", A: 85, fullMark: 100 },
  { subject: "Cloud/DevOps", A: 70, fullMark: 100 },
];

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  description: string;
  projects: string[];
  tutorialUrl: string;
}

const skillsList: SkillItem[] = [
  {
    name: "HTML5",
    icon: <FileCode2 size={40} className="text-orange-500" />,
    description: "Estructura semántica y accesibilidad web moderna.",
    projects: ["Jarama Color", "Ortodoncia Rhelmu", "Landing Pages"],
    tutorialUrl: "https://developer.mozilla.org/es/docs/Web/HTML",
  },
  {
    name: "CSS3",
    icon: <Palette size={40} className="text-blue-500" />,
    description: "Diseño responsivo, animaciones y layouts avanzados.",
    projects: ["Jarama Color", "Dashboard de Ventas", "Portfolio Personal"],
    tutorialUrl: "https://developer.mozilla.org/es/docs/Web/CSS",
  },
  {
    name: "JavaScript",
    icon: <FileJson size={40} className="text-yellow-400" />,
    description: "Lógica dinámica e interactividad del lado del cliente.",
    projects: ["Sistema Gestión Clínica", "E-commerce Engine", "Interactive Charts"],
    tutorialUrl: "https://developer.mozilla.org/es/docs/Web/JavaScript",
  },
  {
    name: "React",
    icon: <Atom size={40} className="text-cyan-400" />,
    description: "Desarrollo de interfaces de usuario basadas en componentes.",
    projects: ["Jarama Color", "Ortodoncia Rhelmu", "Sistemas ERP"],
    tutorialUrl: "https://react.dev/",
  },
  {
    name: "Vue.js",
    icon: <Code size={40} className="text-emerald-500" />,
    description: "Framework progresivo para aplicaciones web reactivas.",
    projects: ["Dashboards corporativos", "Prototipos rápidos"],
    tutorialUrl: "https://vuejs.org/",
  },
  {
    name: "PHP",
    icon: <Terminal size={40} className="text-indigo-400" />,
    description: "Desarrollo backend y gestión de contenido dinámico.",
    projects: ["Sistemas Legados", "APIs de Integración"],
    tutorialUrl: "https://www.php.net/manual/es/intro-whatis.php",
  },
  {
    name: "MySQL",
    icon: <Database size={40} className="text-blue-600" />,
    description: "Diseño y gestión eficiente de bases de datos relacionales.",
    projects: ["Base de Datos Clínica", "Inventario Jarama Color"],
    tutorialUrl: "https://dev.mysql.com/doc/",
  },
  {
    name: "Tailwind CSS",
    icon: <Wind size={40} className="text-teal-400" />,
    description: "Estilizado rápido basado en utilidades y diseño modular.",
    projects: ["Ortodoncia Rhelmu", "Landing Pages Modernas"],
    tutorialUrl: "https://tailwindcss.com/",
  },
  {
    name: "Bootstrap",
    icon: <Layout size={40} className="text-purple-600" />,
    description: "Framework de diseño para prototipado rápido y responsive.",
    projects: ["Admin Panels", "Internal Tools"],
    tutorialUrl: "https://getbootstrap.com/",
  },
  {
    name: "Git & GitHub",
    icon: <GitBranch size={40} className="text-orange-600" />,
    description: "Control de versiones y flujo de trabajo colaborativo.",
    projects: ["Todos mis proyectos", "Colaboraciones en Equipo"],
    tutorialUrl: "https://github.com/git-guides",
  },
  {
    name: "Python",
    icon: <Terminal size={40} className="text-blue-500" />,
    description: "Scripting, automatización y análisis de datos robusto.",
    projects: ["Automatización de Reportes", "Data Scrapers"],
    tutorialUrl: "https://www.python.org/",
  },
  {
    name: "R",
    icon: <BarChart size={40} className="text-blue-700" />,
    description: "Lenguaje especializado en computación estadística.",
    projects: ["Análisis Estadístico Avanzado", "Visualización Académica"],
    tutorialUrl: "https://www.r-project.org/",
  },
  {
    name: "SQL",
    icon: <Database size={40} className="text-slate-500" />,
    description: "Consultas complejas y manipulación de datos estructurados.",
    projects: ["Dashboards de Power BI", "Extracción ETL"],
    tutorialUrl: "https://sqlbolt.com/",
  },
  {
    name: "Tableau",
    icon: <PieChart size={40} className="text-orange-400" />,
    description: "Visualización de datos interactiva y dashboards empresariales.",
    projects: ["KPIs de Ventas", "Análisis de Mercado"],
    tutorialUrl: "https://www.tableau.com/es-es/learn/training",
  },
  {
    name: "Power BI",
    icon: <BarChart size={40} className="text-yellow-600" />,
    description: "Inteligencia de negocios y reportes analíticos de alto impacto.",
    projects: ["Reportes Trimestrales", "Control de Gestión"],
    tutorialUrl: "https://learn.microsoft.com/es-es/power-bi/",
  },
  {
    name: "Firebase",
    icon: <Flame size={40} className="text-orange-500" />,
    description: "Plataforma de backend as a service para apps escalables.",
    projects: ["Real-time Chat", "Auth Systems", "Push Notifications"],
    tutorialUrl: "https://firebase.google.com/docs",
  },
  {
    name: "MongoDB",
    icon: <Database size={40} className="text-green-500" />,
    description: "Base de datos NoSQL para almacenamiento flexible de documentos.",
    projects: ["Jarama Color", "Ortodoncia Rhelmu", "Product Catalog"],
    tutorialUrl: "https://www.mongodb.com/docs/",
  },
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // ✅ FIX Recharts: solo renderizar el chart cuando el contenedor tenga ancho real
  const chartWrapRef = useRef<HTMLDivElement | null>(null);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    const el = chartWrapRef.current;
    if (!el) return;

    let timeoutId: NodeJS.Timeout;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        // Pequeño delay para asegurar que el contenedor esté estable
        timeoutId = setTimeout(() => {
          setChartReady(true);
        }, 100);
      }
    };

    // Primer render
    check();

    // Responde a cambios de tamaño
    const ro = new ResizeObserver(() => {
      check();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Habilidades
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Mi stack tecnológico para desarrollo web y análisis de datos (Haz clic para ver más detalles)
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Icons Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
            {skillsList.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </div>

          {/* Chart Section */}
          <div className="lg:w-1/3 min-w-0 bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-start lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Balance de Dominio
            </h3>

            {/* ✅ Contenedor estable: min-w-0 y render condicional */}
            <div ref={chartWrapRef} className="w-full min-w-0">
              {chartReady ? (
                <ResponsiveContainer width="100%" aspect={1.15} minHeight={350}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={skillData}
                    margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
                  >
                    <PolarGrid stroke="#94a3b8" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Nivel"
                      dataKey="A"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="#3b82f6"
                      fillOpacity={0.4}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        backgroundColor: "#1e293b",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                // Placeholder mínimo mientras mide (evita crash)
                <div className="w-full min-h-[350px] rounded-xl bg-slate-100 dark:bg-slate-700 animate-pulse" />
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center italic">
              * Representación visual de mi versatilidad entre desarrollo y análisis.
            </p>
          </div>
        </div>

        {/* Selected Skill Detail Overlay/Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
              className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl">
                      {selectedSkill.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedSkill.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">Habilidad Técnica</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                    aria-label="Cerrar"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Sobre esta tecnología
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedSkill.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Utilizado en proyectos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.projects.map((proj, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm border border-blue-100 dark:border-blue-800"
                        >
                          <CheckCircle2 size={14} />
                          {proj}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <a
                      href={selectedSkill.tutorialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                    >
                      <ExternalLink size={16} />
                      Documentación / Tutorial
                    </a>

                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 -z-10" onClick={() => setSelectedSkill(null)} />
          </div>
        )}

        <div className="mt-12 bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/20 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Compromiso con la Calidad
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Mi enfoque multidisciplinario me permite no solo construir aplicaciones robustas,
            sino también entender y transformar los datos en información valiosa para la toma de decisiones.
            Combino el arte del frontend con la precisión del análisis de datos.
          </p>
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: SkillItem;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => (
  <button
    onClick={onClick}
    className="relative w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group h-32 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    type="button"
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 group-hover:blur-sm">
      <div className="mb-2">{skill.icon}</div>
      <span className="font-bold text-slate-700 dark:text-slate-200 text-xs text-center">
        {skill.name}
      </span>
    </div>

    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/5 dark:bg-primary/10">
      <div className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">
        Ver Detalles
      </div>
      <p className="text-[10px] sm:text-[11px] text-center text-slate-600 dark:text-slate-300 font-medium leading-tight px-1">
        Explorar mi experiencia con {skill.name}
      </p>
    </div>
  </button>
);

export default Skills;
