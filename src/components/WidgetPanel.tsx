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
        backgroundColor: "#f8fafc",
        borderRight: "1px solid #e2e8f0",
        padding: "16px",
        overflowY: "auto",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "16px",
          fontWeight: "600",
          color: "#1e293b",
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
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.borderColor = "#e2e8f0";
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
                  color: "#1e293b",
                }}
              >
                {widget.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
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
