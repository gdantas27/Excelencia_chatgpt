import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';

interface Document {
  id: string;
  title: string;
  type: 'certificate' | 'service_order' | 'payment';
  date: Date;
  status: 'active' | 'expired';
  downloadUrl: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Certificado de Conformidade - Janeiro 2024',
    type: 'certificate',
    date: new Date('2024-01-15'),
    status: 'active',
    downloadUrl: '#',
  },
  {
    id: '2',
    title: 'Ordem de Serviço #1234 - Manutenção Preventiva',
    type: 'service_order',
    date: new Date('2024-02-20'),
    status: 'active',
    downloadUrl: '#',
  },
  {
    id: '3',
    title: 'Comprovante de Pagamento - Fevereiro 2024',
    type: 'payment',
    date: new Date('2024-02-28'),
    status: 'active',
    downloadUrl: '#',
  },
];

export function CustomerDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Document['type']>('all');
  const [documents] = useState<Document[]>(mockDocuments);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Meus Documentos</h1>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          />
        </div>

        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
          className="w-48"
        >
          <option value="all">Todos os tipos</option>
          <option value="certificate">Certificados</option>
          <option value="service_order">Ordens de Serviço</option>
          <option value="payment">Comprovantes</option>
        </Select>

        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Filter size={20} />
        </button>
      </div>

      <div className="grid gap-6">
        {filteredDocuments.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-brand-primary/10">
                      <FileText className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {doc.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.status === 'active' && (
                      <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Válido
                      </span>
                    )}
                    <a
                      href={doc.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                    >
                      <Download size={20} />
                    </a>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full bg-gray-100">
                    {doc.type === 'certificate' && 'Certificado'}
                    {doc.type === 'service_order' && 'Ordem de Serviço'}
                    {doc.type === 'payment' && 'Comprovante'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}