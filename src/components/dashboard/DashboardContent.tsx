import { ReactNode } from 'react';

interface DashboardContentProps {
  children: ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto">
      <div className="container mx-auto p-6">
        {children}
      </div>
    </div>
  );
}