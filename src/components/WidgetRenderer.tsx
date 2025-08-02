import React, { useState } from "react";
import { widgetComponents } from "../widgets/widgetRegistry";
import { useWidgetData } from "../hooks/useWidgetData";
import { useResize } from "../hooks/useResize";
import { useDashboardActions } from "../store/dashboardStore";

const WidgetRenderer: React.FC<{
  widget: any;
  ymap: any;
}> = ({ widget, ymap }) => {
  const WidgetComponent = widgetComponents[widget.type];
  const { data, loading, error } = useWidgetData(widget.id);
  const { resizeHandles, onResizeStart } = useResize(widget.id, ymap);
  const { removeWidget } = useDashboardActions();
  const [isHovered, setIsHovered] = useState(false);

  if (!WidgetComponent) {
    return (
      <div
        className="widget-container"
        style={{
          position: "absolute",
          left: widget.layout.x,
          top: widget.layout.y,
          width: widget.layout.width,
          height: widget.layout.height,
          border: "2px dashed #ef4444",
          backgroundColor: "#fef2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ef4444",
        }}
      >
        Unknown widget type: {widget.type}
      </div>
    );
  }

  return (
    <div
      className="widget-container"
      style={{
        position: "absolute",
        left: widget.layout.x,
        top: widget.layout.y,
        width: widget.layout.width,
        height: widget.layout.height,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        cursor: "move",
      }}
      data-widget-id={widget.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Header */}
      <div
        style={{
          height: "32px",
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
          fontSize: "12px",
          color: "#64748b",
        }}
      >
        <span>{widget.type}</span>
        {isHovered && (
          <button
            onClick={() => removeWidget(widget.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              color: "#ef4444",
              padding: "2px",
            }}
            title="Remove widget"
          >
            ✕
          </button>
        )}
      </div>

      {/* Widget Content */}
      <div className="widget-content" style={{ height: "calc(100% - 32px)" }}>
        <WidgetComponent
          config={widget.config}
          data={data}
          loading={loading}
          error={error ?? undefined}
        />
      </div>

      {/* Resize Handles */}
      {isHovered &&
        resizeHandles.map((handle) => (
          <div
            key={handle.direction}
            className={`resize-handle ${handle.direction}`}
            onMouseDown={(e) => onResizeStart(e, handle.direction)}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "#3b82f6",
              border: "1px solid #ffffff",
              cursor: handle.cursor,
              ...(handle.direction.includes("n") && { top: "-4px" }),
              ...(handle.direction.includes("s") && { bottom: "-4px" }),
              ...(handle.direction.includes("e") && { right: "-4px" }),
              ...(handle.direction.includes("w") && { left: "-4px" }),
              ...(handle.direction === "n" && {
                left: "50%",
                transform: "translateX(-50%)",
              }),
              ...(handle.direction === "s" && {
                left: "50%",
                transform: "translateX(-50%)",
              }),
              ...(handle.direction === "e" && {
                top: "50%",
                transform: "translateY(-50%)",
              }),
              ...(handle.direction === "w" && {
                top: "50%",
                transform: "translateY(-50%)",
              }),
              ...(handle.direction === "ne" && { top: "-4px", right: "-4px" }),
              ...(handle.direction === "nw" && { top: "-4px", left: "-4px" }),
              ...(handle.direction === "se" && {
                bottom: "-4px",
                right: "-4px",
              }),
              ...(handle.direction === "sw" && {
                bottom: "-4px",
                left: "-4px",
              }),
            }}
          />
        ))}
    </div>
  );
};

export default WidgetRenderer;
