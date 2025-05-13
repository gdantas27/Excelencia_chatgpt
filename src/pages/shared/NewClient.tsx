import { ClientRegistrationForm } from '@/components/clients/ClientRegistrationForm';
import { PageHeader } from '@/components/dashboard/PageHeader';

export function NewClient() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Novo Cliente"
        description="Cadastre um novo cliente no sistema"
      />
      <ClientRegistrationForm />
    </div>
  );
}