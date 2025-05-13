import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Calendar,
  User,
  DollarSign,
  Clock,
  Send,
  Plus,
  Trash2,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface BudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  client?: {
    id: string;
    name: string;
  };
}

interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function BudgetForm({ isOpen, onClose, client }: BudgetFormProps) {
  const [selectedClient, setSelectedClient] = useState(client?.id || '');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [technicalNotes, setTechnicalNotes] = useState('');
  const [technician, setTechnician] = useState('');
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('30');

  const addItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<BudgetItem>) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const totalValue = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 my-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Novo Orçamento
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    value={client?.name || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-200 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Serviço
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full pl-10"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="maintenance">Manutenção</option>
                    <option value="installation">Instalação</option>
                    <option value="repair">Reparo</option>
                    <option value="inspection">Vistoria</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição Geral
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  placeholder="Descreva o serviço a ser realizado..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Itens do Orçamento
                  </label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    Adicionar Item
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Descrição do item"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, { description: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        placeholder="Qtd"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, {
                            quantity: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        type="number"
                        placeholder="Valor Unit."
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, {
                            unitPrice: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <div className="flex justify-end border-t pt-4">
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Valor Total</span>
                    <p className="text-xl font-semibold text-gray-800">
                      R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações Técnicas
                </label>
                <textarea
                  value={technicalNotes}
                  onChange={(e) => setTechnicalNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  placeholder="Adicione observações técnicas relevantes..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsável Técnico
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Select
                      value={technician}
                      onChange={(e) => setTechnician(e.target.value)}
                      className="w-full pl-10"
                    >
                      <option value="">Selecione o responsável</option>
                      <option value="1">João Silva</option>
                      <option value="2">Maria Santos</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prazo Estimado
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="date"
                      value={estimatedCompletion}
                      onChange={(e) => setEstimatedCompletion(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Validade da Proposta (dias)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="number"
                    value={validityPeriod}
                    onChange={(e) => setValidityPeriod(e.target.value)}
                    className="pl-10"
                    min="1"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="button-gradient px-4 py-2 text-white font-medium rounded-lg flex items-center gap-2"
            >
              <Send size={18} />
              Gerar Orçamento
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}