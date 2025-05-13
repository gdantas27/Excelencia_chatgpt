// src/pages/customer/CustomerServiceOrders.tsx
import { useState, useEffect } from 'react';
import {
  Calendar,
  ClipboardCheck,
  User,
  FileText,
  CheckCircle,
  Upload,
  X,
  Eye,
  Plus,
  File,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { motion } from 'framer-motion';

interface ChecklistItem {
  item: string;
  completed: boolean;
}

// Adicione ao seu CustomerServiceOrders.tsx

interface Message {
  from: 'cliente' | 'equipe';
  content: string;
  timestamp: Date;
}

interface ServiceOrder {
  id: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed';
  description: string;
  scheduledFor: Date;
  technician: string;
  location: string;
  checklist: ChecklistItem[];
  notes: string;
  documents: string[];
  history: { date: string; description: string }[];
  messages: Message[]; // NOVO CAMPO
  rating?: number;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    className: 'bg-yellow-100 text-yellow-800',
  },
  in_progress: {
    label: 'Em andamento',
    className: 'bg-blue-100 text-blue-800',
  },
  completed: {
    label: 'Concluída',
    className: 'bg-green-100 text-green-800',
  },
};

// MOCK embutido
const mockOrders: ServiceOrder[] = [
  {
    id: 'OS-001',
    type: 'Instalação de hidrômetro',
    status: 'pending',
    description: 'Instalação completa com equipamentos digitais',
    scheduledFor: new Date('2024-06-15'),
    technician: 'Pedro Lima',
    location: 'Rua das Águas, 100 - Recife/PE',
    checklist: [
      { item: 'Checagem do local', completed: false },
      { item: 'Instalação do equipamento', completed: false },
    ],
    notes: '',
    documents: [],
    history: [
      { date: '2024-06-01', description: 'Ordem criada' },
      { date: '2024-06-03', description: 'Técnico designado: Pedro Lima' },
      { date: '2024-06-10', description: 'Checklist iniciado' },
    ],
    messages: [
      {
        from: 'cliente',
        content: 'Olá, gostaria de saber se o técnico virá pela manhã.',
        timestamp: new Date('2024-06-10T09:00:00'),
      },
      {
        from: 'equipe',
        content: 'Bom dia! Sim, a visita está marcada para 9h.',
        timestamp: new Date('2024-06-10T09:15:00'),
      },
    ],
  },
  {
    id: 'OS-002',
    type: 'Manutenção preventiva',
    status: 'in_progress',
    description: 'Vistoria e limpeza do sistema hidráulico',
    scheduledFor: new Date('2024-06-12'),
    technician: 'Maria Souza',
    location: 'Av. Atlântica, 1234 - Salvador/BA',
    checklist: [
      { item: 'Inspeção visual', completed: true },
      { item: 'Limpeza de válvulas', completed: false },
    ],
    notes: '',
    documents: [],
    history: [
      { date: '2024-06-01', description: 'Ordem criada' },
      { date: '2024-06-03', description: 'Técnico designado: Pedro Lima' },
      { date: '2024-06-10', description: 'Checklist iniciado' },
    ],
    messages: [
      {
        from: 'cliente',
        content: 'Olá, gostaria de saber se o técnico virá pela manhã.',
        timestamp: new Date('2024-06-10T09:00:00'),
      },
      {
        from: 'equipe',
        content: 'Bom dia! Sim, a visita está marcada para 9h.',
        timestamp: new Date('2024-06-10T09:15:00'),
      },
    ],
  },
  {
    id: 'OS-003',
    type: 'Correção de vazamento',
    status: 'completed',
    description: 'Reparo em tubulação do imóvel',
    scheduledFor: new Date('2024-05-28'),
    technician: 'Carlos Silva',
    location: 'Rua do Sol, 77 - Aracaju/SE',
    checklist: [
      { item: 'Localização do vazamento', completed: true },
      { item: 'Substituição do cano', completed: true },
    ],
    notes: 'Cliente satisfeito com o reparo.',
    documents: ['relatorio_vazamento.pdf'],
    history: [
      { date: '2024-06-01', description: 'Ordem criada' },
      { date: '2024-06-03', description: 'Técnico designado: Pedro Lima' },
      { date: '2024-06-10', description: 'Checklist iniciado' },
    ],
    messages: [
      {
        from: 'cliente',
        content: 'Olá, gostaria de saber se o técnico virá pela manhã.',
        timestamp: new Date('2024-06-10T09:00:00'),
      },
      {
        from: 'equipe',
        content: 'Bom dia! Sim, a visita está marcada para 9h.',
        timestamp: new Date('2024-06-10T09:15:00'),
      },
    ],
  },
];

