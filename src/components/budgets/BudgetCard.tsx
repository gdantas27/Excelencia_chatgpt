import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  User,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BudgetCardProps {
  budget: {
    id: string;
    clientName: string;
    serviceType: string;
    value: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    validUntil: Date;
    technician: string;
  };
  onApprove?: () => void;
  onReject?: () => void;
}

const statusConfig = {
  pending: {
    label: 'Aguardando',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800',
  },
  approved: {
    label: 'Aprovado',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800',
  },
  rejected: {
    label: 'Rejeitado',
    icon: XCircle,
    className: 'bg-red-100 text-red-800',
  },
};

export function BudgetCard({ budget, onApprove, onReject }: BudgetCardProps) {
  const StatusIcon = statusConfig[budget.status].icon;

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
                <FileText className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{budget.clientName}</h3>
                <p className="text-sm text-gray-500">{budget.serviceType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusConfig[budget.status].className}>
                <StatusIcon className="w-4 h-4 mr-1" />
                {statusConfig[budget.status].label}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <DollarSign className="w-4 h-4" />
                <span>
                  R$ {budget.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{budget.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{budget.technician}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Válido até {budget.validUntil.toLocaleDateString()}</span>
              </div>
            </div>

            {budget.status === 'pending' && (
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  onClick={onReject}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Rejeitar
                </button>
                <button
                  onClick={onApprove}
                  className="px-3 py-1.5 text-sm font-medium text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10 rounded-lg transition-colors"
                >
                  Aprovar
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}