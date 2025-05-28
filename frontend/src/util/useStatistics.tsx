// src/hooks/useStatistics.ts
import { useEffect, useState } from "react";
import { LineChartItem, ChartItem } from "../util/types/chartTypes";

type UseStatisticsResult = {
  lineData: LineChartItem[];
  doughnutData: ChartItem[];
  statusData: ChartItem[];
  loading: boolean;
  lineError: string;
  doughnutError: string;
  statusError: string;
};

export default function useStatistics(): UseStatisticsResult {
  const [lineData, setLineData] = useState<LineChartItem[]>([]);
  const [doughnutData, setDoughnutData] = useState<ChartItem[]>([]);
  const [statusData, setStatusData] = useState<ChartItem[]>([]);
  const [lineError, setLineError] = useState<string>("");
  const [doughnutError, setDoughnutError] = useState<string>("");
  const [statusError, setStatusError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData<T>(
    url: string,
    setData: React.Dispatch<React.SetStateAction<T>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    formatter?: (data: any) => T
  ) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const result = await response.json();
      setData(formatter ? formatter(result) : result);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setError("Error fetching data. Please try again later.");
    }
  }

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetchData<LineChartItem[]>(
        "/stats/lost-per-month",
        (data) => isMounted && setLineData(data),
        (err) => isMounted && setLineError(err)
      ),
      fetchData<ChartItem[]>(
        "/stats/typeLost",
        (data) => isMounted && setDoughnutData(data),
        (err) => isMounted && setDoughnutError(err),
        (raw) =>
          raw.map((item: { category: string; count: number }) => ({
            label: item.category,
            value: item.count,
          }))
      ),
      fetchData<ChartItem[]>(
        "/stats/items-by-status",
        (data) => isMounted && setStatusData(data),
        (err) => isMounted && setStatusError(err),
        (raw) =>
          raw.map((item: { category: string; count: number }) => ({
            label: item.category,
            value: item.count,
          }))
      ),
    ]).finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    lineData,
    doughnutData,
    statusData,
    loading,
    lineError,
    doughnutError,
    statusError,
  };
}
