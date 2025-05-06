import { motion } from 'framer-motion';
import { FileText, Calendar, DollarSign, User, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

interface BudgetPreviewProps {
  budget: {
    id: string;
    clientName: string;
    serviceType: string;
    description: string;
    items: Array<{
      id: string;
      description: string;
      quantity: number;
      unitPrice: number;
    }>;
    technicalNotes?: string;
    technician?: string;
    estimatedCompletion?: Date;
    validityPeriod: number;
    createdAt: Date;
  };
}

export function BudgetPreview({ budget }: BudgetPreviewProps) {
  const totalValue = budget.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

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
            <div className="text-right">
              <p className="text-sm text-gray-500">Orçamento #</p>
              <p className="font-medium">{budget.id}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Descrição</h4>
              <p className="text-gray-600">{budget.description}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Itens</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Descrição
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Qtd
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Valor Unit.
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {budget.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {item.description}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">
                          R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">
                          R$ {(item.quantity * item.unitPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-500 text-right">
                        Valor Total
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-800 text-right">
                        R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {budget.technicalNotes && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Observações Técnicas
                </h4>
                <p className="text-gray-600">{budget.technicalNotes}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                {budget.technician && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Responsável: {budget.technician}</span>
                  </div>
                )}
                {budget.estimatedCompletion && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      Prazo: {budget.estimatedCompletion.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    Emitido em: {budget.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Validade: {budget.validityPeriod} dias</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}