import React from "react";

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

  return (
    <div className="chart-widget" style={{ padding: "16px", height: "100%" }}>
      <div
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}
      >
        {config.title || "Chart"}
      </div>
      <div className="chart-container" style={{ height: "calc(100% - 40px)" }}>
        {data ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>📊</div>
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              {config.chartType} Chart
            </div>
            <div
              style={{ fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}
            >
              {data.datasets?.[0]?.data?.length || 0} data points
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ChartWidget;
