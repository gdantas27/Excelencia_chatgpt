import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotificationToast } from './NotificationToast';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== Infinity) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}