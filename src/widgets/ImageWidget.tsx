import React, { useState } from "react";
import { useDashboardActions } from "../store/dashboardStore";

interface ImageWidgetProps {
  config: {
    src: string;
    alt: string;
    fit: "cover" | "contain" | "fill" | "none";
  };
  widgetId?: string;
}

const ImageWidget: React.FC<ImageWidgetProps & { widgetId?: string }> = ({
  config,
  widgetId,
}) => {
  const { src, alt, fit } = config;
  const { updateWidget } = useDashboardActions();
  const [editing, setEditing] = useState(false);
  const [editSrc, setEditSrc] = useState(src);
  const [editAlt, setEditAlt] = useState(alt);
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    if (widgetId) {
      updateWidget(widgetId, {
        config: { ...config, src: editSrc, alt: editAlt },
      });
    }
    setEditing(false);
    setImageError(false);
  };

  const getObjectFit = () => {
    switch (fit) {
      case "cover":
        return "cover";
      case "contain":
        return "contain";
      case "fill":
        return "fill";
      case "none":
        return "none";
      default:
        return "cover";
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div
      className="image-widget"
      style={{ height: "100%", width: "100%", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {editing ? (
        <div
          style={{
            padding: 12,
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: 8,
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            zIndex: 2,
            color: "var(--text-primary)",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <label
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Image URL:
            </label>
            <input
              value={editSrc}
              onChange={(e) => setEditSrc(e.target.value)}
              style={{
                width: "100%",
                fontSize: 13,
                padding: "4px 8px",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
              }}
              placeholder="Enter image URL..."
            />
            <div
              style={{
                fontSize: 10,
                color: "var(--text-secondary)",
                marginTop: 4,
              }}
            >
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Alt text:
            </label>
            <input
              value={editAlt}
              onChange={(e) => setEditAlt(e.target.value)}
              style={{
                width: "100%",
                fontSize: 13,
                padding: "4px 8px",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
              }}
              placeholder="Enter alt text..."
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSave}
              style={{
                background: "var(--accent-color)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setEditSrc(src);
                setEditAlt(alt);
              }}
              style={{
                background: "var(--bg-primary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: 4,
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {imageError ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bg-secondary)",
                border: "2px dashed var(--border-color)",
                borderRadius: "8px",
                color: "var(--text-secondary)",
                fontSize: 14,
                textAlign: "center",
                padding: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🖼️</div>
                <div>Image not found</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  Click to edit and add a valid URL
                </div>
              </div>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: getObjectFit(),
                borderRadius: "8px",
                backgroundColor: "var(--bg-secondary)",
              }}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
          {hovered && (
            <button
              onClick={() => setEditing(true)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: 4,
                padding: "4px 8px",
                cursor: "pointer",
                zIndex: 2,
                color: "var(--text-primary)",
                fontSize: 12,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              title="Edit image"
            >
              ✎ Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ImageWidget;
