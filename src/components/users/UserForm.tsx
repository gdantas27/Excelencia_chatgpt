import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, User, Mail, Phone, Lock } from 'lucide-react';
import { UserRole } from '@/stores/auth';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleConfig = {
  admin: {
    label: 'Administrador',
    description: 'Acesso total ao sistema',
    className: 'border-purple-500 bg-purple-50 text-purple-500',
  },
  manager: {
    label: 'Gestor',
    description: 'Gerenciamento de equipes e O.S.',
    className: 'border-blue-500 bg-blue-50 text-blue-500',
  },
  operator: {
    label: 'Operador',
    description: 'Execução de tarefas',
    className: 'border-green-500 bg-green-50 text-green-500',
  },
};

export function UserForm({ isOpen, onClose }: UserFormProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('operator');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Novo Usuário</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Função do Usuário
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(Object.keys(roleConfig) as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                        selectedRole === role
                          ? roleConfig[role].className
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Shield size={24} />
                      <div className="text-left">
                        <div className="font-medium">{roleConfig[role].label}</div>
                        <div className="text-sm text-gray-500">{roleConfig[role].description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Digite o nome completo"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Digite o email"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      placeholder="Digite o telefone"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="Digite a senha"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="text-sm text-gray-600">Usuário ativo</span>
                </label>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="button-gradient px-4 py-2 text-white font-medium rounded-lg"
            >
              Criar Usuário
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}