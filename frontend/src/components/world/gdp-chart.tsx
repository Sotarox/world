import { WbEconomyInfo } from '@/model/wb-economy';
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { ChartConfig, ChartContainer } from '../shadcn/chart';

const chartConfig = {
  gdpValue: {
    label: 'GDP Value',
  },
} satisfies ChartConfig;

interface GdpChartProps {
  data: WbEconomyInfo[];
}

function GdpChart({ data }: GdpChartProps) {
  return (
    <ChartContainer config={chartConfig} className='w-full p-4'>
      <LineChart
        style={{ width: '100%', height: '100%', aspectRatio: 1.618 }}
        // responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke='var(--color-gray-500)' />
        <XAxis dataKey='year' stroke='var(--color-text-3)' />
        <YAxis stroke='var(--color-text-3)' />
        <Tooltip
          cursor={{
            stroke: 'var(--color-border-2)',
          }}
          contentStyle={{
            backgroundColor: 'var(--color-surface-raised)',
            borderColor: 'var(--color-border-2)',
          }}
        />
        <Legend />
        <Line
          type='monotone'
          dataKey='gdpValue'
          stroke='var(--color-chart-1)'
          dot={{
            fill: 'var(--color-surface-base)',
          }}
          activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export { GdpChart };
