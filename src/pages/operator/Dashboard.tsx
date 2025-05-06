import { StatsCard } from '@/components/dashboard/StatsCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  XCircle,
  Search,
  UserPlus,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function OperatorDashboard() {
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [clientType, setClientType] = useState('all');
  const [personType, setPersonType] = useState('all');
  const { orders, loading, error, refetch } = useServiceOrders();
  const filteredOrders = orders.filter((order) => {
    const matchesClientType =
      clientType === 'all' || order.clientType === clientType;

    const matchesPersonType =
      personType === 'all' || order.personType === personType;

    const matchesDate =
      (!dateStart || new Date(order.createdAt) >= new Date(dateStart)) &&
      (!dateEnd || new Date(order.createdAt) <= new Date(dateEnd));

    return matchesClientType && matchesPersonType && matchesDate;
  });
  const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const atendimentosPorDia = diasDaSemana.map((dia) => {
    return filteredOrders.filter((order) => {
      const diaSemana = new Date(order.createdAt).toLocaleDateString('pt-BR', {
        weekday: 'short',
      });
      return diaSemana.toLowerCase().startsWith(dia.toLowerCase().slice(0, 3));
    }).length;
  });

  const valoresPorDia = diasDaSemana.map((dia) => {
    return filteredOrders
      .filter((order) => {
        const diaSemana = new Date(order.createdAt).toLocaleDateString(
          'pt-BR',
          {
            weekday: 'short',
          }
        );
        return diaSemana
          .toLowerCase()
          .startsWith(dia.toLowerCase().slice(0, 3));
      })
      .reduce((total, order) => {
        const valores = {
          approved: 1500,
          pending: 1200,
          rejected: 800,
          inspection: 1000,
        };
        return total + (valores[order.status] || 1000);
      }, 0);
  });

  const navigate = useNavigate();

  const handleCardClick = (status: string) => {
    navigate(`/operator/orders?status=${status}`);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const chartData = {
    series: [
      {
        name: 'Atendimentos',
        data: [12, 15, 18, 14, 16, 10, 8],
      },
    ],
    categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Meu Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">
              Taxa de Conclusão:{' '}
              {Math.round(
                (filteredOrders.filter((o) => o.status === 'approved').length /
                  filteredOrders.length) *
                  100 || 0
              )}
              %
            </span>
          </div>

          <button
            onClick={() => navigate('/operator/clients')}
            className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
          >
            + Novo Cliente
          </button>

          <button
            onClick={() => navigate('/operator/orders')}
            className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all"
          >
            + Nova O.S.
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          type="date"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          placeholder="Data inicial"
        />
        <Input
          type="date"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
          placeholder="Data final"
        />
        <Select
          value={clientType}
          onChange={(e) => setClientType(e.target.value)}
        >
          <option value="all">Todos os clientes</option>
          <option value="new">Novos</option>
          <option value="renewal">Renovações</option>
        </Select>
        <Select
          value={personType}
          onChange={(e) => setPersonType(e.target.value)}
        >
          <option value="all">Todos os tipos</option>
          <option value="pf">Pessoa Física</option>
          <option value="pj">Pessoa Jurídica</option>
        </Select>
      </div>

      {/* Cards organizados em linha com 5 colunas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Aprovados"
          value={filteredOrders.filter((o) => o.status === 'approved').length}
          amount={
            filteredOrders.filter((o) => o.status === 'approved').length * 1500
          }
          description="Atendimentos Aprovados"
          icon={CheckCircle}
          trend={{ value: 12, isPositive: true }}
          onClick={() => handleCardClick('approved')}
        />
        <StatsCard
          title="Aguardando"
          value={filteredOrders.filter((o) => o.status === 'pending').length}
          amount={
            filteredOrders.filter((o) => o.status === 'pending').length * 1200
          }
          description="Aguardando Aprovação"
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          onClick={() => handleCardClick('pending')}
        />
        <StatsCard
          title="Rejeitados"
          value={filteredOrders.filter((o) => o.status === 'rejected').length}
          amount={
            filteredOrders.filter((o) => o.status === 'rejected').length * 800
          }
          description="Atendimentos Rejeitados"
          icon={XCircle}
          trend={{ value: 0, isPositive: true }}
          onClick={() => handleCardClick('rejected')}
        />
        <StatsCard
          title="Vistorias"
          value={filteredOrders.filter((o) => o.status === 'inspection').length}
          amount={
            filteredOrders.filter((o) => o.status === 'inspection').length *
            1000
          }
          description="Vistorias Pendentes"
          icon={Search}
          trend={{ value: 2, isPositive: true }}
          onClick={() => handleCardClick('inspection')}
        />
        <StatsCard
          title="Renovações"
          value={
            filteredOrders.filter((o) => o.clientType === 'renewal').length
          }
          amount={
            filteredOrders.filter((o) => o.clientType === 'renewal').length *
            1300
          }
          description="Clientes Retornando"
          icon={UserPlus}
          trend={{ value: 1, isPositive: true }}
          onClick={() => navigate('/operator/orders?clientType=renewal')}
        />
      </div>

      {/* Gráfico ocupando toda a largura */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">
            Desempenho Semanal
          </h3>
        </CardHeader>
        <CardContent>
          <ChartCard
            title="Atendimentos x Valores"
            type="mixed"
            series={[
              {
                name: 'Atendimentos',
                type: 'column',
                data: atendimentosPorDia,
              },
              {
                name: 'Valores (R$)',
                type: 'line',
                data: valoresPorDia,
              },
            ]}
            categories={diasDaSemana}
          />
        </CardContent>
      </Card>
    </div>
  );
}