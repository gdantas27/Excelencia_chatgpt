import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from '@/components/LoginForm';
import { RoleSelector } from '@/components/RoleSelector';
import { Hero } from '@/components/Hero';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

export function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'admin' | 'manager' | 'operator') => {
    setShowLoginForm(true);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 font-sans">
      <button
        onClick={() => navigate('/customer/login')}
        className="fixed top-6 right-6 flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all z-50"
      >
        <Users size={18} />
        <span className="text-sm font-medium">Portal do Cliente</span>
      </button>

      <div className="h-screen grid grid-cols-1 lg:grid-cols-[1.5fr,1fr]">
        {/* Left Column */}
        <div className="relative p-24 flex flex-col justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80"
              alt="Water Background"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/75" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <Hero />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-l-[3rem] shadow-2xl flex flex-col items-center justify-center p-12">
          {/* Background Image for Right Column */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80"
              alt="Water Background"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full max-w-md flex flex-col items-center">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-8 flex justify-center"
            >
              <motion.img 
                src="https://excelenciasaneamento.com.br/wp-content/uploads/2020/08/Logo.jpg" 
                alt="Excelência Saneamento" 
                className="h-20 rounded-xl shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            
            <AnimatePresence mode="wait">
              {showLoginForm ? (
                <LoginForm key="login-form" />
              ) : (
                <RoleSelector key="role-selector" onSelectRole={handleRoleSelect} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}