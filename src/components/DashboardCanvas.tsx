import React, { useCallback } from "react";
import { useYMap } from "../hooks/useYMap";
import WidgetRenderer from "./WidgetRenderer";
import { useDashboardStoreWithSelectors } from "../store/dashboardStore";
import { getAllWidgetTypes } from "../widgets/widgetRegistry";

const DashboardCanvas: React.FC = () => {
  const { activeDashboard, addWidget } = useDashboardStoreWithSelectors();
  const { ymap } = useYMap("dashboard-state");
  const widgetTypes = getAllWidgetTypes();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const widgetType = e.dataTransfer.getData("widgetType");
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const widgetDefinition = widgetTypes.find((w) => w.type === widgetType);
      if (widgetDefinition) {
        addWidget({
          type: widgetType,
          config: widgetDefinition.defaultConfig,
          layout: {
            x,
            y,
            ...widgetDefinition.defaultLayout,
          },
        });
      }
    },
    [addWidget, widgetTypes]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  if (!activeDashboard) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          fontSize: "18px",
          color: "#64748b",
          backgroundColor: "#f8fafc",
        }}
      >
        No dashboard selected
      </div>
    );
  }

  return (
    <div
      className="dashboard-canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "auto",
        minHeight: "600px",
        padding: "20px",
      }}
    >
      {Object.values(activeDashboard.widgets).map((widget) => (
        <WidgetRenderer key={widget.id} widget={widget} ymap={ymap} />
      ))}

      {Object.keys(activeDashboard.widgets).length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
          <div>Drag widgets here to build your dashboard</div>
          <div style={{ fontSize: "14px", marginTop: "8px" }}>
            Or click on widgets in the panel to add them
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCanvas;
