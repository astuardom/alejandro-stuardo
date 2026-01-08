import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { ContactMessage } from './types';
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>('portfolio');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 3000);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. User:", user ? `Logged in as ${user.uid}` : "Not logged in");
      setIsAuthenticated(!!user);
      setIsLoading(false);
      clearTimeout(loadingTimeout);
    }, (error) => {
      console.error("Error en auth state:", error);
      setIsLoading(false);
    });

    return () => {
      unsubscribeAuth();
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Listener en tiempo real para mensajes desde Firestore
  useEffect(() => {
    console.log("useEffect Firestore listener. isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      setMessages([]);
      return;
    }

    const q = query(collection(db, "messages"), orderBy("date", "desc"));
    const unsubscribeMessages = onSnapshot(q,
      (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactMessage[];
        setMessages(msgs);
      },
      (error) => {
        console.error("Error en el listener de Firestore:", error, "User UID:", auth.currentUser?.uid);
      }
    );

    return () => unsubscribeMessages();
  }, [isAuthenticated]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('portfolio');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleContactSubmit = async (formData: { name: string; email: string; message: string }) => {
    console.log("Intentando guardar mensaje en Firestore...", formData);
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        ...formData,
        date: new Date().toISOString(),
        status: 'new' as const
      });
      console.log("Mensaje guardado con éxito. ID:", docRef.id);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error detallado guardando mensaje en Firestore:", error, "User UID:", auth.currentUser?.uid);
      alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-slate-400 text-sm animate-pulse">Iniciando servicios...</p>
      </div>
    );
  }

  if (currentView === 'admin') {
    if (!isAuthenticated) {
      return (
        <Login
          onLogin={() => setIsAuthenticated(true)}
          onBack={() => {
            window.location.hash = '';
            setCurrentView('portfolio');
          }}
        />
      );
    }
    return (
      <AdminDashboard
        messages={messages}
        onLogout={async () => {
          try {
            await firebaseSignOut(auth);
            setIsAuthenticated(false);
            window.location.hash = '';
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary selection:text-white bg-gray-50 dark:bg-slate-900">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact onSubmit={handleContactSubmit} />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;