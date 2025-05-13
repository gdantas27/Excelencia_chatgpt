import { useState } from 'react';

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = hovered !== null ? i < hovered : i < value;

        return (
          <span
            key={i}
            className={`cursor-pointer text-2xl transition-colors ${
              filled ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(i + 1)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}