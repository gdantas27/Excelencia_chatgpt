import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Files,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Settings,
  HelpCircle,
  ClipboardList,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/ScrollArea';

export function CustomerPortal() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Visão Geral',
      path: '/customer',
    },
    {
      icon: FileText,
      label: 'Orçamentos',
      path: '/customer/proposals',
      badge: '2',
    },
    {
      icon: ClipboardList,
      label: 'Ordens de Serviço',
      path: '/customer/orders',
      badge: '3',
    },
    {
      icon: Calendar,
      label: 'Agendamentos',
      path: '/customer/appointments',
      badge: '1',
    },
    {
      icon: Files,
      label: 'Documentos',
      path: '/customer/documents',
    },
  ];

  const secondaryItems = [
    {
      icon: Settings,
      label: 'Configurações',
      path: '/customer/settings',
    },
    {
      icon: HelpCircle,
      label: 'Ajuda',
      path: '/customer/help',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-30 flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <img
            src="https://excelenciasaneamento.com.br/wp-content/uploads/2020/08/Logo.jpg"
            alt="Excelência Saneamento"
            className={`transition-all duration-300 ${
              isSidebarOpen ? 'w-32' : 'w-10'
            }`}
          />
        </div>

        <ScrollArea className="flex-1">
          <nav className="p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-2 relative ${
                    isActive
                      ? 'bg-brand-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon size={20} />
                {isSidebarOpen && (
                  <>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <div className="mt-6 pt-6 border-t border-gray-200">
              {secondaryItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-2 ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon size={20} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
            >
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-medium">
                JS
              </div>
              {isSidebarOpen && (
                <>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      João Silva
                    </p>
                    <p className="text-xs text-gray-500 truncate">CLI000123</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </>
              )}
            </button>

            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <button
                  onClick={() => navigate('/customer/login')}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <Menu size={20} /> : <X size={20} />}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Portal do Cliente
            </h1>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-6">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}