export default function CustomerServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    'all' | ServiceOrder['status']
  >('all');
  const [newNote, setNewNote] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter((order) =>
    statusFilter === 'all' ? true : order.status === statusFilter
  );

  const toggleChecklistItem = (orderId: string, index: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              checklist: order.checklist.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item
              ),
            }
          : order
      )
    );
  };

  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleFileUpload = (orderId: string) => {
    if (!fileInput) return;
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              documents: [...order.documents, fileInput.name],
            }
          : order
      )
    );
    setFileInput(null);
  };

  const markAsCompleted = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    );
  };

  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Ordens de Serviço</h1>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border rounded px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="in_progress">Em Andamento</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <ClipboardCheck className="text-brand-primary w-5 h-5" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {order.type}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.scheduledFor).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusConfig[order.status].className}>
                      {statusConfig[order.status].label}
                    </Badge>
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      {expandedOrders[order.id] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </CardHeader>
              {expandedOrders[order.id] && (
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{order.description}</p>
                  <div className="text-sm text-gray-600 flex gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {order.technician}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {order.location}
                    </span>
                  </div>

                  {/* Histórico da OS */}
                  {order.history?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm text-gray-800 mb-2">
                        Histórico da Ordem
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        {order.history.map((entry, index) => (
                          <li key={index}>
                            <span className="text-gray-500">
                              {new Date(entry.date).toLocaleString()}:
                            </span>{' '}
                            {entry.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Checklist */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">
                      Checklist
                    </h4>
                    <ul className="space-y-2">
                      {order.checklist.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() =>
                              toggleChecklistItem(order.id, index)
                            }
                            className="accent-brand-primary"
                          />
                          <span
                            className={`${
                              item.completed
                                ? 'line-through text-gray-400'
                                : 'text-gray-700'
                            }`}
                          >
                            {item.item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Notas */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">
                      Notas
                    </h4>
                    <Textarea
                      placeholder="Adicione observações..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                  </div>

                  {/* Documentos */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">
                      Documentos
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      {order.documents.map((doc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <File className="w-4 h-4 text-gray-400" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        onChange={(e) =>
                          setFileInput(e.target.files?.[0] || null)
                        }
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleFileUpload(order.id)}
                        disabled={!fileInput}
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Enviar
                      </Button>
                    </div>
                  </div>

                  {/* Conversas */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">
                      Mensagens
                    </h4>
                    <div className="border border-gray-200 rounded p-3 max-h-64 overflow-y-auto space-y-3 bg-gray-50">
                      {order.messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`text-sm p-2 rounded-lg max-w-xs ${
                            msg.from === 'cliente'
                              ? 'bg-blue-100 text-blue-800 self-end ml-auto'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Input
                        placeholder="Escreva sua mensagem..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                      <Button
                        onClick={() => {
                          if (!messageInput.trim()) return;
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.id === order.id
                                ? {
                                    ...o,
                                    messages: [
                                      ...o.messages,
                                      {
                                        from: 'cliente',
                                        content: messageInput,
                                        timestamp: new Date(),
                                      },
                                    ],
                                  }
                                : o
                            )
                          );
                          setMessageInput('');
                        }}
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>

                  {/* Avaliação da OS */}
                  {order.status === 'completed' && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-sm text-gray-800 mb-2">
                        Avalie o serviço
                      </h4>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className={`text-2xl ${
                              (order as any).rating >= star
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            onClick={() =>
                              setOrders((prev) =>
                                prev.map((o) =>
                                  o.id === order.id ? { ...o, rating: star } : o
                                )
                              )
                            }
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                      {(order as any).rating && (
                        <p className="text-sm text-gray-600 mt-2">
                          Você avaliou com {(order as any).rating} estrela(s)
                        </p>
                      )}
                    </div>
                  )}

                  {/* Finalização */}
                  {order.status !== 'completed' && (
                    <div className="pt-4 flex justify-end gap-2 border-t mt-4">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => markAsCompleted(order.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Marcar como Concluída
                      </Button>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
