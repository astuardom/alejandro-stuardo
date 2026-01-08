
import React from 'react';
import { X, CheckCircle, ArrowLeft } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/70 transition-opacity backdrop-blur-sm" onClick={onClose}></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-xl bg-white dark:bg-slate-800 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-slate-200 dark:border-slate-700">
          
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="text-slate-400 hover:text-slate-500 dark:hover:text-white transition-colors"
              onClick={onClose}
            >
              <span className="sr-only">Cerrar</span>
              <X size={24} />
            </button>
          </div>

          <div className="px-4 pb-4 pt-5 sm:p-8 sm:pb-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 mb-6 ring-4 ring-blue-50 dark:ring-blue-900/10">
                <CheckCircle className="text-primary" size={48} />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white tracking-tight" id="modal-title">
                  Mensaje enviado correctamente.
                </h3>
                <div className="mt-3 px-2">
                  <p className="text-base text-slate-500 dark:text-slate-300 font-normal leading-relaxed">
                    Gracias por contactarme. Me pondré en contacto contigo lo antes posible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-900 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-8 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary-hover sm:w-full transition-all duration-200 group"
              onClick={onClose}
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
