import React, { useState } from "react";
import { useDashboardActions } from "../store/dashboardStore";

interface TextWidgetProps {
  config: {
    content: string;
    fontSize: number;
    fontWeight: string;
    textAlign: string;
  };
  widgetId?: string;
}

const TextWidget: React.FC<TextWidgetProps & { widgetId?: string }> = ({
  config,
  widgetId,
}) => {
  const { content, fontSize, fontWeight, textAlign } = config;
  const { updateWidget } = useDashboardActions();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleSave = () => {
    if (widgetId) {
      updateWidget(widgetId, { config: { ...config, content: value } });
    }
    setEditing(false);
  };

  return (
    <div
      className="text-widget"
      style={{
        fontSize: `${fontSize}px`,
        fontWeight,
        textAlign: textAlign as "left" | "center" | "right",
        padding: "16px",
        height: "100%",
        overflow: "auto",
        wordBreak: "break-word",
        cursor: "pointer",
        color: "var(--text-primary)",
      }}
      onClick={() => setEditing(true)}
    >
      {editing ? (
        <textarea
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
          }}
          style={{
            width: "100%",
            minHeight: 40,
            fontSize: `${fontSize}px`,
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "4px",
            padding: "4px",
          }}
        />
      ) : (
        content
      )}
    </div>
  );
};

export default TextWidget;
