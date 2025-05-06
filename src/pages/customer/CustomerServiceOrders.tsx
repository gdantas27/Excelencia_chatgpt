import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Camera,
  MessageSquare,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PDFViewer } from '@/components/ui/PDFViewer';

interface ServiceOrder {
  id: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  scheduledFor: Date;
  technician: string;
  location: string;
  checklist?: {
    item: string;
    completed: boolean;
  }[];
  photos?: string[];
  notes?: string;
  documents?: {
    type: string;
    url: string;
  }[];
}

const mockServiceOrders: ServiceOrder[] = [
  {
    id: 'OS-001',
    type: 'Manutenção Preventiva',
    status: 'in_progress',
    description: 'Manutenção preventiva do sistema hidráulico',
    scheduledFor: new Date('2024-04-20'),
    technician: 'Pedro Santos',
    location: 'Rua das Flores, 123',
    checklist: [
      { item: 'Inspeção visual', completed: true },
      { item: 'Teste de pressão', completed: false },
      { item: 'Limpeza do sistema', completed: false },
    ],
    photos: [
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=200',
    ],
    notes: 'Serviço em andamento conforme cronograma',
    documents: [
      { type: 'Ordem de Serviço', url: '#' },
      { type: 'Relatório Parcial', url: '#' },
    ],
  },
  {
    id: 'OS-002',
    type: 'Vistoria Técnica',
    status: 'completed',
    description: 'Vistoria técnica para certificação',
    scheduledFor: new Date('2024-03-15'),
    technician: 'Maria Oliveira',
    location: 'Av. Paulista, 1000',
    checklist: [
      { item: 'Verificação de conformidade', completed: true },
      { item: 'Medições técnicas', completed: true },
      { item: 'Registro fotográfico', completed: true },
    ],
    photos: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=200',
    ],
    notes: 'Vistoria concluída com sucesso',
    documents: [
      { type: 'Certificado', url: '#' },
      { type: 'Relatório Final', url: '#' },
    ],
  },
];

const statusConfig = {
  pending: {
    label: 'Aguardando',
    className: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
  },
  in_progress: {
    label: 'Em Andamento',
    className: 'bg-blue-100 text-blue-800',
    icon: AlertTriangle,
  },
  completed: {
    label: 'Concluído',
    className: 'bg-green-100 text-green-800',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800',
    icon: XCircle,
  },
};

export function CustomerServiceOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ServiceOrder['status']>('all');
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const filteredOrders = mockServiceOrders.filter((order) => {
    const matchesSearch = order.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Ordens de Serviço</h1>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar ordens de serviço..."
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
          <option value="in_progress">Em Andamento</option>
          <option value="completed">Concluídos</option>
          <option value="cancelled">Cancelados</option>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status].icon;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedOrder(order)}
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
                        <h3 className="font-semibold text-gray-900">
                          {order.type} - {order.id}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {order.scheduledFor.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={statusConfig[order.status].className}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{order.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>Técnico: {order.technician}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{order.location}</span>
                      </div>
                    </div>

                    {order.checklist && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Checklist
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {order.checklist.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${
                                  item.completed
                                    ? 'text-green-500'
                                    : 'text-gray-300'
                                }`}
                              />
                              <span
                                className={
                                  item.completed
                                    ? 'text-gray-800'
                                    : 'text-gray-500'
                                }
                              >
                                {item.item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.photos && order.photos.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Fotos
                        </h4>
                        <div className="flex gap-2">
                          {order.photos.map((photo, index) => (
                            <div
                              key={index}
                              className="relative w-20 h-20 rounded-lg overflow-hidden"
                            >
                              <img
                                src={photo}
                                alt={`Foto ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                                <Camera className="w-5 h-5 text-white opacity-0 hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.documents && order.documents.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Documentos
                        </h4>
                        <div className="flex gap-2">
                          {order.documents.map((doc, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowPDFViewer(true);
                              }}
                              className="flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              {doc.type}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.notes && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Observações
                        </h4>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                          <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* PDF Viewer Modal */}
      {showPDFViewer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh]">
            <PDFViewer
              url="#"
              title="Documento"
              onDownload={() => {
                // Handle download
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}