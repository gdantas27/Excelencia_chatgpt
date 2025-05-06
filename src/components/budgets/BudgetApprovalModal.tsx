import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import { useNotificationStore } from '@/stores/notifications';

interface BudgetApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (comments: string) => void;
  onReject: (reason: string) => void;
  budget: {
    id: string;
    clientName: string;
    serviceType: string;
    value: number;
  };
}

export function BudgetApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  budget,
}: BudgetApprovalModalProps) {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [comments, setComments] = useState('');
  const [reason, setReason] = useState('');
  const { createOrder } = useServiceOrders();
  const { addNotification } = useNotificationStore();

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (action === 'approve') {
      // Create service order
      createOrder({
        clientName: budget.clientName,
        address: 'To be updated', // This would come from the client data in a real app
        type: budget.serviceType,
        status: 'pending',
        scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        clientType: 'new',
        personType: 'pf',
        value: budget.value,
        budgetId: budget.id,
      });

      addNotification({
        type: 'success',
        message: `Orçamento aprovado e O.S. criada para ${budget.clientName}`,
        duration: 5000,
      });

      onApprove(comments);
    } else if (action === 'reject') {
      addNotification({
        type: 'info',
        message: `Orçamento rejeitado para ${budget.clientName}`,
        duration: 5000,
      });

      onReject(reason);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Aprovar Orçamento
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Cliente</span>
                <span className="font-medium">{budget.clientName}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Tipo de Serviço</span>
                <span className="font-medium">{budget.serviceType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Valor</span>
                <span className="font-medium">
                  R$ {budget.value.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            {!action ? (
              <div className="space-y-4">
                <button
                  onClick={() => setAction('approve')}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                >
                  <CheckCircle size={24} />
                  <div className="text-left">
                    <div className="font-medium">Aprovar Orçamento</div>
                    <div className="text-sm text-gray-600">
                      Gerar ordem de serviço automaticamente
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setAction('reject')}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  <XCircle size={24} />
                  <div className="text-left">
                    <div className="font-medium">Rejeitar Orçamento</div>
                    <div className="text-sm text-gray-600">
                      Informar motivo da rejeição
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {action === 'approve' ? (
                  <>
                    <div className="flex items-center gap-2 text-green-600 mb-4">
                      <CheckCircle size={20} />
                      <span className="font-medium">Aprovando Orçamento</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comentários (opcional)
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        placeholder="Adicione comentários ou instruções específicas..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-red-600 mb-4">
                      <AlertTriangle size={20} />
                      <span className="font-medium">Rejeitando Orçamento</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Motivo da Rejeição
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        placeholder="Descreva o motivo da rejeição..."
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            {action && (
              <button
                onClick={() => setAction(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Voltar
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={action === 'reject' && !reason}
              className={`px-4 py-2 text-white font-medium rounded-lg flex items-center gap-2 ${
                action === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : action === 'reject'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send size={18} />
              {action === 'approve'
                ? 'Confirmar Aprovação'
                : action === 'reject'
                ? 'Confirmar Rejeição'
                : 'Confirmar'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}