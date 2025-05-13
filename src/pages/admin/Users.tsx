import { useState } from 'react';
import { 
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Shield,
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { UserRole } from '@/stores/auth';
import { UserForm } from '@/components/users/UserForm';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: Date;
  createdAt: Date;
}

const mockUsers: SystemUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    role: 'operator',
    status: 'active',
    lastLogin: new Date('2024-03-12 08:30:00'),
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    phone: '(11) 98888-8888',
    role: 'manager',
    status: 'active',
    lastLogin: new Date('2024-03-12 09:15:00'),
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    phone: '(11) 97777-7777',
    role: 'operator',
    status: 'inactive',
    lastLogin: new Date('2024-03-10 14:20:00'),
    createdAt: new Date('2024-02-15'),
  },
];

const roleConfig = {
  admin: {
    label: 'Administrador',
    className: 'bg-purple-100 text-purple-800',
  },
  manager: {
    label: 'Gestor',
    className: 'bg-blue-100 text-blue-800',
  },
  operator: {
    label: 'Operador',
    className: 'bg-green-100 text-green-800',
  },
};

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<SystemUser[]>(mockUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFormOpen(true)}
            className="button-gradient px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2"
          >
            <Plus size={20} />
            Novo Usuário
          </motion.button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Função
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Acesso
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            Desde {user.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail size={14} />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone size={14} />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-gray-400" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          roleConfig[user.role].className
                        }`}>
                          {roleConfig[user.role].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        {user.lastLogin.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}