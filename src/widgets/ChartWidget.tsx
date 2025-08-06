import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartWidgetProps {
  config: {
    chartType: string;
    title: string;
    dataSource: string;
  };
  data?: any;
  loading?: boolean;
  error?: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  config,
  data,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="chart-widget" style={{ padding: "16px", height: "100%" }}>
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          Loading chart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-widget" style={{ padding: "16px", height: "100%" }}>
        <div style={{ textAlign: "center", color: "#ef4444" }}>
          Error: {error}
        </div>
      </div>
    );
  }

  const renderChart = () => {
    if (!data) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#6b7280",
          }}
        >
          No data available
        </div>
      );
    }
    switch (config.chartType) {
      case "line":
        return (
          <Line
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
              },
            }}
          />
        );
      case "bar":
        return (
          <Bar
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
              },
            }}
          />
        );
      default:
        return (
          <div style={{ color: "#ef4444", textAlign: "center" }}>
            Unsupported chart type: {config.chartType}
          </div>
        );
    }
  };

  return (
    <div className="chart-widget" style={{ padding: "16px", height: "100%" }}>
      <div
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}
      >
        {config.title || "Chart"}
      </div>
      <div className="chart-container" style={{ height: "calc(100% - 40px)" }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartWidget;
