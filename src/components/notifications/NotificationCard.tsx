import { motion } from 'framer-motion';
import { Info, AlertCircle, CheckCircle, Calendar, MessageSquare, User } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';

interface NotificationCardProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    createdAt: Date;
    author: string;
    comments: number;
  };
}

const typeConfig = {
  info: {
    icon: Info,
    className: 'text-blue-500 bg-blue-50',
  },
  warning: {
    icon: AlertCircle,
    className: 'text-yellow-500 bg-yellow-50',
  },
  success: {
    icon: CheckCircle,
    className: 'text-green-500 bg-green-50',
  },
};

export function NotificationCard({ notification }: NotificationCardProps) {
  const IconComponent = typeConfig[notification.type].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${typeConfig[notification.type].className}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              <p className="mt-1 text-gray-600">{notification.message}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {notification.createdAt.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {notification.author}
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {notification.comments} comentários
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex justify-end w-full gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
              Ver Comentários
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-brand-primary hover:text-brand-primary/80 rounded-lg hover:bg-brand-primary/10 transition-colors">
              Responder
            </button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}