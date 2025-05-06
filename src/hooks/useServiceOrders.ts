import { useState, useEffect } from 'react';
import { ServiceOrder, mockServiceOrders } from '@/lib/mock-data';
import { useNotificationStore } from '@/stores/notifications';

export function useServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockServiceOrders);
    } catch (err) {
      setError('Erro ao carregar ordens de serviço');
    } finally {
      setLoading(false);
    }
  }

  async function createOrder(order: Omit<ServiceOrder, 'id' | 'createdAt'>) {
    try {
      const newOrder: ServiceOrder = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        ...order,
      };
      setOrders(prev => [newOrder, ...prev]);
      
      addNotification({
        type: 'success',
        message: 'Ordem de serviço criada com sucesso',
        duration: 5000,
      });
      
      return newOrder;
    } catch (err) {
      addNotification({
        type: 'error',
        message: 'Erro ao criar ordem de serviço',
        duration: 5000,
      });
      throw new Error('Erro ao criar ordem de serviço');
    }
  }

  async function updateOrder(id: string, updates: Partial<ServiceOrder>) {
    try {
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, ...updates } : order
        )
      );
      
      addNotification({
        type: 'success',
        message: 'Ordem de serviço atualizada com sucesso',
        duration: 5000,
      });
    } catch (err) {
      addNotification({
        type: 'error',
        message: 'Erro ao atualizar ordem de serviço',
        duration: 5000,
      });
      throw new Error('Erro ao atualizar ordem de serviço');
    }
  }

  async function deleteOrder(id: string) {
    try {
      setOrders(prev => prev.filter(order => order.id !== id));
      
      addNotification({
        type: 'success',
        message: 'Ordem de serviço excluída com sucesso',
        duration: 5000,
      });
    } catch (err) {
      addNotification({
        type: 'error',
        message: 'Erro ao excluir ordem de serviço',
        duration: 5000,
      });
      throw new Error('Erro ao excluir ordem de serviço');
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
    refetch: fetchOrders,
  };
}