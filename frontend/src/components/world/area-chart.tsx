import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';

import { ChartContainer, type ChartConfig } from '@/components/shadcn/chart';
import { ACCountryNav } from '@/model/ac-country';

const chartConfig = {
  area: {
    label: 'Area',
  },
} satisfies ChartConfig;

interface AreaChartProps {
  data: ACCountryNav[];
  selectedIso2: string;
}

const BAR_HEIGHT = 40;
const MINIMUM_BAR_HEIGHT = 200;
const SPLIT_NAME_LENGTH = 25;

export function AreaChart({ data, selectedIso2 }: AreaChartProps) {
  const chartHeight = Math.max(data.length * BAR_HEIGHT, MINIMUM_BAR_HEIGHT);
  const formatArea = (value: number): string => {
    const largestArea = Math.max(...data.map((country) => country.area ?? 0));
    if (largestArea >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (largestArea >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (largestArea >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return largestArea.toString();
  };
  // Custom function to set bar color
  const getBarColor = (entry: ACCountryNav) => {
    if (
      selectedIso2 &&
      entry.alpha2Code?.toUpperCase() === selectedIso2.toUpperCase()
    ) {
      return 'var(--chart-selected, var(--chart-selected, #ff9800))';
    }
    return 'var(--chart-2)';
  };
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
        <CartesianGrid stroke='var(--color-gray-500)' strokeDasharray='3 3' />
        <XAxis
          dataKey='area'
          type='number'
          orientation='top'
          tickFormatter={(value) => formatArea(value)}
        />
        <YAxis
          dataKey='name'
          type='category'
          width={180}
          tick={({ x, y, payload, index }) => {
            const country = data[index];
            const isSelected =
              selectedIso2 &&
              country?.alpha2Code?.toUpperCase() === selectedIso2.toUpperCase();
            const name = country ? country.name : payload.value;
            // Split long names into two lines if longer than predefined character length
            let lines: string[] = [name];
            if (name.length > SPLIT_NAME_LENGTH) {
              const splitIdx = name.lastIndexOf(' ', SPLIT_NAME_LENGTH);
              if (splitIdx > 0) {
                lines = [name.slice(0, splitIdx), name.slice(splitIdx + 1)];
              } else {
                lines = [
                  name.slice(0, SPLIT_NAME_LENGTH),
                  name.slice(SPLIT_NAME_LENGTH),
                ];
              }
            }
            return (
              <text
                x={x}
                y={y}
                dy={4}
                fontSize={14}
                textAnchor='end'
                style={{
                  fill: `${isSelected ? 'var(--chart-selected, #ff9800)' : ''}`,
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                {lines.map((line, i) => (
                  <tspan x={x} dy={i === 0 ? 0 : 16} key={i}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'var(--color-slate-50)' }}
          labelStyle={{ color: 'var(--color-gray-900)' }}
          formatter={(value, name) => {
            if (typeof value === 'number') {
              return [value.toLocaleString(), name];
            }
            return [value, name];
          }}
        />
        <Bar
          dataKey='area'
          radius={[0, 4, 4, 0]}
          isAnimationActive={false}
          fill='var(--color-slate-600)'
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.alpha2Code}`} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
