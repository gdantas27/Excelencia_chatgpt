import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Users,
  CheckSquare,
} from 'lucide-react';
import { ServiceOrderChecklist } from './ServiceOrderChecklist';

interface Client {
  id: string;
  name: string;
  address: string;
}

interface ServiceOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client | null;
}

export function ServiceOrderForm({
  isOpen,
  onClose,
  client,
}: ServiceOrderFormProps) {
  const [selectedClient, setSelectedClient] = useState(client?.id || '');
  const [serviceAddress, setServiceAddress] = useState(client?.address || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    if (client) {
      setSelectedClient(client.id);
      setServiceAddress(client.address);
    }
  }, [client]);

  if (!isOpen) return null;

  const handleCreateOrder = () => {
    if (
      !selectedClient ||
      !selectedDate ||
      !selectedTime ||
      !serviceAddress ||
      !serviceType
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const newOrder = {
      id: String(Date.now()),
      clientName: client?.name || 'Cliente',
      address: serviceAddress,
      type: serviceType,
      status: 'pending',
      createdAt: new Date(),
      scheduledFor: new Date(`${selectedDate}T${selectedTime}`),
    };

    console.log('Nova O.S. criada (mock):', newOrder);
    alert('Ordem de serviço criada com sucesso!');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 my-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Nova Ordem de Serviço
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
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  >
                    <option value="">Selecione o tipo de serviço</option>
                    <option value="installation">Instalação</option>
                    <option value="maintenance">Manutenção</option>
                    <option value="repair">Reparo</option>
                    <option value="inspection">Vistoria</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    placeholder="Endereço do serviço"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  rows={4}
                  placeholder="Descreva os detalhes do serviço..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
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
              onClick={() => setShowChecklist(true)}
              className="flex items-center gap-2 px-4 py-2 text-brand-primary hover:text-brand-primary/80 font-medium rounded-lg hover:bg-brand-primary/10 transition-colors"
            >
              <CheckSquare size={20} />
              Checklist
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateOrder}
              className="button-gradient px-4 py-2 text-white font-medium rounded-lg"
            >
              Criar O.S.
            </motion.button>
          </div>
        </motion.div>
      </div>

      <ServiceOrderChecklist
        isOpen={showChecklist}
        onClose={() => setShowChecklist(false)}
      />
    </AnimatePresence>
  );
}
