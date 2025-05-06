import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, HelpCircle, MessageCircle, Phone, Mail, FileText } from 'lucide-react';

export function CustomerHelp() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Central de Ajuda</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Buscar ajuda..."
          className="pl-10"
        />
      </div>

      {/* Quick Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-brand-primary/20 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Documentação</h3>
                <p className="text-sm text-gray-500">
                  Guias e tutoriais
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-brand-primary/20 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Chat Online</h3>
                <p className="text-sm text-gray-500">
                  Fale com um atendente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-brand-primary/20 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Telefone</h3>
                <p className="text-sm text-gray-500">
                  Suporte por telefone
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Perguntas Frequentes
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                question: 'Como solicitar um orçamento?',
                answer:
                  'Para solicitar um orçamento, acesse a seção "Orçamentos" no menu lateral e clique no botão "Nova Solicitação".',
              },
              {
                question: 'Como agendar uma visita técnica?',
                answer:
                  'Você pode agendar uma visita técnica através da seção "Agendamentos", escolhendo a data e horário disponíveis.',
              },
              {
                question: 'Onde encontro meus documentos?',
                answer:
                  'Todos os seus documentos estão disponíveis na seção "Documentos", organizados por tipo e data.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-brand-primary/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-brand-primary" />
                  <h3 className="font-medium text-gray-800">{faq.question}</h3>
                </div>
                <p className="text-sm text-gray-600 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Contato
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-brand-primary/10">
                <Mail className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-sm text-gray-500">
                  suporte@excelencia.com.br
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-brand-primary/10">
                <Phone className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Telefone</h3>
                <p className="text-sm text-gray-500">
                  0800 123 4567
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}