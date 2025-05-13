import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, MessageSquare, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestModal({ isOpen, onClose }: RequestModalProps) {
  const [requestType, setRequestType] = useState('budget');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Nova Solicitação</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Solicitação
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setRequestType('budget')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    requestType === 'budget'
                      ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileText size={24} />
                  <span className="text-sm font-medium">Orçamento</span>
                </button>

                <button
                  onClick={() => setRequestType('schedule')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    requestType === 'schedule'
                      ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Calendar size={24} />
                  <span className="text-sm font-medium">Agendamento</span>
                </button>

                <button
                  onClick={() => setRequestType('support')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    requestType === 'support'
                      ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MessageSquare size={24} />
                  <span className="text-sm font-medium">Suporte</span>
                </button>
              </div>
            </div>

            {requestType === 'budget' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Serviço
                  </label>
                  <Select className="w-full">
                    <option value="">Selecione o tipo de serviço</option>
                    <option value="maintenance">Manutenção</option>
                    <option value="installation">Instalação</option>
                    <option value="repair">Reparo</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder="Descreva o serviço desejado..."
                  />
                </div>
              </div>
            )}

            {requestType === 'schedule' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Preferencial
                  </label>
                  <Input type="date" className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário Preferencial
                  </label>
                  <Input type="time" className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observações
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder="Informações adicionais..."
                  />
                </div>
              </div>
            )}

            {requestType === 'support' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <Input className="w-full" placeholder="Digite o assunto" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder="Digite sua mensagem..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button>Enviar Solicitação</Button>
        </div>
      </motion.div>
    </div>
  );
}