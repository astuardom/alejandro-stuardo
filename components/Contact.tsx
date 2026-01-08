import React, { useState, useMemo } from 'react';
import { MapPin, Mail, Github, Linkedin, MessageCircle, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

const WHATSAPP_NUMBER = "56912345678"; // Reemplaza con tu número real

const Contact: React.FC<ContactProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'El nombre es obligatorio';
        else if (value.trim().length < 3) error = 'El nombre debe tener al menos 3 caracteres';
        break;
      case 'email':
        if (!value.trim()) error = 'El correo electrónico es obligatorio';
        else if (!validateEmail(value)) error = 'Ingresa un formato de correo válido (ej: nombre@dominio.com)';
        break;
      case 'message':
        if (!value.trim()) error = 'El mensaje no puede estar vacío';
        else if (value.trim().length < 10) error = 'Cuéntame un poco más (mínimo 10 caracteres)';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar inmediatamente si el campo ya ha sido tocado
    if (touched[name as keyof typeof touched]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length >= 3 &&
      validateEmail(formData.email) &&
      formData.message.trim().length >= 10 &&
      !errors.name && !errors.email && !errors.message
    );
  }, [formData, errors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos como tocados para mostrar errores si intentan enviar vacío
    setTouched({ name: true, email: true, message: true });
    
    const nameError = validate('name', formData.name);
    const emailError = validate('email', formData.email);
    const messageError = validate('message', formData.message);

    if (nameError || emailError || messageError) {
      setErrors({ name: nameError, email: emailError, message: messageError });
      return;
    }

    onSubmit(formData);
    setFormData({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
    setErrors({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-[#161f32] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Contacto</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a alcanzar tus objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <Send size={20} className="text-primary" />
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-xl shadow-sm py-3.5 px-4 transition-all duration-200 outline-none border-2 ${
                      touched.name && errors.name 
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10' 
                        : touched.name && !errors.name && formData.name
                          ? 'border-emerald-400 focus:border-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:border-primary'
                    } dark:text-white`}
                    placeholder="Ej: Alejandro Stuardo"
                  />
                  {touched.name && !errors.name && formData.name && (
                    <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                  )}
                </div>
                {touched.name && errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center font-medium ml-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} className="mr-1.5 shrink-0" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-xl shadow-sm py-3.5 px-4 transition-all duration-200 outline-none border-2 ${
                      touched.email && errors.email 
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10' 
                        : touched.email && !errors.email && formData.email
                          ? 'border-emerald-400 focus:border-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:border-primary'
                    } dark:text-white`}
                    placeholder="nombre@ejemplo.com"
                  />
                  {touched.email && !errors.email && formData.email && (
                    <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                  )}
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center font-medium ml-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} className="mr-1.5 shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full rounded-xl shadow-sm py-3.5 px-4 transition-all duration-200 outline-none border-2 resize-none ${
                    touched.message && errors.message 
                      ? 'border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10' 
                      : touched.message && !errors.message && formData.message
                        ? 'border-emerald-400 focus:border-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:border-primary'
                  } dark:text-white`}
                  placeholder="Cuéntame sobre tu proyecto o consulta..."
                ></textarea>
                {touched.message && errors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center font-medium ml-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} className="mr-1.5 shrink-0" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:transform-none shadow-primary/20"
              >
                <Send size={18} className="mr-2" /> Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Información de Contacto Directo */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Información de contacto</h3>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <MapPin className="text-primary group-hover:text-white" size={24} />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Ubicación</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Santiago, Chile</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Mail className="text-primary group-hover:text-white" size={24} />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Correo Electrónico</p>
                    <a href="mailto:a.stuardo.m@gmail.com" className="text-slate-600 dark:text-slate-400 mt-1 hover:text-primary transition-colors block font-medium">
                      a.stuardo.m@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex-grow">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Redes y Comunicación</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <SocialCard href="https://github.com/" icon={<Github size={22} />} label="GitHub" />
                <SocialCard href="https://linkedin.com/" icon={<Linkedin size={22} />} label="LinkedIn" />
              </div>
              
              <div className="border-t border-slate-100 dark:border-slate-700 pt-8">
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">¿Necesitas una respuesta rápida?</h4>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Alejandro,%20te%20contacto%20desde%20tu%20portfolio%20web.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-whatsapp text-white py-4 rounded-xl font-bold hover:bg-whatsapp-hover transition-all shadow-lg shadow-whatsapp/20 group"
                >
                  <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
                  Hablemos por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialCard: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group shadow-sm"
  >
    <div className="text-slate-500 dark:text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-2">
      {icon}
    </div>
    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">{label}</span>
  </a>
);

export default Contact;