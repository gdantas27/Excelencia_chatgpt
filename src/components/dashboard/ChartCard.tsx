import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Chart from 'react-apexcharts';

interface ChartCardProps {
  title: string;
  type: 'area' | 'bar' | 'line' | 'mixed';
  series: {
    name: string;
    type?: 'line' | 'column'; // ← agora cada série pode definir seu tipo
    data: number[];
  }[];
  categories: string[];
}

export function ChartCard({ title, type, series, categories }: ChartCardProps) {
  // Separa os dados
  const atendimentoSeries =
    series.find((s) => s.name === 'Atendimentos')?.data || [];
  const valorSeries = series.find((s) => s.name === 'Valores (R$)')?.data || [];

  // Cálculo com margem proporcional separada
  const maxAtendimentos = Math.max(...atendimentoSeries);
  const maxValores = Math.max(...valorSeries);

  const yMaxAtendimentos = Math.ceil(maxAtendimentos * 1.2); // 20% de margem
  const yMaxValores = Math.ceil(maxValores * 1.1); // 10% de margem para valores

  const options = {
    chart: {
      type: type === 'mixed' ? 'line' : type,
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: series.map((s) => (s.type === 'line' ? 3 : 0)),
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    fill: {
      opacity: 0.8,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1], // mostra em todas as séries
      style: {
        fontSize: '12px',
      },
      formatter: (val: number) => val.toLocaleString('pt-BR'),
    },
    colors: ['#009688', '#3f51b5'],
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        title: { text: 'Qtd Atendimentos' },
        max: yMaxAtendimentos,
        labels: { style: { colors: '#009688' } },
      },
      {
        opposite: true,
        title: { text: 'Valores (R$)' },
        max: yMaxValores,
        labels: {
          formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
          style: { colors: '#3f51b5' },
        },
      },
    ],

    tooltip: {
      y: {
        formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
      },
      theme: 'dark',
    },
    grid: {
      show: true,
      borderColor: '#eee',
    },
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="line" // para mixed charts, sempre 'line'
          height={250}
        />
      </CardContent>
    </Card>
  );
}
