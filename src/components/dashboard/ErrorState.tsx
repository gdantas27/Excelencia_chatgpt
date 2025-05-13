import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Ocorreu um erro',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Tentar novamente
        </Button>
      )}
    </motion.div>
  );
}