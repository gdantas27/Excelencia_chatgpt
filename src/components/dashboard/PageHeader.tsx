import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-gray-500"
          >
            {description}
          </motion.p>
        )}
      </div>

      {action && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={action.onClick} className="flex items-center gap-2">
            <Plus size={20} />
            {action.label}
          </Button>
        </motion.div>
      )}
    </div>
  );
}