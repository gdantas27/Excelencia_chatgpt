import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { Select } from '@/components/ui/Select';
import { mockServiceOrders } from '@/lib/mock-data'; // ou o caminho correto

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
}

export function FilterBar({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
    >
      <div className="flex gap-4">
        <SearchBar
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />

        {filters?.map((filter, index) => (
          <Select
            key={index}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="w-48"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ))}
      </div>
    </motion.div>
  );
}
