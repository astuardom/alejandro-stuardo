import React, { useState, useMemo } from 'react';
import { 
  LogOut, 
  Search, 
  Trash2, 
  CheckCircle, 
  Mail, 
  User, 
  Clock, 
  Filter,
  Eye,
  Reply,
  Copy,
  Inbox,
  AlertTriangle,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { ContactMessage, MessageStatus } from '../types';
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

interface AdminDashboardProps {
  messages: ContactMessage[];
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | MessageStatus>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const kpis = useMemo(() => ({
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    unread: messages.filter(m => m.status === 'new').length,
  }), [messages]);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || m.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [messages, searchTerm, filterStatus]);

  const handleUpdateStatus = async (id: string, newStatus: MessageStatus) => {
    try {
      const msgRef = doc(db, "messages", id);
      await updateDoc(msgRef, { status: newStatus });
      showToast('Estado actualizado.');
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error("Error actualizando estado:", error);
      showToast('Error al actualizar.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      setIsDeleting(null);
      setSelectedMessage(null);
      showToast('Mensaje eliminado.');
    } catch (error) {
      console.error("Error eliminando mensaje:", error);
      showToast('Error al eliminar.', 'error');
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    showToast('Email copiado.');
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return "Fecha no disponible";
    }
  };

  const getStatusLabel = (status: MessageStatus) => {
    switch (status) {
      case 'new': return { label: 'Nuevo', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
      case 'read': return { label: 'Leído', class: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' };
      case 'replied': return { label: 'Respondido', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col font-sans">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Inbox size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Mensajes recibidos (Nube)</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Panel administrativo en tiempo real.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={18} /> Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Nuevos', value: kpis.new, icon: AlertTriangle, color: 'text-blue-500' },
            { label: 'Sin leer', value: kpis.unread, icon: Eye, color: 'text-amber-500' },
            { label: 'Total', value: kpis.total, icon: Inbox, color: 'text-slate-500' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className={kpi.color} size={20} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'new', 'read', 'replied'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      filterStatus === s 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {s === 'all' ? 'Todos' : s === 'new' ? 'Nuevos' : s === 'read' ? 'Leídos' : 'Resp.'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all hover:shadow-md group flex items-start gap-4 ${
                      selectedMessage?.id === msg.id 
                        ? 'border-primary ring-1 ring-primary' 
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className={`p-3 rounded-full shrink-0 ${
                      msg.status === 'new' ? 'bg-blue-100 text-blue-500' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <User size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate pr-2">{msg.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusLabel(msg.status).class}`}>
                          {getStatusLabel(msg.status).label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 truncate">{msg.email}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-1 italic">"{msg.message}"</p>
                    </div>
                    <ChevronRight size={16} className="shrink-0 mt-4 text-slate-300" />
                  </button>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                  <Inbox className="mx-auto text-slate-300 mb-4" size={48} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Vacio</h3>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-24">
              {selectedMessage ? (
                <>
                  <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                          <User size={32} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedMessage.name}</h2>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">{selectedMessage.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <button 
                        onClick={() => handleCopyEmail(selectedMessage.email)}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors"
                      >
                        <Copy size={16} /> Copiar
                      </button>
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-all"
                      >
                        <Reply size={16} /> Responder
                      </a>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line text-lg">
                        {selectedMessage.message}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Clock size={14} /> {formatDate(selectedMessage.date)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-800/20 flex flex-wrap gap-3 justify-between items-center">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(selectedMessage.id, 'read')}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border rounded-lg text-xs font-bold hover:bg-slate-50"
                      >
                        <Eye size={14} className="inline mr-1" /> Leído
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(selectedMessage.id, 'replied')}
                        className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100"
                      >
                        <CheckCircle size={14} className="inline mr-1" /> Respondido
                      </button>
                    </div>
                    <button 
                      onClick={() => setIsDeleting(selectedMessage.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-16 text-center">
                   <Inbox className="mx-auto text-slate-200 mb-4" size={64} />
                   <p className="text-slate-500">Selecciona un mensaje.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-8 border border-slate-200 shadow-2xl">
            <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-4">¿Eliminar?</h3>
            <div className="flex gap-4">
              <button onClick={() => setIsDeleting(null)} className="flex-grow py-3 bg-slate-100 rounded-xl font-bold">No</button>
              <button onClick={() => handleDelete(isDeleting)} className="flex-grow py-3 bg-red-600 text-white rounded-xl font-bold">Sí, borrar</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-right-full ${
          toast.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'
        }`}>
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;