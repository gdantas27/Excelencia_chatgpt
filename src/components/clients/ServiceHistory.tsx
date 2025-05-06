import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Download,
  FileText,
  Filter,
  User,
  Calendar,
  ArrowUpDown,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

interface ServiceHistoryProps {
  clientId: string;
}

interface Service {
  id: string;
  date: Date;
  type: string;
  technician: string;
  salesperson: string;
  status: 'pending' | 'completed' | 'cancelled';
  documents: {
    type: 'order' | 'proposal' | 'certificate';
    url: string;
  }[];
  isRecurring: boolean;
  rating?: number;
}

const mockServices: Service[] = [
  {
    id: '1',
    date: new Date('2024-03-15 14:30'),
    type: 'Manutenção Preventiva',
    technician: 'João Silva',
    salesperson: 'Maria Santos',
    status: 'completed',
    documents: [
      { type: 'order', url: '#' },
      { type: 'certificate', url: '#' },
    ],
    isRecurring: true,
    rating: 5,
  },
  // Add more mock data as needed
];

const statusConfig = {
  pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
  completed: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
};

export function ServiceHistory({ clientId }: ServiceHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [technicianFilter, setTechnicianFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate client classification
  const calculateClassification = (services: Service[]) => {
    const lastService = services[0]?.date;
    const monthsSinceLastService = lastService
      ? Math.floor((new Date().getTime() - lastService.getTime()) / (1000 * 60 * 60 * 24 * 30))
      : 0;

    if (monthsSinceLastService <= 3) return 'Ativo';
    if (monthsSinceLastService <= 6) return 'Regular';
    return 'Inativo';
  };

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.technician.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!dateRange.start || new Date(service.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(service.date) <= new Date(dateRange.end));

    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesTechnician =
      technicianFilter === 'all' || service.technician === technicianFilter;
    const matchesType =
      serviceTypeFilter === 'all' || service.type === serviceTypeFilter;

    return (
      matchesSearch &&
      matchesDateRange &&
      matchesStatus &&
      matchesTechnician &&
      matchesType
    );
  });

  const recentServices = filteredServices.slice(0, 5);
  const classification = calculateClassification(mockServices);

  return (
    <div className="space-y-6">
      {/* Quick View */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Serviços Recentes</h3>
            <p className="text-sm text-gray-500">Últimos 5 atendimentos</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 rounded-lg">
              <Clock className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary">
                Cliente {classification}
              </span>
            </div>
            <button
              onClick={() => setCurrentPage(1)}
              className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-primary/80"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-brand-primary/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <FileText className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{service.type}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        {service.date.toLocaleDateString()}
                      </span>
                      <Badge className={statusConfig[service.status].className}>
                        {statusConfig[service.status].label}
                      </Badge>
                      {service.isRecurring && (
                        <Badge variant="outline">Recorrente</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {service.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {service.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Histórico Completo</h3>
            <button
              onClick={() => {
                // Export logic here
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
              />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="pending">Pendente</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </Select>
              <Select
                value={technicianFilter}
                onChange={(e) => setTechnicianFilter(e.target.value)}
              >
                <option value="all">Todos os técnicos</option>
                {/* Add technician options */}
              </Select>
              <Select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
              >
                <option value="all">Todos os tipos</option>
                {/* Add service type options */}
              </Select>
            </div>
          </div>

          {/* Table */}
          <DataTable
            data={filteredServices}
            columns={[
              {
                key: 'date',
                header: 'Data',
                render: (service) => (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{service.date.toLocaleDateString()}</span>
                  </div>
                ),
              },
              {
                key: 'type',
                header: 'Tipo de Serviço',
                render: (service) => (
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>{service.type}</span>
                  </div>
                ),
              },
              {
                key: 'technician',
                header: 'Técnico',
                render: (service) => (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{service.technician}</span>
                  </div>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (service) => (
                  <Badge className={statusConfig[service.status].className}>
                    {statusConfig[service.status].label}
                  </Badge>
                ),
              },
              {
                key: 'actions',
                header: '',
                render: (service) => (
                  <div className="flex justify-end gap-2">
                    {service.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}