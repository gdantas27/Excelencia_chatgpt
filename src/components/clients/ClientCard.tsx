import { motion } from 'framer-motion';
import { Users, Building2, Mail, Phone, MapPin } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ServiceHistory } from './ServiceHistory';
import { useState } from 'react';

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    type: 'residential' | 'commercial';
    createdAt: Date;
  };
  averageRating?: number;
}

export function ClientCard({ client }: ClientCardProps) {
  const [showHistory, setShowHistory] = useState(false);
  const Icon = client.type === 'residential' ? Users : Building2;

  const isComplete = (client: ClientCardProps['client']) => {
    return (
      client.name &&
      client.email &&
      client.phone &&
      client.address &&
      client.city &&
      client.state
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/10">
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">
                  Cliente desde {client.createdAt.toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      client.type === 'residential' ? 'secondary' : 'secondary'
                    }
                  >
                    {client.type === 'residential' ? 'PF' : 'PJ'}
                  </Badge>
                  <Badge variant={isComplete(client) ? 'success' : 'outline'}>
                    {isComplete(client) ? 'Efetivo' : 'Não Qualificado'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="w-4 h-4" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>
                {client.address}, {client.city} - {client.state}
              </span>
            </div>
          </div>

          {showHistory && (
            <div className="mt-6">
              <ServiceHistory clientId={client.id} />
            </div>
          )}
        </CardContent>

        <CardFooter>
          <div className="flex justify-end w-full gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showHistory ? 'Ocultar Histórico' : 'Ver Histórico'}
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-brand-primary hover:text-brand-primary/80 rounded-lg hover:bg-brand-primary/10 transition-colors">
              Editar
            </button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}