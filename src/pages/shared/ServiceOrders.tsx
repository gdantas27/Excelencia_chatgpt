import { useState } from 'react';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import { ServiceOrderForm } from '@/components/service-orders/ServiceOrderForm';
import { KanbanBoard } from '@/components/service-orders/KanbanBoard';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { ServiceOrder } from '@/lib/mock-data';

export function ServiceOrders() {
  const { orders, loading, error, refetch, updateOrder } = useServiceOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredOrders = orders.filter(
    (order) =>
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderMove = (
    order: ServiceOrder,
    newStatus: ServiceOrder['status']
  ) => {
    updateOrder(order.id, { status: newStatus });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <>
      <PageHeader
        title="Ordens de Serviço"
        description="Gerencie todas as ordens de serviço do sistema"
        action={{
          label: 'Nova O.S.',
          onClick: () => setIsFormOpen(true),
        }}
      />

      <FilterBar
        searchPlaceholder="Buscar ordens de serviço..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {filteredOrders.length === 0 ? (
        <EmptyState
          title="Nenhuma ordem de serviço encontrada"
          description="Comece criando uma nova ordem de serviço."
          action={{
            label: 'Criar O.S.',
            onClick: () => setIsFormOpen(true),
          }}
        />
      ) : (
        <KanbanBoard orders={filteredOrders} onOrderMove={handleOrderMove} />
      )}

      <ServiceOrderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}
