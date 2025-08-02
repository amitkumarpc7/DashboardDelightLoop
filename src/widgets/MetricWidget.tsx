import React from "react";

interface MetricWidgetProps {
  config: {
    title: string;
    value: string;
    unit: string;
    trend: "up" | "down" | "neutral";
    trendValue: string;
  };
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ config }) => {
  const { title, value, unit, trend, trendValue } = config;

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      default:
        return "→";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "#10b981";
      case "down":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="metric-widget" style={{ padding: "16px", height: "100%" }}>
      <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
        {title}
      </div>
      <div
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: "16px", marginLeft: "4px" }}>{unit}</span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          color: getTrendColor(),
        }}
      >
        <span style={{ marginRight: "4px" }}>{getTrendIcon()}</span>
        {trendValue}
      </div>
    </div>
  );
};

export default MetricWidget;
