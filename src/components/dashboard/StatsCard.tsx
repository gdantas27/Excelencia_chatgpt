import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  amount?: number;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  amount,
  onClick, // ← ESSENCIAL
}: StatsCardProps) {
  return (
    <div
      className={`relative cursor-pointer transition-transform hover:scale-[1.02]`}
      onClick={onClick}
    >
      <Card className="transition-all hover:shadow-md">
        <CardContent className="p-4">
          {amount !== undefined && (
            <div className="absolute top-14 right-4 text-sm text-gray-500 font-medium">
              R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <Icon className="w-6 h-6 text-brand-primary" />
            </div>
            <span className="text-sm font-bold text-gray-500">{title}</span>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-1">{value}</h3>
          <p className="text-sm text-gray-500 mb-3">{description}</p>

          {trend && (
            <div className="flex items-center text-sm">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`flex items-center ${
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'}
                <span className="font-medium ml-1">{trend.value}%</span>
              </motion.div>
              <span className="text-gray-2s00 ml-1">vs período anterior</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
