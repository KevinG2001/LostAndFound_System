// src/utils/types/chartTypes.ts

export interface ChartItem {
  label: string;
  value: number;
}

export interface BarchartProps {
  data: ChartItem[];
  error?: string | null;
  loading: boolean;
}

export interface DoughnutChartProps {
  data: ChartItem[];
  error: string | null;
  loading?: boolean;
}

export interface LineChartItem {
  month: string;
  claimed: number;
  unclaimed: number;
  expired: number;
  toCollect: number;
}

export interface LineChartProps {
  data: LineChartItem[];
  error: string | null;
  loading: boolean;
}
