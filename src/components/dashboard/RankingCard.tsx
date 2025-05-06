import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

interface RankingItem {
  name: string;
  value: number;
  percent: number;
}

interface RankingCardProps {
  title: string;
  items: RankingItem[];
}

export function RankingCard({ title, items }: RankingCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <span className="w-8 text-sm font-medium text-gray-500">
                #{index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm font-medium text-gray-500">
                    {item.value} atendimentos
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-2 bg-brand-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}