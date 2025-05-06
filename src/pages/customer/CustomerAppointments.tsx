import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  technician: string;
  location: string;
  notes?: string;
  rating?: number;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: new Date('2024-04-20'),
    time: '14:30',
    type: 'Manutenção Preventiva',
    status: 'scheduled',
    technician: 'Pedro Santos',
    location: 'Rua das Flores, 123 - São Paulo, SP',
    notes: 'Levar documentação necessária',
  },
  {
    id: '2',
    date: new Date('2024-04-22'),
    time: '09:00',
    type: 'Vistoria Técnica',
    status: 'scheduled',
    technician: 'Maria Santos',
    location: 'Av. Paulista, 1000 - São Paulo, SP',
  },
  {
    id: '3',
    date: new Date('2024-03-15'),
    time: '10:00',
    type: 'Instalação',
    status: 'completed',
    technician: 'João Silva',
    location: 'Rua Augusta, 500 - São Paulo, SP',
    rating: 5,
  },
];

const statusConfig = {
  scheduled: {
    label: 'Agendado',
    className: 'bg-blue-100 text-blue-800',
    Icon: Clock,
  },
  completed: {
    label: 'Concluído',
    className: 'bg-green-100 text-green-800',
    Icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800',
    Icon: XCircle,
  },
};

export function CustomerAppointments() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Appointment['status']>('all');

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch = appointment.type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Agendamentos</h1>
        <Button className="flex items-center gap-2">
          <Calendar size={18} />
          Novo Agendamento
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar agendamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="w-48"
        >
          <option value="all">Todos os status</option>
          <option value="scheduled">Agendados</option>
          <option value="completed">Concluídos</option>
          <option value="cancelled">Cancelados</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Calendário</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">
                  {currentDate.toLocaleString('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square p-2 border rounded-lg hover:border-brand-primary/20 transition-colors cursor-pointer"
                >
                  <span className="text-sm text-gray-600">{index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">
              Próximos Agendamentos
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => {
                const { Icon } = statusConfig[appointment.status];
                return (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg border border-gray-200 hover:border-brand-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">{appointment.type}</h3>
                      <Badge className={statusConfig[appointment.status].className}>
                        <Icon className="w-4 h-4 mr-1" />
                        {statusConfig[appointment.status].label}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {appointment.date.toLocaleDateString()} às {appointment.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{appointment.technician}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.location}</span>
                      </div>

                      {appointment.notes && (
                        <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <span className="text-sm text-yellow-800">
                            {appointment.notes}
                          </span>
                        </div>
                      )}
                    </div>

                    {appointment.status === 'scheduled' && (
                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" className="text-red-600 hover:bg-red-50">
                          Cancelar
                        </Button>
                        <Button>Confirmar Presença</Button>
                      </div>
                    )}

                    {appointment.status === 'completed' && appointment.rating && (
                      <div className="flex items-center gap-1 mt-4 pt-4 border-t">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`text-2xl ${
                              index < appointment.rating!
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}