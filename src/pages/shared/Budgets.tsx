import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { DataGrid } from '@/components/dashboard/DataGrid';
import { BudgetCard } from '@/components/budgets/BudgetCard';
import { BudgetForm } from '@/components/budgets/BudgetForm';
import { BudgetApprovalModal } from '@/components/budgets/BudgetApprovalModal';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { NotificationContainer } from '@/components/notifications/NotificationContainer';
import { useNotificationStore } from '@/stores/notifications';

const mockBudgets = [
  {
    id: '1',
    clientName: 'João Silva',
    serviceType: 'Manutenção Preventiva',
    value: 1500.00,
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    validUntil: new Date('2024-04-15'),
    technician: 'Pedro Santos',
  },
  {
    id: '2',
    clientName: 'Empresa ABC',
    serviceType: 'Instalação',
    value: 2800.00,
    status: 'approved',
    createdAt: new Date('2024-03-10'),
    validUntil: new Date('2024-04-10'),
    technician: 'Maria Oliveira',
  },
] as const;

export function Budgets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<typeof mockBudgets[0] | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotificationStore();

  const filteredBudgets = mockBudgets.filter(budget => {
    const matchesSearch = budget.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || budget.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (comments: string) => {
    addNotification({
      type: 'success',
      message: `Orçamento aprovado com sucesso para ${selectedBudget?.clientName}`,
      duration: 5000,
    });
    // Here you would update the budget status and create a service order
  };

  const handleReject = (reason: string) => {
    addNotification({
      type: 'info',
      message: `Orçamento rejeitado para ${selectedBudget?.clientName}`,
      duration: 5000,
    });
    // Here you would update the budget status and send notifications
  };

  return (
    <>
      <PageHeader
        title="Orçamentos"
        description="Gerencie os orçamentos do sistema"
        action={{
          label: 'Novo Orçamento',
          onClick: () => setIsFormOpen(true),
        }}
      />

      <FilterBar
        searchPlaceholder="Buscar orçamentos..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            value: statusFilter,
            onChange: (value) => setStatusFilter(value),
            options: [
              { value: 'all', label: 'Todos os status' },
              { value: 'pending', label: 'Aguardando' },
              { value: 'approved', label: 'Aprovados' },
              { value: 'rejected', label: 'Rejeitados' },
            ],
          },
        ]}
      />

      {filteredBudgets.length === 0 ? (
        <EmptyState
          title="Nenhum orçamento encontrado"
          description="Comece criando um novo orçamento."
          action={{
            label: 'Criar Orçamento',
            onClick: () => setIsFormOpen(true),
          }}
        />
      ) : (
        <DataGrid
          data={filteredBudgets}
          renderItem={(budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onApprove={() => {
                setSelectedBudget(budget);
                setIsApprovalModalOpen(true);
              }}
              onReject={() => {
                setSelectedBudget(budget);
                setIsApprovalModalOpen(true);
              }}
            />
          )}
          itemsPerPage={6}
        />
      )}

      <BudgetForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {selectedBudget && (
        <BudgetApprovalModal
          isOpen={isApprovalModalOpen}
          onClose={() => {
            setIsApprovalModalOpen(false);
            setSelectedBudget(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject}
          budget={selectedBudget}
        />
      )}

      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </>
  );
}