import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Proposal {
  id: string;
  title: string;
  description: string;
  value: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  expiresAt: Date;
  technician: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Manutenção Preventiva',
    description: 'Serviço de manutenção preventiva do sistema hidráulico',
    value: 1500,
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    expiresAt: new Date('2024-04-15'),
    technician: 'Pedro Santos',
    items: [
      {
        description: 'Vistoria completa',
        quantity: 1,
        unitPrice: 500,
      },
      {
        description: 'Limpeza do sistema',
        quantity: 1,
        unitPrice: 1000,
      },
    ],
  },
  {
    id: '2',
    title: 'Instalação de Hidrômetro',
    description: 'Instalação de novo hidrômetro com medição digital',
    value: 2800,
    status: 'accepted',
    createdAt: new Date('2024-03-10'),
    expiresAt: new Date('2024-04-10'),
    technician: 'Maria Oliveira',
    items: [
      {
        description: 'Hidrômetro Digital',
        quantity: 1,
        unitPrice: 2000,
      },
      {
        description: 'Serviço de Instalação',
        quantity: 1,
        unitPrice: 800,
      },
    ],
  },
];

const statusConfig = {
  pending: {
    label: 'Aguardando',
    Icon: Clock,
    className: 'bg-yellow-100 text-yellow-800',
  },
  accepted: {
    label: 'Aceito',
    Icon: CheckCircle,
    className: 'bg-green-100 text-green-800',
  },
  rejected: {
    label: 'Rejeitado',
    Icon: XCircle,
    className: 'bg-red-100 text-red-800',
  },
};

export function CustomerProposals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Proposal['status']>('all');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const filteredProposals = mockProposals.filter((proposal) => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orçamentos</h1>
        <Button className="flex items-center gap-2">
          <FileText size={18} />
          Solicitar Orçamento
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar orçamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="w-48"
        >
          <option value="all">Todos os status</option>
          <option value="pending">Aguardando</option>
          <option value="accepted">Aceitos</option>
          <option value="rejected">Rejeitados</option>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredProposals.map((proposal) => {
          const { Icon } = statusConfig[proposal.status];
          return (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedProposal(proposal)}
              className="cursor-pointer"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-brand-primary/10">
                        <FileText className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{proposal.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {proposal.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusConfig[proposal.status].className}>
                        <Icon className="w-4 h-4 mr-1" />
                        {statusConfig[proposal.status].label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{proposal.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>Técnico: {proposal.technician}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>Valor: R$ {proposal.value.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>

                    {proposal.status === 'pending' && (
                      <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-yellow-800">
                          Este orçamento vence em{' '}
                          {proposal.expiresAt.toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {proposal.status === 'pending' && (
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" className="text-red-600 hover:bg-red-50">
                          Recusar
                        </Button>
                        <Button>Aceitar Orçamento</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}