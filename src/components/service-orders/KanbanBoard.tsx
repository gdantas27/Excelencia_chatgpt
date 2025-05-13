import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { ServiceOrderCard } from './ServiceOrderCard';
import { ServiceOrder } from '@/lib/mock-data';

interface KanbanBoardProps {
  orders: ServiceOrder[];
  onOrderMove: (order: ServiceOrder, newStatus: ServiceOrder['status']) => void;
}

interface GroupedOrders {
  approved: ServiceOrder[];
  pending: ServiceOrder[];
  rejected: ServiceOrder[];
  inspection: ServiceOrder[];
}

const statusConfig = {
  approved: {
    title: 'Aprovadas',
    color: 'bg-green-50 border-green-200',
    countColor: 'bg-green-100 text-green-800',
  },
  pending: {
    title: 'Aguardando',
    color: 'bg-yellow-50 border-yellow-200',
    countColor: 'bg-yellow-100 text-yellow-800',
  },
  rejected: {
    title: 'Rejeitadas',
    color: 'bg-red-50 border-red-200',
    countColor: 'bg-red-100 text-red-800',
  },
  inspection: {
    title: 'Vistoria',
    color: 'bg-blue-50 border-blue-200',
    countColor: 'bg-blue-100 text-blue-800',
  },
};

export function KanbanBoard({ orders, onOrderMove }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrders>(() => {
    return orders.reduce(
      (acc, order) => {
        acc[order.status].push(order);
        return acc;
      },
      {
        approved: [],
        pending: [],
        rejected: [],
        inspection: [],
      } as GroupedOrders
    );
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeOrder = orders.find((order) => order.id === active.id);
    const newStatus = over.id as ServiceOrder['status'];

    if (activeOrder && activeOrder.status !== newStatus) {
      onOrderMove(activeOrder, newStatus);

      setGroupedOrders((prev) => {
        const newGroupedOrders = { ...prev };
        newGroupedOrders[activeOrder.status] = prev[activeOrder.status].filter(
          (order) => order.id !== activeOrder.id
        );
        newGroupedOrders[newStatus] = [
          ...prev[newStatus],
          { ...activeOrder, status: newStatus },
        ];
        return newGroupedOrders;
      });
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map(
          (status) => (
            <KanbanColumn
              key={status}
              id={status}
              title={statusConfig[status].title}
              orders={groupedOrders[status]}
              className={statusConfig[status].color}
              countClassName={statusConfig[status].countColor}
            />
          )
        )}
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="transform scale-105">
            <ServiceOrderCard
              order={orders.find((order) => order.id === activeId)!}
              isDragging
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
