import { useState, useEffect } from "react";

interface WidgetDataConfig {
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  refreshInterval?: number;
  transform?: (data: any) => any;
}

export const useWidgetData = (widgetId: string, config?: WidgetDataConfig) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!config?.url) {
      // Mock data for demo purposes
      setData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Sales",
            data: [12, 19, 3, 5, 2],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.url, {
        method: config.method || "GET",
        headers: config.headers || {
          "Content-Type": "application/json",
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const transformedData = config.transform
        ? config.transform(result)
        : result;
      setData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (config?.refreshInterval) {
      const interval = setInterval(fetchData, config.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [widgetId, config?.url, config?.method]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
