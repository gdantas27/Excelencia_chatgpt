import { UserRole } from '@/stores/auth';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'residential' | 'commercial';
  address: string;
  city: string;
  state: string;
  createdAt: Date;
}

export interface ServiceOrder {
  id: string;
  clientName: string;
  address: string;
  type: string;
  status: 'approved' | 'pending' | 'rejected' | 'inspection';
  createdAt: Date;
  scheduledFor: Date;
  clientType: 'new' | 'renewal';
  personType: 'pf' | 'pj';
  rating?: number;
  budgetId?: string;
  value: number;
  description?: string;
  technician?: string;
}

export interface Budget {
  id: string;
  clientName: string;
  clientId: string;
  serviceType: string;
  description: string;
  value: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  validUntil: Date;
  technician: string;
  comments?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  createdAt: Date;
  author: string;
  comments: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
  createdAt: Date;
}

// Mock data for budgets
export const mockBudgets: Budget[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientId: '1',
    serviceType: 'Manutenção Preventiva',
    description: 'Manutenção preventiva do sistema hidráulico',
    value: 1500.00,
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    validUntil: new Date('2024-04-15'),
    technician: 'Pedro Santos',
  },
  {
    id: '2',
    clientName: 'Empresa ABC',
    clientId: '2',
    serviceType: 'Instalação',
    description: 'Instalação de novo sistema',
    value: 2800.00,
    status: 'approved',
    createdAt: new Date('2024-03-10'),
    validUntil: new Date('2024-04-10'),
    technician: 'Maria Oliveira',
  },
];

