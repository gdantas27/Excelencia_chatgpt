import { useState } from 'react';
import { useClients } from '@/hooks/useClients';
import { ClientCard } from '@/components/clients/ClientCard';
import { ClientRegistrationForm } from '@/components/clients/ClientRegistrationForm';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { DataGrid } from '@/components/dashboard/DataGrid';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { mockServiceOrders } from '@/lib/mock-data';
import { useNavigate } from 'react-router-dom';

export function Clients() {
  const { clients, loading, error, refetch } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<
    'all' | 'residential' | 'commercial'
  >('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const navigate = useNavigate();

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || client.type === typeFilter;

    const clientOrders = mockServiceOrders.filter(
      (order) => order.clientName === client.name
    );

    const avgRating =
      clientOrders.length > 0
        ? clientOrders.reduce((sum, o) => sum + (o.rating || 0), 0) /
          clientOrders.length
        : 0;

    const matchesRating = avgRating >= ratingFilter;

    return matchesSearch && matchesType && matchesRating;
  });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Gerencie seus clientes residenciais e comerciais"
        action={{
          label: 'Novo Cliente',
          onClick: () => navigate('/operator/clients/new'),
        }}
      />

      <FilterBar
        searchPlaceholder="Buscar clientes..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            value: typeFilter,
            onChange: (value) => setTypeFilter(value as typeof typeFilter),
            options: [
              { value: 'all', label: 'Todos os tipos' },
              { value: 'residential', label: 'Residencial' },
              { value: 'commercial', label: 'Comercial' },
            ],
          },
          {
            value: String(ratingFilter),
            onChange: (value) => setRatingFilter(Number(value)),
            options: [
              { value: '0', label: 'Todas as avaliações' },
              { value: '1', label: '⭐' },
              { value: '2', label: '⭐⭐' },
              { value: '3', label: '⭐⭐⭐' },
              { value: '4', label: '⭐⭐⭐⭐' },
              { value: '5', label: '⭐⭐⭐⭐⭐' },
            ],
          },
        ]}
      />

      {filteredClients.length === 0 ? (
        <EmptyState
          title="Nenhum cliente encontrado"
          description="Comece adicionando um novo cliente ao sistema."
          action={{
            label: 'Adicionar Cliente',
            onClick: () => navigate('/operator/clients/new'),
          }}
        />
      ) : (
        <DataGrid
          data={filteredClients}
          renderItem={(client) => (
            <ClientCard key={client.id} client={client} />
          )}
          itemsPerPage={6}
        />
      )}
    </>
  );
}