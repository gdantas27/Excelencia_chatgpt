import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Download,
  MessageSquare,
  Search,
  AlertTriangle,
  ChevronRight,
  Plus,
  BarChart,
  PieChart,
  FileCheck,
  ClipboardCheck,
  Camera,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Button } from '@/components/ui/Button';
import { RequestModal } from '@/components/customer/RequestModal';
import Chart from 'react-apexcharts';

// Mock data for demonstration
const customerData = {
  id: 'CLI123456',
  name: 'João Silva',
  document: '123.456.789-00',
  type: 'residential',
  contract: {
    number: 'CTR-2024-001',
    validUntil: '2025-12-31',
    status: 'active',
    progress: 45,
    totalOrders: 20,
    completedOrders: 12,
    pendingOrders: 8,
  },
  stats: {
    completedOrders: 12,
    pendingOrders: 3,
    totalValue: 15000,
  },
};

const notifications = [
  {
    id: '1',
    type: 'warning',
    title: 'Certificado próximo do vencimento',
    message: 'Seu certificado vence em 15 dias. Agende uma vistoria.',
    date: new Date(),
  },
  {
    id: '2',
    type: 'success',
    title: 'Orçamento aprovado',
    message: 'Seu orçamento #1234 foi aprovado e convertido em O.S.',
    date: new Date(),
  },
];

const serviceHistory = [
  {
    id: '1',
    date: new Date('2024-03-15'),
    type: 'Manutenção Preventiva',
    technician: 'Pedro Santos',
    status: 'completed',
    checklist: [
      { item: 'Inspeção visual', completed: true },
      { item: 'Limpeza do sistema', completed: true },
      { item: 'Teste de pressão', completed: true },
    ],
    photos: [
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=200',
    ],
    notes: 'Serviço realizado conforme planejado. Sistema funcionando normalmente.',
  },
  {
    id: '2',
    date: new Date('2024-02-20'),
    type: 'Vistoria Técnica',
    technician: 'Maria Oliveira',
    status: 'completed',
    checklist: [
      { item: 'Verificação de vazamentos', completed: true },
      { item: 'Medição de pressão', completed: true },
      { item: 'Análise de qualidade', completed: true },
    ],
    photos: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=200',
    ],
    notes: 'Vistoria concluída com sucesso. Recomendação de manutenção preventiva em 6 meses.',
  },
];

const documents = {
  client: [
    {
      id: '1',
      name: 'Certificado de Conformidade 2024',
      type: 'certificate',
      date: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Relatório de Vistoria #1234',
      type: 'report',
      date: new Date('2024-02-20'),
    },
  ],
  company: [
    {
      id: '1',
      name: 'Manual de Boas Práticas',
      type: 'manual',
      date: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'Catálogo de Serviços',
      type: 'catalog',
      date: new Date('2024-01-01'),
    },
  ],
};

export function CustomerDashboard() {
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Chart configuration for contract execution
  const contractChart = {
    series: [customerData.contract.completedOrders, customerData.contract.pendingOrders],
    options: {
      chart: {
        type: 'pie',
        height: 250,
      },
      labels: ['Concluídas', 'Pendentes'],
      colors: ['#009688', '#FFB74D'],
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-brand-primary/10">
                {customerData.type === 'residential' ? (
                  <User className="w-8 h-8 text-brand-primary" />
                ) : (
                  <Building2 className="w-8 h-8 text-brand-primary" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {customerData.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">
                    {customerData.type === 'residential' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                  </Badge>
                  <Badge variant="secondary">
                    CPF/CNPJ: {customerData.document}
                  </Badge>
                  <Badge variant="secondary">
                    Código: {customerData.id}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Button
                onClick={() => setShowNewRequestModal(true)}
                className="flex items-center gap-2"
              >
                <Plus size={18} />
                Nova Solicitação
              </Button>
            </div>
          </div>

          {/* Contract Progress */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Contrato {customerData.contract.number}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Válido até{' '}
                      {new Date(customerData.contract.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    className={
                      customerData.contract.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {customerData.contract.status === 'active'
                      ? 'Ativo'
                      : 'Pendente'}
                  </Badge>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-primary"
                        style={{
                          width: `${customerData.contract.progress}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-gray-500">Início</span>
                      <span className="text-gray-500">Término</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-primary">
                      {customerData.contract.progress}%
                    </div>
                    <p className="text-sm text-gray-500">Executado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">O.S. Concluídas</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {customerData.stats.completedOrders}
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">O.S. Pendentes</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {customerData.stats.pendingOrders}
                      </span>
                      <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Valor Total</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        R$ {customerData.stats.totalValue.toLocaleString('pt-BR')}
                      </span>
                      <BarChart className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contract Execution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">
              Execução do Contrato
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Chart
                options={contractChart.options}
                series={contractChart.series}
                type="pie"
                height={250}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total de O.S.</p>
                <p className="text-2xl font-bold text-gray-800">
                  {customerData.contract.totalOrders}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Próxima Prevista</p>
                <p className="text-lg font-medium text-gray-800">
                  20/04/2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Documentos
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText size={18} />
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Meus Documentos
                </h3>
                <div className="space-y-2">
                  {documents.client.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-brand-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doc.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400 hover:text-brand-primary cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Documentos da Excelência
                </h3>
                <div className="space-y-2">
                  {documents.company.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-brand-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doc.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400 hover:text-brand-primary cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service History */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Histórico de Serviços
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {serviceHistory.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-brand-primary/10">
                      <ClipboardCheck className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {service.type}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {service.date.toLocaleDateString()} - {service.technician}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      service.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {service.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Checklist */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Checklist
                    </h4>
                    <div className="space-y-2">
                      {service.checklist.map((item, index) => (
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

                  {/* Photos */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Fotos
                    </h4>
                    <div className="flex gap-2">
                      {service.photos.map((photo, index) => (
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

                  {/* Notes */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Observações
                    </h4>
                    <p className="text-sm text-gray-600">{service.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Notificações
          </h2>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    notification.type === 'warning'
                      ? 'bg-yellow-50 text-yellow-800'
                      : notification.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {notification.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Bell className="w-5 h-5" />
                    )}
                    <h4 className="font-medium">{notification.title}</h4>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                  <div className="mt-2 text-xs opacity-75">
                    {notification.date.toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <RequestModal 
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
      />
    </div>
  );
}