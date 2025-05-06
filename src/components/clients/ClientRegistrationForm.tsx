import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  Upload,
  Save,
  AlertCircle,
  Search,
  Home,
  FileText,
  Instagram,
  Facebook,
  Globe,
  Users,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { validateCPF, validateCNPJ, formatDocument, generateClientCode, formatPhone } from '@/lib/utils';

interface Contact {
  id: string;
  type: 'email' | 'phone';
  value: string;
  isPrimary: boolean;
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'document' | 'other';
  file: File;
  shared: boolean;
}

interface PropertyInfo {
  rooms: number;
  area: number;
  notes: string;
}

interface ClientFormData {
  id: string;
  clientCode: string;
  personType: 'pf' | 'pj';
  document: string;
  name: string;
  tradeName?: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  contacts: Contact[];
  documents: Document[];
  source: string;
  propertyInfo: PropertyInfo;
}

const sourceOptions = [
  { value: 'google', label: 'Google', icon: Globe },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'indication', label: 'Indicação', icon: Users },
  { value: 'other', label: 'Outros', icon: FileText },
];

export function ClientRegistrationForm() {
  const [formData, setFormData] = useState<ClientFormData>({
    id: crypto.randomUUID(),
    clientCode: generateClientCode(),
    personType: 'pf',
    document: '',
    name: '',
    zipCode: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    contacts: [],
    documents: [],
    source: '',
    propertyInfo: {
      rooms: 0,
      area: 0,
      notes: '',
    },
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj'>('cpf');

  useEffect(() => {
    const type = formData.document.replace(/\D/g, '').length > 11 ? 'cnpj' : 'cpf';
    if (type !== documentType) {
      setDocumentType(type);
      setFormData(prev => ({
        ...prev,
        personType: type === 'cnpj' ? 'pj' : 'pf'
      }));
    }
  }, [formData.document]);

  const fetchAddress = async (cep: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.error('Error fetching CEP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addContact = (type: 'email' | 'phone') => {
    const isPrimary = !formData.contacts.some(c => c.type === type);
    setFormData(prev => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        { id: crypto.randomUUID(), type, value: '', isPrimary }
      ]
    }));
  };

  const removeContact = (id: string) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id)
    }));
  };

  const setPrimaryContact = (id: string, type: 'email' | 'phone') => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map(contact => ({
        ...contact,
        isPrimary: contact.type === type ? contact.id === id : contact.isPrimary
      }))
    }));
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newDocuments = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: 'document' as const,
      file,
      shared: false,
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const removeDocument = (id: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }));
  };

  const toggleDocumentSharing = (id: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === id ? { ...doc, shared: !doc.shared } : doc
      )
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.document) newErrors.document = 'Documento é obrigatório';
    else if (documentType === 'cpf' && !validateCPF(formData.document)) {
      newErrors.document = 'CPF inválido';
    } else if (documentType === 'cnpj' && !validateCNPJ(formData.document)) {
      newErrors.document = 'CNPJ inválido';
    }

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.zipCode) newErrors.zipCode = 'CEP é obrigatório';
    if (!formData.address) newErrors.address = 'Endereço é obrigatório';
    if (!formData.number) newErrors.number = 'Número é obrigatório';
    if (!formData.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state) newErrors.state = 'Estado é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // Submit form data to server
      console.log('Form submitted:', formData);
      // Add your API call here
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <User className="w-5 h-5" />
          Informações Básicas
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF/CNPJ
            </label>
            <Input
              value={formData.document}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData(prev => ({
                  ...prev,
                  document: value,
                  personType: value.length > 11 ? 'pj' : 'pf'
                }));
              }}
              placeholder={documentType === 'cpf' ? 'Digite o CPF' : 'Digite o CNPJ'}
              className={errors.document ? 'border-red-500' : ''}
            />
            {errors.document && (
              <p className="mt-1 text-sm text-red-500">{errors.document}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código do Cliente
            </label>
            <Input
              value={formData.clientCode}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.personType === 'pf' ? 'Nome Completo' : 'Razão Social'}
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {formData.personType === 'pj' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Fantasia
              </label>
              <Input
                value={formData.tradeName}
                onChange={(e) => setFormData(prev => ({ ...prev, tradeName: e.target.value }))}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Origem do Cliente
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sourceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, source: option.value }))}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  formData.source === option.value
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <option.icon size={20} />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <MapPin className="w-5 h-5" />
          Endereço
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CEP
            </label>
            <div className="relative">
              <Input
                value={formData.zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData(prev => ({ ...prev, zipCode: value }));
                  if (value.length === 8) fetchAddress(value);
                }}
                maxLength={8}
                placeholder="00000-000"
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400 animate-spin" />
                </div>
              )}
            </div>
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              disabled={isLoading}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <Input
              value={formData.number}
              onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
              className={errors.number ? 'border-red-500' : ''}
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-500">{errors.number}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <Input
              value={formData.complement}
              onChange={(e) => setFormData(prev => ({ ...prev, complement: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bairro
            </label>
            <Input
              value={formData.neighborhood}
              onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
              disabled={isLoading}
              className={errors.neighborhood ? 'border-red-500' : ''}
            />
            {errors.neighborhood && (
              <p className="mt-1 text-sm text-red-500">{errors.neighborhood}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <Input
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              disabled={isLoading}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Input
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              disabled={isLoading}
              className={errors.state ? 'border-red-500' : ''}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Phone className="w-5 h-5" />
            Contatos
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addContact('email')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Email
            </button>
            <button
              type="button"
              onClick={() => addContact('phone')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Telefone
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {formData.contacts.map((contact) => (
            <div key={contact.id} className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  type={contact.type === 'email' ? 'email' : 'tel'}
                  value={contact.value}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      contacts: prev.contacts.map(c =>
                        c.id === contact.id
                          ? {
                              ...c,
                              value:
                                c.type === 'phone'
                                  ? formatPhone(e.target.value)
                                  : e.target.value,
                            }
                          : c
                      ),
                    }));
                  }}
                  placeholder={contact.type === 'email' ? 'Email' : 'Telefone'}
                />
              </div>
              <button
                type="button"
                onClick={() => setPrimaryContact(contact.id, contact.type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  contact.isPrimary
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Principal
              </button>
              <button
                type="button"
                onClick={() => removeContact(contact.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FileText className="w-5 h-5" />
          Documentos
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                Arraste arquivos ou clique para fazer upload
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-brand-primary/10 text-brand-primary font-medium rounded-lg hover:bg-brand-primary/20 transition-colors cursor-pointer"
              >
                Selecionar Arquivos
              </label>
            </div>
          </div>

          {formData.documents.length > 0 && (
            <div className="space-y-2">
              {formData.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleDocumentSharing(doc.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        doc.shared
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {doc.shared ? 'Compartilhado' : 'Compartilhar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeDocument(doc.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Property Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <button
          type="button"
          onClick={() => setShowPropertyInfo(!showPropertyInfo)}
          className="flex items-center gap-2 text-lg font-semibold text-gray-800"
        >
          <Home className="w-5 h-5" />
          Informações do Imóvel
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showPropertyInfo ? 'auto' : 0, opacity: showPropertyInfo ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade de Cômodos
              </label>
              <Input
                type="number"
                value={formData.propertyInfo.rooms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    propertyInfo: {
                      ...prev.propertyInfo,
                      rooms: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área (m²)
              </label>
              <Input
                type="number"
                value={formData.propertyInfo.area}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    propertyInfo: {
                      ...prev.propertyInfo,
                      area: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              value={formData.propertyInfo.notes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  propertyInfo: {
                    ...prev.propertyInfo,
                    notes: e.target.value,
                  },
                }))
              }
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              placeholder="Observações gerais sobre o imóvel..."
            />
          </div>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="button-gradient px-6 py-2 text-white font-medium rounded-lg flex items-center gap-2"
        >
          <Save size={20} />
          Salvar Cliente
        </button>
      </div>
    </form>
  );
}