import { useState, useEffect } from 'react';

interface Stats {
  dailyOrders: number;
  weeklyOrders: number;
  monthlyOrders: number;
  completionRate: number;
  dailyTrend: number;
  weeklyTrend: number;
  monthlyTrend: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: Stats = {
        dailyOrders: 156,
        weeklyOrders: 892,
        monthlyOrders: 3567,
        completionRate: 92,
        dailyTrend: 12,
        weeklyTrend: 8,
        monthlyTrend: -3,
      };

      setStats(mockStats);
    } catch (err) {
      setError('Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  }

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}