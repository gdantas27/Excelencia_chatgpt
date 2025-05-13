import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserRole, useAuthStore } from '@/stores/auth';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ role, isOpen, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: Users, label: 'Usuários', path: '/admin/users' },
    ],
    manager: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/manager' },
      { icon: Users, label: 'Clientes', path: '/manager/clients' },
      {
        icon: ClipboardList,
        label: 'Ordens de Serviço',
        path: '/manager/orders',
        
      },
      { icon: Bell, label: 'Quadro de Avisos', path: '/manager/notifications' },
    ],
    operator: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/operator' },
      { icon: Users, label: 'Clientes', path: '/operator/clients' },
      {
        icon: ClipboardList,
        label: 'Ordens de Serviço',
        path: '/operator/orders',
      },
      {
        icon: Bell,
        label: 'Quadro de Avisos',
        path: '/operator/notifications',
      },
    ],
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      className="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-30 flex flex-col"
    >
      <div className="p-4 border-b border-gray-200">
        <img
          src="https://excelenciasaneamento.com.br/wp-content/uploads/2020/08/Logo.jpg"
          alt="Excelência Saneamento"
          className={`transition-all duration-300 ${isOpen ? 'w-32' : 'w-10'}`}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {menuItems[role].map((item) => (
          <div key={item.path} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </NavLink>

            {isOpen && item.submenu && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subitem) => (
                  <NavLink
                    key={subitem.path}
                    to={subitem.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-brand-primary/10 text-brand-primary'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    <subitem.icon size={16} />
                    <span>{subitem.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        {isOpen ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings size={18} />
              Configurações
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <User size={20} />
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onToggle}
        className="p-4 border-t border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </motion.aside>
  );
}
