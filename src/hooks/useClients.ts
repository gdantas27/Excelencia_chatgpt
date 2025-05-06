import { useState, useEffect } from 'react';
import { Client, mockClients } from '@/lib/mock-data';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClients(mockClients);
    } catch (err) {
      setError('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  }

  async function createClient(client: Omit<Client, 'id' | 'createdAt'>) {
    try {
      const newClient: Client = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        ...client,
      };
      setClients(prev => [newClient, ...prev]);
      return newClient;
    } catch (err) {
      throw new Error('Erro ao criar cliente');
    }
  }

  async function updateClient(id: string, updates: Partial<Client>) {
    try {
      setClients(prev =>
        prev.map(client =>
          client.id === id ? { ...client, ...updates } : client
        )
      );
    } catch (err) {
      throw new Error('Erro ao atualizar cliente');
    }
  }

  async function deleteClient(id: string) {
    try {
      setClients(prev => prev.filter(client => client.id !== id));
    } catch (err) {
      throw new Error('Erro ao excluir cliente');
    }
  }

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refetch: fetchClients,
  };
}