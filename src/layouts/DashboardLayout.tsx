import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { useAuthStore, UserRole } from '@/stores/auth';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface DashboardLayoutProps {
  role: UserRole;
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-100">
      <Sidebar role={role} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <TopBar />
        <ScrollArea className="flex-1">
          <div className="container mx-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}