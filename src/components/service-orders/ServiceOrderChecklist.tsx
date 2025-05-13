import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckSquare, Square, Plus, Trash2 } from 'lucide-react';

interface ServiceOrderChecklistProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export function ServiceOrderChecklist({ isOpen, onClose }: ServiceOrderChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Verificar documentação', checked: false },
    { id: '2', text: 'Inspecionar local', checked: false },
    { id: '3', text: 'Avaliar condições', checked: false },
  ]);
  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addItem = () => {
    if (newItemText.trim()) {
      setItems([...items, {
        id: crypto.randomUUID(),
        text: newItemText.trim(),
        checked: false,
      }]);
      setNewItemText('');
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center overflow-y-auto py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 my-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Checklist da O.S.</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-primary/20 transition-colors group"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      item.checked
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.checked ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                  <span className={`flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Adicionar novo item..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addItem}
                  className="button-gradient px-4 py-2 text-white font-medium rounded-lg flex items-center gap-2"
                >
                  <Plus size={20} />
                  Adicionar
                </motion.button>
              </div>
            </div>
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
              Salvar Checklist
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}