import React, { useState } from "react";
import { useDashboardActions } from "../store/dashboardStore";

interface MetricWidgetProps {
  config: {
    title: string;
    value: string;
    unit: string;
    trend: "up" | "down" | "neutral";
    trendValue: string;
  };
  widgetId?: string;
}

const MetricWidget: React.FC<MetricWidgetProps & { widgetId?: string }> = ({
  config,
  widgetId,
}) => {
  const { title, value, unit, trend, trendValue } = config;
  const { updateWidget } = useDashboardActions();
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (field: string, val: string) => {
    setEditField(field);
    setEditValue(val);
  };

  const handleSave = () => {
    if (widgetId && editField) {
      updateWidget(widgetId, { config: { ...config, [editField]: editValue } });
    }
    setEditField(null);
    setEditValue("");
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "\u2197\uFE0F";
      case "down":
        return "\u2198\uFE0F";
      default:
        return "\u2192";
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
      <div
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          marginBottom: "8px",
        }}
      >
        {editField === "title" ? (
          <input
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            style={{
              fontSize: 14,
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              padding: "2px 4px",
            }}
          />
        ) : (
          <span
            onClick={() => startEdit("title", title)}
            style={{ cursor: "pointer" }}
          >
            {title}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "var(--text-primary)",
        }}
      >
        {editField === "value" ? (
          <input
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            style={{
              fontSize: 32,
              width: 80,
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              padding: "2px 4px",
            }}
          />
        ) : (
          <span
            onClick={() => startEdit("value", value)}
            style={{ cursor: "pointer" }}
          >
            {value}
          </span>
        )}
        {editField === "unit" ? (
          <input
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            style={{
              fontSize: 16,
              width: 40,
              marginLeft: 4,
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              padding: "2px 4px",
            }}
          />
        ) : (
          unit && (
            <span
              onClick={() => startEdit("unit", unit)}
              style={{ fontSize: 16, marginLeft: 4, cursor: "pointer" }}
            >
              {unit}
            </span>
          )
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
