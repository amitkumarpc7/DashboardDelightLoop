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

      // Only handle drops from widget panel (not from existing widgets)
      if (!widgetType) return;

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

  const handleDragStart = useCallback((e: React.DragEvent) => {
    // Prevent default drag behavior for existing widgets
    if (
      e.target instanceof HTMLElement &&
      e.target.closest(".widget-container")
    ) {
      e.preventDefault();
    }
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
          color: "var(--text-secondary)",
          backgroundColor: "var(--bg-secondary)",
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
      onDragStart={handleDragStart}
      style={{
        flex: 1,
        backgroundColor: "var(--bg-primary)",
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
            color: "var(--text-secondary)",
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
