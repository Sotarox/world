import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { ACCountryNav } from '@/model/ACCountry';

const chartConfig = {
  population: {
    label: 'Population',
  },
} satisfies ChartConfig;

interface PopulationChartProps {
  data: ACCountryNav[];
}

const barHeight = 40; // Height per country

export function PopulationChart({ data }: PopulationChartProps) {
  const chartHeight = Math.max(data.length * barHeight, 200); // Minimum height 200px
  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[200px] w-full p-4'
      style={{ height: chartHeight }}
    >
      <BarChart
        accessibilityLayer
        data={data}
        height={chartHeight}
        layout='vertical'
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='population' type='number' />
        <YAxis dataKey='name' type='category' width={150} />
        <Tooltip
          contentStyle={{ backgroundColor: 'var(--color-gray-50)' }}
          labelStyle={{ color: 'var(--color-gray-900)' }}
        />
        <Bar dataKey='population' fill='var(--chart-1)' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
