import React from "react";
import { getAllWidgetTypes } from "../widgets/widgetRegistry";
import { useDashboardActions } from "../store/dashboardStore";

const WidgetPanel: React.FC = () => {
  const { addWidget } = useDashboardActions();
  const widgetTypes = getAllWidgetTypes();

  const handleDragStart = (e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const handleAddWidget = (widgetType: string) => {
    const widgetDefinition = widgetTypes.find((w) => w.type === widgetType);
    if (widgetDefinition) {
      addWidget({
        type: widgetType,
        config: widgetDefinition.defaultConfig,
        layout: {
          x: 0,
          y: 0,
          ...widgetDefinition.defaultLayout,
        },
      });
    }
  };

  return (
    <div
      className="widget-panel"
      style={{
        width: "250px",
        backgroundColor: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        padding: "16px",
        overflowY: "auto",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "16px",
          fontWeight: "600",
          color: "var(--text-primary)",
        }}
      >
        Widgets
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {widgetTypes.map((widget) => (
          <div
            key={widget.type}
            className="widget-item"
            draggable
            onDragStart={(e) => handleDragStart(e, widget.type)}
            onClick={() => handleAddWidget(widget.type)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              e.currentTarget.style.borderColor = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-primary)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>
              {widget.icon}
            </span>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                }}
              >
                {widget.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginTop: "2px",
                }}
              >
                {widget.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPanel;
