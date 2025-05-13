import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, AlertCircle, CheckCircle } from 'lucide-react';

interface NotificationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type NotificationType = 'info' | 'warning' | 'success';

export function NotificationForm({ isOpen, onClose }: NotificationFormProps) {
  const [type, setType] = useState<NotificationType>('info');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Novo Aviso</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Aviso
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setType('info')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                      type === 'info'
                        ? 'border-blue-500 bg-blue-50 text-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Info size={24} />
                    <div className="text-left">
                      <div className="font-medium">Informativo</div>
                      <div className="text-sm text-gray-500">Comunicados gerais</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('warning')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                      type === 'warning'
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <AlertCircle size={24} />
                    <div className="text-left">
                      <div className="font-medium">Atenção</div>
                      <div className="text-sm text-gray-500">Avisos importantes</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('success')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                      type === 'success'
                        ? 'border-green-500 bg-green-50 text-green-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CheckCircle size={24} />
                    <div className="text-left">
                      <div className="font-medium">Sucesso</div>
                      <div className="text-sm text-gray-500">Atualizações positivas</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  placeholder="Digite o título do aviso"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  placeholder="Digite a mensagem do aviso..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinatários
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                >
                  <option value="all">Todos os usuários</option>
                  <option value="operators">Apenas operadores</option>
                  <option value="managers">Apenas gestores</option>
                </select>
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
              className="button-gradient px-4 py-2 text-white font-medium rounded-lg"
            >
              Publicar Aviso
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}