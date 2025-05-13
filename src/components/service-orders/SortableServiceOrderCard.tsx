import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ServiceOrderCard } from './ServiceOrderCard';
import { ServiceOrder } from '@/lib/mock-data';

interface SortableServiceOrderCardProps {
  order: ServiceOrder;
}

export function SortableServiceOrderCard({
  order,
}: SortableServiceOrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ServiceOrderCard order={order} isDragging={isDragging} />
    </div>
  );
}
