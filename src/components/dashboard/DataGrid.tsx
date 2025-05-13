import { useState } from 'react';
import { Pagination } from '@/components/ui/Pagination';

interface DataGridProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  className?: string;
}

export function DataGrid<T>({
  data,
  renderItem,
  itemsPerPage = 6,
  className,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentData.map((item, index) => renderItem(item))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}