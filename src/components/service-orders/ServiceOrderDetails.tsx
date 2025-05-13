import {
  X,
  User,
  MapPin,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { AttachmentUploader } from './AttachmentUploader';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { StarRatingInput } from '@/components/ui/StarRatingInput';
import { useEffect, useState } from 'react';

interface ServiceOrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: any; // futuramente tipar corretamente
}

export function ServiceOrderDetails({
  isOpen,
  onClose,
  order,
}: ServiceOrderDetailsProps) {
  if (!isOpen || !order) return null;

  const missingFields = [];
  if (!order?.clientName) missingFields.push('Nome');
  if (!order?.address) missingFields.push('Endereço');
  if (!order?.document) missingFields.push('CPF/CNPJ');

  const [attachments, setAttachments] = useState(order.attachments || []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 space-y-6"
        >
          {/* Header com título, avaliação e botão de fechar */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-800">
                Detalhes da Ordem de Serviço
              </h2>
              <div>
                <p className="text-sm font-medium text-gray-700">Avaliação</p>
                <StarRatingInput
                  value={order.rating || 0}
                  onChange={
                    !order.rating
                      ? (newRating) => {
                          order.rating = newRating;
                          setSelectedOrder({ ...order });
                        }
                      : undefined
                  }
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 ml-4"
            >
              <X size={20} />
            </button>
          </div>

          {/* Alert de campos obrigatórios faltando */}
          {missingFields.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} />
              Dados pendentes: {missingFields.join(', ')}.
            </div>
          )}

          {/* Conteúdo dividido */}
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            {/* Coluna 1: Cliente e status */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <strong>Cliente:</strong>{' '}
                  {!order.clientName ? (
                    <input
                      type="text"
                      placeholder="Nome do cliente"
                      className="border border-red-300 rounded px-2 py-1 text-sm mt-1 w-full"
                      onChange={(e) => (order.clientName = e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{order.clientName}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <strong>CPF/CNPJ:</strong>{' '}
                  {!order.document ? (
                    <input
                      type="text"
                      placeholder="Digite o CPF ou CNPJ"
                      className="border border-red-300 rounded px-2 py-1 text-sm mt-1 w-full"
                      onChange={(e) => (order.document = e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{order.document}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <strong>Endereço:</strong>{' '}
                  {!order.address ? (
                    <input
                      type="text"
                      placeholder="Preencha o endereço"
                      className="border border-red-300 rounded px-2 py-1 text-sm mt-1 w-full"
                      onChange={(e) => (order.address = e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{order.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <p>
                  <strong>Tipo de Serviço:</strong> {order.type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <strong>Status:</strong>
                </p>
                <Badge variant="secondary">{order.status}</Badge>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {order.personType.toUpperCase()}
                </Badge>
                <Badge variant="secondary">
                  {order.clientType === 'new' ? 'Novo' : 'Renovação'}
                </Badge>
              </div>
            </div>

            {/* Coluna 2: Datas e anexos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <p>
                  <strong>Data de Criação:</strong>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p>
                  <strong>Agendado para:</strong>{' '}
                  {new Date(order.scheduledFor).toLocaleString()}
                </p>
              </div>

              {/* Anexos */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Anexos
                </h3>
                <AttachmentUploader
                  attachments={attachments}
                  onChange={(files) => {
                    setAttachments(files);
                    order.attachments = files;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Rodapé com ações */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Fechar
            </button>
            <button className="px-4 py-2 text-sm font-medium text-brand-primary hover:text-white bg-brand-primary/10 hover:bg-brand-primary rounded-lg transition-colors">
              Atualizar Status
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}