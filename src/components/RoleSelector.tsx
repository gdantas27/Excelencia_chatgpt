import { motion } from 'framer-motion';
import { Building2, Users, UserCog } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: 'admin' | 'manager' | 'operator') => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    { 
      id: 'admin',
      label: 'Administrador',
      icon: UserCog,
      description: 'Controle total do sistema'
    },
    { 
      id: 'manager',
      label: 'Gestor',
      icon: Building2,
      description: 'Gestão de equipes e O.S.'
    },
    { 
      id: 'operator',
      label: 'Operador',
      icon: Users,
      description: 'Execução de tarefas'
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Portal de Gestão</h2>
        <p className="text-gray-500 mt-2">Selecione seu perfil de acesso</p>
      </div>

      <div className="space-y-4">
        {roles.map((role, index) => (
          <motion.button
            key={role.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectRole(role.id)}
            className="w-full p-4 rounded-xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-primary/20 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <role.icon size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 group-hover:text-brand-primary transition-colors">
                  {role.label}
                </h3>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}