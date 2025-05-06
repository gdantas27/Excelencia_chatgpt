import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Building2, Search, ClipboardList } from 'lucide-react';
import { useClients } from '@/hooks/useClients';
import { ServiceOrderForm } from '@/components/service-orders/ServiceOrderForm';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientForm({ isOpen, onClose }: ClientFormProps) {
  const [clientType, setClientType] = useState<'residential' | 'commercial'>(
    'residential'
  );
  const [clientData, setClientData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showServiceOrderForm, setShowServiceOrderForm] = useState(false);
  const { clients } = useClients();
  const [createdClient, setCreatedClient] = useState<Client | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Search for existing clients
    const existingClient = clients.find(
      (client) =>
        client.email.toLowerCase() === term.toLowerCase() ||
        client.phone.replace(/\D/g, '') === term.replace(/\D/g, '') ||
        (clientType === 'commercial' &&
          client.name.toLowerCase() === term.toLowerCase())
    );

    if (existingClient) {
      // Pre-fill form with existing client data
      setClientType(existingClient.type);
      // Add other form field updates here
    }
  };

  if (!isOpen) return null;

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
              Novo Cliente
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
              {/* Busca cliente existente */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Buscar Cliente Existente
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por email, telefone ou nome (empresas)"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Tipo de cliente */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Cliente
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setClientType('residential')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                      clientType === 'residential'
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Users size={24} />
                    <div className="text-left">
                      <div className="font-medium">Residencial</div>
                      <div className="text-sm text-gray-500">Pessoa Física</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setClientType('commercial')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                      clientType === 'commercial'
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 size={24} />
                    <div className="text-left">
                      <div className="font-medium">Comercial</div>
                      <div className="text-sm text-gray-500">
                        Pessoa Jurídica
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Nome e Documento */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {clientType === 'residential'
                      ? 'Nome Completo'
                      : 'Razão Social'}
                  </label>
                  <input
                    type="text"
                    value={clientData.name}
                    onChange={(e) =>
                      setClientData({ ...clientData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {clientType === 'residential' ? 'CPF' : 'CNPJ'}
                  </label>
                  <input
                    type="text"
                    value={clientData.document}
                    onChange={(e) =>
                      setClientData({ ...clientData, document: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Email e Telefone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={clientData.email}
                    onChange={(e) =>
                      setClientData({ ...clientData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={clientData.phone}
                    onChange={(e) =>
                      setClientData({ ...clientData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  value={clientData.address}
                  onChange={(e) =>
                    setClientData({ ...clientData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>

              {/* Cidade, Estado e CEP */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={clientData.city}
                    onChange={(e) =>
                      setClientData({ ...clientData, city: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={clientData.state}
                    onChange={(e) =>
                      setClientData({ ...clientData, state: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    placeholder="(opcional)"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anexo de Contrato
                </label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
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
              onClick={() => {
                if (
                  !clientData.name ||
                  !clientData.document ||
                  !clientData.phone
                ) {
                  alert('Preencha os dados obrigatórios antes de criar a O.S.');
                  return;
                }

                const newClient = {
                  id: String(Date.now()),
                  ...clientData,
                  type: clientType,
                  createdAt: new Date(),
                };

                console.log('Novo cliente salvo (mock):', newClient);

                // Aqui você pode adicionar o cliente ao mock via contexto se quiser.
                setShowServiceOrderForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-brand-primary hover:text-brand-primary/80 font-medium rounded-lg hover:bg-brand-primary/10 transition-colors"
            >
              <ClipboardList size={20} />
              Criar O.S.
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="button-gradient px-4 py-2 text-white font-medium rounded-lg"
            >
              Salvar Cliente
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Service Order Form */}
      <ServiceOrderForm
        isOpen={showServiceOrderForm}
        onClose={() => setShowServiceOrderForm(false)}
        client={createdClient}
      />
    </AnimatePresence>
  );
}
