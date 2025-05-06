import { useMemo } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { ServiceOrder } from '@/lib/mock-data';
import { SortableServiceOrderCard } from './SortableServiceOrderCard';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface KanbanColumnProps {
  id: string;
  title: string;
  orders: ServiceOrder[];
  className?: string;
  countClassName?: string;
}

export function KanbanColumn({
  id,
  title,
  orders,
  className,
  countClassName,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  const ordersIds = useMemo(() => orders.map((order) => order.id), [orders]);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-[calc(100vh-16rem)] rounded-xl border ${className}`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${countClassName}`}
        >
          {orders.length}
        </span>
      </div>

      <ScrollArea className="flex-1 p-4">
        <SortableContext
          items={ordersIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {orders.map((order) => (
              <SortableServiceOrderCard key={order.id} order={order} />
            ))}
          </div>
        </SortableContext>
      </ScrollArea>
    </div>
  );
}
