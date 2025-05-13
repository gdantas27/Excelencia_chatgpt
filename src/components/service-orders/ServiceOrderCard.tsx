import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  User,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { ServiceOrderDetails } from './ServiceOrderDetails';
import { useState } from 'react';

interface ServiceOrderCardProps {
  order: {
    id: string;
    clientName: string;
    address: string;
    type: string;
    status: 'approved' | 'pending' | 'rejected' | 'inspection';
    scheduledFor: Date;
    createdAt: Date;
  };
  isDragging?: boolean;
}

const statusConfig = {
  approved: {
    label: 'Aprovada',
    className: 'bg-green-100 text-green-800',
    icon: CheckCircle,
  },
  pending: {
    label: 'Aguardando',
    className: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
  },
  rejected: {
    label: 'Rejeitada',
    className: 'bg-red-100 text-red-800',
    icon: XCircle,
  },
  inspection: {
    label: 'Vistoria',
    className: 'bg-blue-100 text-blue-800',
    icon: Search,
  },
};

export function ServiceOrderCard({
  order,
  isDragging = false,
}: ServiceOrderCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const StatusIcon = statusConfig[order.status].icon;

  return (
    <>
      <Card 
        className={`${isDragging ? 'opacity-50' : ''} cursor-move`}
        onClick={() => setShowDetails(true)}
      >
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/10">
                <User className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {order.clientName}
                </h3>
                <p className="text-xs text-gray-500">{order.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusConfig[order.status].className}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig[order.status].label}
              </Badge>
              <button 
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{order.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{order.scheduledFor.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{order.scheduledFor.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ServiceOrderDetails
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        order={order}
      />
    </>
  );
}