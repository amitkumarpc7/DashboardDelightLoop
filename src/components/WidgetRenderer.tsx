import React, { useState } from "react";
import { widgetComponents } from "../widgets/widgetRegistry";
import { useWidgetData } from "../hooks/useWidgetData";
import { useResize } from "../hooks/useResize";
import { useDrag } from "../hooks/useDrag";
import { useDashboardActions } from "../store/dashboardStore";

const WidgetRenderer: React.FC<{
  widget: any;
  ymap: any;
}> = ({ widget, ymap }) => {
  const WidgetComponent = widgetComponents[widget.type];
  const { data, loading, error } = useWidgetData(widget.id);
  const { resizeHandles, onResizeStart } = useResize(widget.id, ymap);
  const { handleMouseDown } = useDrag(widget.id);
  const { removeWidget, updateWidget } = useDashboardActions();
  const [isHovered, setIsHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editConfig, setEditConfig] = useState<any>(widget.config);

  // Handle config field change
  const handleConfigChange = (key: string, value: any) => {
    setEditConfig((prev: any) => ({ ...prev, [key]: value }));
  };

  // Save config changes
  const handleSave = () => {
    updateWidget(widget.id, { config: editConfig });
    setEditMode(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditConfig(widget.config);
    setEditMode(false);
  };

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
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        cursor: "move",
      }}
      data-widget-id={widget.id}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Header */}
      <div
        style={{
          height: "32px",
          backgroundColor: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
          fontSize: "12px",
          color: "var(--text-secondary)",
        }}
      >
        <span>{widget.type}</span>
        <div style={{ display: "flex", gap: 4 }}>
          {isHovered && (
            <>
              <button
                onClick={() => setEditMode(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--accent-color)",
                  padding: "2px",
                  marginRight: 4,
                }}
                title="Edit widget"
              >
                ✎
              </button>
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
            </>
          )}
        </div>
      </div>

      {/* Widget Content or Edit Form */}
      <div className="widget-content" style={{ height: "calc(100% - 32px)" }}>
        {editMode ? (
          <div
            style={{
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "var(--bg-secondary)",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <h4
              style={{ margin: 0, fontSize: 16, color: "var(--text-primary)" }}
            >
              Edit {widget.type} config
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {Object.entries(editConfig).map(([key, value]) => (
                <div
                  key={key}
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <label
                    style={{ fontSize: 12, color: "var(--text-secondary)" }}
                  >
                    {key}
                  </label>
                  {typeof value === "string" || typeof value === "number" ? (
                    <input
                      type={typeof value === "number" ? "number" : "text"}
                      value={value}
                      onChange={(e) =>
                        handleConfigChange(
                          key,
                          typeof value === "number"
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                      style={{
                        padding: 4,
                        borderRadius: 4,
                        border: "1px solid var(--border-color)",
                        fontSize: 13,
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                    />
                  ) : (
                    <textarea
                      value={JSON.stringify(value, null, 2)}
                      onChange={(e) => {
                        try {
                          handleConfigChange(key, JSON.parse(e.target.value));
                        } catch {
                          // ignore parse error
                        }
                      }}
                      style={{
                        padding: 4,
                        borderRadius: 4,
                        border: "1px solid var(--border-color)",
                        fontSize: 13,
                        minHeight: 40,
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                    />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    background: "var(--accent-color)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 12px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 4,
                    padding: "4px 12px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <WidgetComponent
            config={widget.config}
            data={data}
            loading={loading}
            error={error ?? undefined}
          />
        )}
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
              backgroundColor: "var(--accent-color)",
              border: "1px solid var(--bg-primary)",
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
