import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { useAuthStore } from '@/stores/auth';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Badge } from '@/components/ui/Badge';

const typeConfig = {
  info: { icon: Info, className: 'bg-blue-100 text-blue-800' },
  warning: { icon: AlertCircle, className: 'bg-yellow-100 text-yellow-800' },
  success: { icon: CheckCircle, className: 'bg-green-100 text-green-800' },
};

export function Notifications() {
  const { notifications, loading, error, refetch } = useNotifications();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { user } = useAuthStore();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getNotificationsForDate = (date: Date) => {
    return notifications.filter(notification => 
      isSameDay(new Date(notification.createdAt), date)
    );
  };

  const previousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quadro de Avisos"
        description="Calendário de avisos e comunicados do sistema"
      />

      {notifications.length === 0 ? (
        <EmptyState
          title="Nenhum aviso encontrado"
          description="Não há avisos cadastrados no sistema."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <Card>
            <CardContent className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Week days */}
                {weekDays.map(day => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {daysInMonth.map((date, index) => {
                  const dayNotifications = getNotificationsForDate(date);
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  const hasNotifications = dayNotifications.length > 0;

                  return (
                    <motion.button
                      key={date.toString()}
                      onClick={() => setSelectedDate(isSelected ? null : date)}
                      className={`
                        relative p-2 min-h-[80px] text-left border rounded-lg transition-all
                        ${isSelected ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200'}
                        ${isToday(date) ? 'bg-blue-50' : ''}
                        hover:border-brand-primary/50
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`
                        text-sm font-medium
                        ${isToday(date) ? 'text-blue-600' : 'text-gray-700'}
                      `}>
                        {format(date, 'd')}
                      </span>
                      
                      {hasNotifications && (
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {dayNotifications.length}
                          </Badge>
                        </div>
                      )}

                      {hasNotifications && (
                        <div className="mt-1 space-y-1">
                          {dayNotifications.slice(0, 2).map((notification) => {
                            const TypeIcon = typeConfig[notification.type].icon;
                            return (
                              <div
                                key={notification.id}
                                className={`text-xs p-1 rounded-md ${typeConfig[notification.type].className}`}
                              >
                                <TypeIcon className="w-3 h-3 inline-block mr-1" />
                                <span className="truncate">{notification.title}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Notifications Detail Panel */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                      </h3>
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <ScrollArea className="h-[calc(100vh-20rem)]">
                      <div className="space-y-4">
                        {getNotificationsForDate(selectedDate).map((notification) => {
                          const TypeIcon = typeConfig[notification.type].icon;
                          return (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 rounded-lg ${typeConfig[notification.type].className}`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <TypeIcon className="w-5 h-5" />
                                <h4 className="font-medium">{notification.title}</h4>
                              </div>
                              <p className="text-sm">{notification.message}</p>
                              <div className="mt-2 text-xs opacity-75">
                                {format(new Date(notification.createdAt), 'HH:mm')} - {notification.author}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}