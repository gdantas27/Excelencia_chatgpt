import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/auth';

interface TestCredentials {
  admin: { email: string; password: string; name: string; };
  manager: { email: string; password: string; name: string; };
  operator: { email: string; password: string; name: string; };
}

const testCredentials: TestCredentials = {
  admin: { 
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Administrador'
  },
  manager: { 
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Gerente'
  },
  operator: { 
    email: 'operator@example.com',
    password: 'operator123',
    name: 'Operador'
  },
};

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    let role: UserRole | undefined;
    let credentials: typeof testCredentials[keyof typeof testCredentials] | undefined;

    if (email === testCredentials.admin.email && password === testCredentials.admin.password) {
      role = 'admin';
      credentials = testCredentials.admin;
    } else if (email === testCredentials.manager.email && password === testCredentials.manager.password) {
      role = 'manager';
      credentials = testCredentials.manager;
    } else if (email === testCredentials.operator.email && password === testCredentials.operator.password) {
      role = 'operator';
      credentials = testCredentials.operator;
    }

    if (role && credentials) {
      login({
        id: crypto.randomUUID(),
        email,
        name: credentials.name,
        role,
      });
      navigate(`/${role}`);
    } else {
      setError('Credenciais inválidas');
    }
  };

  const useTestCredentials = (role: keyof TestCredentials) => {
    setEmail(testCredentials[role].email);
    setPassword(testCredentials[role].password);
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Portal de Gestão</h2>
        <p className="text-gray-500 mt-2">Acesse sua conta para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 text-sm py-2 px-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              placeholder="Email"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              placeholder="Senha"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary" />
            <span className="text-sm text-gray-600">Lembrar-me</span>
          </label>
          <button type="button" className="text-sm text-brand-primary hover:text-brand-secondary">
            Esqueceu a senha?
          </button>
        </div>

        <motion.button 
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="button-gradient w-full text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 text-lg"
        >
          Acessar Sistema
          <ChevronRight size={18} />
        </motion.button>
      </form>

      <div className="mt-4 space-y-2">
        <p className="text-xs text-center text-gray-500 font-medium">Credenciais de Teste</p>
        <div className="flex gap-2">
          {(['admin', 'manager', 'operator'] as const).map((role) => (
            <motion.button
              key={role}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => useTestCredentials(role)}
              className="flex-1 py-1 px-2 text-xs rounded-lg bg-gray-100 hover:bg-brand-primary/10 text-gray-600 hover:text-brand-primary transition-colors flex items-center justify-center gap-1"
            >
              <Sparkles size={12} />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}