// Generate more realistic mock data
export const mockServiceOrders: ServiceOrder[] = [
  {
    id: '1',
    clientName: 'João Silva',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    type: 'Manutenção Preventiva',
    status: 'approved',
    createdAt: new Date('2024-03-10'),
    scheduledFor: new Date('2024-03-15'),
    clientType: 'renewal',
    personType: 'pf',
    rating: 4,
    value: 1500,
    technician: 'Pedro Santos',
  },
  {
    id: '2',
    clientName: 'Empresa ABC',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    type: 'Instalação de Hidrômetro',
    status: 'pending',
    createdAt: new Date('2024-03-11'),
    scheduledFor: new Date('2024-03-16'),
    clientType: 'new',
    personType: 'pj',
    value: 2800,
    technician: 'Maria Oliveira',
  },
  {
    id: '3',
    clientName: 'Maria Santos',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    type: 'Vistoria Técnica',
    status: 'inspection',
    createdAt: new Date('2024-03-12'),
    scheduledFor: new Date('2024-03-17'),
    clientType: 'renewal',
    personType: 'pf',
    value: 800,
  },
  {
    id: '4',
    clientName: 'Condomínio Central',
    address: 'Av. Brasil, 789 - São Paulo, SP',
    type: 'Reparo de Vazamento',
    status: 'approved',
    createdAt: new Date('2024-03-13'),
    scheduledFor: new Date('2024-03-18'),
    clientType: 'new',
    personType: 'pj',
    value: 3500,
  },
  {
    id: '5',
    clientName: 'Pedro Oliveira',
    address: 'Rua dos Pinheiros, 456 - São Paulo, SP',
    type: 'Desobstrução de Rede',
    status: 'rejected',
    createdAt: new Date('2024-03-14'),
    scheduledFor: new Date('2024-03-19'),
    clientType: 'new',
    personType: 'pf',
    rating: 2,
    value: 1200,
  },
  {
    id: '6',
    clientName: 'Restaurante Sabor',
    address: 'Rua da Consolação, 234 - São Paulo, SP',
    type: 'Limpeza de Fossa',
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    scheduledFor: new Date('2024-03-20'),
    clientType: 'renewal',
    personType: 'pj',
    value: 2000,
  },
  {
    id: '7',
    clientName: 'João Silva',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    type: 'Manutenção Preventiva',
    status: 'approved',
    createdAt: new Date('2024-03-10'),
    scheduledFor: new Date('2024-03-15'),
    clientType: 'renewal',
    personType: 'pf',
    value: 1500,
  },
  {
    id: '8',
    clientName: 'Empresa ABC',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    type: 'Instalação de Hidrômetro',
    status: 'pending',
    createdAt: new Date('2024-03-11'),
    scheduledFor: new Date('2024-03-16'),
    clientType: 'new',
    personType: 'pj',
    value: 2800,
  },
  {
    id: '9',
    clientName: 'Maria Santos',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    type: 'Vistoria Técnica',
    status: 'inspection',
    createdAt: new Date('2024-03-12'),
    scheduledFor: new Date('2024-03-17'),
    clientType: 'renewal',
    personType: 'pf',
    rating: 1,
    value: 800,
  },
  {
    id: '10',
    clientName: 'Condomínio Central',
    address: 'Av. Brasil, 789 - São Paulo, SP',
    type: 'Reparo de Vazamento',
    status: 'approved',
    createdAt: new Date('2024-03-13'),
    scheduledFor: new Date('2024-03-18'),
    clientType: 'new',
    personType: 'pj',
    rating: 4,
    value: 3500,
  },
  {
    id: '11',
    clientName: 'Pedro Oliveira',
    address: 'Rua dos Pinheiros, 456 - São Paulo, SP',
    type: 'Desobstrução de Rede',
    status: 'rejected',
    createdAt: new Date('2024-03-14'),
    scheduledFor: new Date('2024-03-19'),
    clientType: 'new',
    personType: 'pf',
    rating: 2,
    value: 1200,
  },
  {
    id: '12',
    clientName: 'Restaurante Sabor',
    address: 'Rua da Consolação, 234 - São Paulo, SP',
    type: 'Limpeza de Fossa',
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    scheduledFor: new Date('2024-03-20'),
    clientType: 'renewal',
    personType: 'pj',
    value: 2000,
  },
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    type: 'residential',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Empresa ABC',
    email: 'contato@abc.com',
    phone: '(11) 98888-8888',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    type: 'commercial',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 97777-7777',
    address: 'Rua Augusta, 500',
    city: 'São Paulo',
    state: 'SP',
    type: 'residential',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '4',
    name: 'Condomínio Central',
    email: 'adm@condominiocentral.com',
    phone: '(11) 96666-6666',
    address: 'Av. Brasil, 789',
    city: 'São Paulo',
    state: 'SP',
    type: 'commercial',
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '5',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '(11) 95555-5555',
    address: 'Rua dos Pinheiros, 456',
    city: 'São Paulo',
    state: 'SP',
    type: 'residential',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '6',
    name: 'Restaurante Sabor',
    email: 'contato@restaurantesabor.com',
    phone: '(11) 94444-4444',
    address: 'Rua da Consolação, 234',
    city: 'São Paulo',
    state: 'SP',
    type: 'commercial',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '10',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    type: 'residential',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '20',
    name: 'Empresa ABC',
    email: 'contato@abc.com',
    phone: '(11) 98888-8888',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    type: 'commercial',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '30',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 97777-7777',
    address: 'Rua Augusta, 500',
    city: 'São Paulo',
    state: 'SP',
    type: 'residential',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '40',
    name: 'Condomínio Central',
    email: 'adm@condominiocentral.com',
    phone: '(11) 96666-6666',
    address: 'Av. Brasil, 789',
    city: 'São Paulo',
    state: 'SP',
    type: 'commercial',
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '50',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '(11) 95555-5555',
    address: 'Rua dos Pinheiros, 456',
    city: 'São Paulo',
    state: 'SP',
    type: 'residential',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '6',
    name: 'Restaurante Sabor',
    email: 'contato@restaurantesabor.com',
    phone: '(11) 94444-4444',
    address: 'Rua da Consolação, 234',
    city: 'São Paulo',
    state: 'SP',
    type: 'commercial',
    createdAt: new Date('2024-03-15'),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Manutenção Programada',
    message:
      'Informamos que haverá manutenção programada no sistema no dia 20/03/2024, das 22h às 00h.',
    type: 'info',
    createdAt: new Date('2024-03-10'),
    author: 'Sistema',
    comments: 2,
  },
  {
    id: '2',
    title: 'Atenção: Novo Procedimento',
    message:
      'A partir de hoje, todas as vistorias devem seguir o novo protocolo de segurança.',
    type: 'warning',
    createdAt: new Date('2024-03-11'),
    author: 'Coordenação',
    comments: 5,
  },
  {
    id: '3',
    title: 'Atualização do Sistema',
    message:
      'Nova versão do sistema disponível com melhorias na interface e correções.',
    type: 'success',
    createdAt: new Date('2024-03-12'),
    author: 'TI',
    comments: 0,
  },
  {
    id: '4',
    title: 'Treinamento Obrigatório',
    message:
      'Todos os operadores devem participar do treinamento de segurança na próxima semana.',
    type: 'warning',
    createdAt: new Date('2024-03-13'),
    author: 'RH',
    comments: 8,
  },
  {
    id: '5',
    title: 'Recorde de Atendimentos',
    message:
      'Parabéns a todos! Batemos o recorde de atendimentos no mês de fevereiro.',
    type: 'success',
    createdAt: new Date('2024-03-14'),
    author: 'Diretoria',
    comments: 12,
  },
  {
    id: '6',
    title: 'Novos Equipamentos',
    message:
      'Chegaram os novos equipamentos de medição. Retirar no almoxarifado.',
    type: 'info',
    createdAt: new Date('2024-03-15'),
    author: 'Suprimentos',
    comments: 3,
  },
  {
    id: '10',
    title: 'Manutenção Programada',
    message:
      'Informamos que haverá manutenção programada no sistema no dia 20/03/2024, das 22h às 00h.',
    type: 'info',
    createdAt: new Date('2024-03-10'),
    author: 'Sistema',
    comments: 2,
  },
  {
    id: '20',
    title: 'Atenção: Novo Procedimento',
    message:
      'A partir de hoje, todas as vistorias devem seguir o novo protocolo de segurança.',
    type: 'warning',
    createdAt: new Date('2024-03-11'),
    author: 'Coordenação',
    comments: 5,
  },
  {
    id: '30',
    title: 'Atualização do Sistema',
    message:
      'Nova versão do sistema disponível com melhorias na interface e correções.',
    type: 'success',
    createdAt: new Date('2024-03-12'),
    author: 'TI',
    comments: 0,
  },
  {
    id: '40',
    title: 'Treinamento Obrigatório',
    message:
      'Todos os operadores devem participar do treinamento de segurança na próxima semana.',
    type: 'warning',
    createdAt: new Date('2024-03-13'),
    author: 'RH',
    comments: 8,
  },
  {
    id: '50',
    title: 'Recorde de Atendimentos',
    message:
      'Parabéns a todos! Batemos o recorde de atendimentos no mês de fevereiro.',
    type: 'success',
    createdAt: new Date('2024-03-14'),
    author: 'Diretoria',
    comments: 12,
  },
  {
    id: '60',
    title: 'Novos Equipamentos',
    message:
      'Chegaram os novos equipamentos de medição. Retirar no almoxarifado.',
    type: 'info',
    createdAt: new Date('2024-03-15'),
    author: 'Suprimentos',
    comments: 3,
  },
];