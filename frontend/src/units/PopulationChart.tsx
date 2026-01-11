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

export function PopulationChart({ data }: PopulationChartProps) {
  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full p-4'>
      <BarChart accessibilityLayer data={data} layout='vertical'>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='population' type='number' />
        <YAxis dataKey='name' type='category' />
        <Tooltip />
        <Bar dataKey='population' fill='var(--chart-1)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
