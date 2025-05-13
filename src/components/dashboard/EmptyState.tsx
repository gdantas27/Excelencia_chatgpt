import { motion } from 'framer-motion';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6">
        <FileQuestion className="w-8 h-8 text-brand-primary" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>

      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}