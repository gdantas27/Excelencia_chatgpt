import { useStats } from '@/hooks/useStats';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { RankingCard } from '@/components/dashboard/RankingCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Users, BarChart3, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { stats, loading, error, refetch } = useStats();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!stats) return null;

  const chartData = {
    series: [
      {
        name: 'Usuários Ativos',
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  };

  const rankingData = [
    { name: 'Operadores', value: 156, percent: 92 },
    { name: 'Gestores', value: 142, percent: 85 },
    { name: 'Administradores', value: 138, percent: 82 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total de Usuários"
          value={2567}
          description="Usuários ativos no sistema"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />

        <StatsCard
          title="Taxa de Atividade"
          value="89%"
          description="Média de uso diário"
          icon={BarChart3}
          trend={{ value: 3, isPositive: false }}
        />

        <StatsCard
          title="Eficiência"
          value="95%"
          description="Taxa de conclusão"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Evolução de Usuários"
          type="area"
          series={chartData.series}
          categories={chartData.categories}
        />

        <RankingCard
          title="Distribuição por Função"
          items={rankingData}
        />
      </div>
    </div>
  );
}