import { useState, useEffect } from 'react';
import { Notification, mockNotifications } from '@/lib/mock-data';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotifications(mockNotifications);
    } catch (err) {
      setError('Erro ao carregar notificações');
    } finally {
      setLoading(false);
    }
  }

  async function createNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
    try {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        ...notification,
      };
      setNotifications(prev => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      throw new Error('Erro ao criar notificação');
    }
  }

  async function deleteNotification(id: string) {
    try {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    } catch (err) {
      throw new Error('Erro ao excluir notificação');
    }
  }

  return {
    notifications,
    loading,
    error,
    createNotification,
    deleteNotification,
    refetch: fetchNotifications,
  };
}