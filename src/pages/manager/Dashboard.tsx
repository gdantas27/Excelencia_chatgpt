import { useStats } from '@/hooks/useStats';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { RankingCard } from '@/components/dashboard/RankingCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { BarChart3, Users, Clock, CheckCircle, XCircle, Search, TrendingUp } from 'lucide-react';

export function ManagerDashboard() {
  const { stats, loading, error, refetch } = useStats();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!stats) return null;

  const chartData = {
    series: [
      {
        name: 'Atendimentos',
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  };

  const rankingData = [
    { name: 'João Silva', value: 156, percent: 92 },
    { name: 'Maria Santos', value: 142, percent: 85 },
    { name: 'Pedro Oliveira', value: 138, percent: 82 },
    { name: 'Ana Costa', value: 125, percent: 78 },
    { name: 'Lucas Souza', value: 118, percent: 73 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Gerencial</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Hoje"
          value={stats.dailyOrders}
          description="Atendimentos do Dia"
          icon={CheckCircle}
          trend={{ value: stats.dailyTrend, isPositive: stats.dailyTrend > 0 }}
        />

        <StatsCard
          title="Esta semana"
          value={stats.weeklyOrders}
          description="Atendimentos da Semana"
          icon={Clock}
          trend={{ value: stats.weeklyTrend, isPositive: stats.weeklyTrend > 0 }}
        />

        <StatsCard
          title="Este mês"
          value={stats.monthlyOrders}
          description="Atendimentos do Mês"
          icon={BarChart3}
          trend={{ value: stats.monthlyTrend, isPositive: stats.monthlyTrend > 0 }}
        />

        <StatsCard
          title="Ranking"
          value={`${stats.completionRate}%`}
          description="Taxa de Conclusão"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Evolução Diária"
          type="area"
          series={chartData.series}
          categories={chartData.categories}
        />

        <RankingCard
          title="Ranking do Mês"
          items={rankingData}
        />
      </div>
    </div>
  );
}