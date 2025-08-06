import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useDashboardActions } from "../store/dashboardStore";

const Toolbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { undo, redo, saveDashboard } = useDashboardActions();

  const handleThemeChange = (newTheme: "light" | "dark" | "custom") => {
    setTheme(newTheme);
  };

  return (
    <div
      className="toolbar"
      style={{
        height: "60px",
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          Dashboard Builder
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Undo/Redo */}
        <button
          onClick={undo}
          style={{
            padding: "8px 12px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          ↩ Undo
        </button>
        <button
          onClick={redo}
          style={{
            padding: "8px 12px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          ↪ Redo
        </button>

        {/* Theme Selector */}
        <select
          value={theme}
          onChange={(e) =>
            handleThemeChange(e.target.value as "light" | "dark" | "custom")
          }
          style={{
            padding: "8px 12px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            fontSize: "14px",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="custom">🎨 Custom</option>
        </select>

        {/* Save Button */}
        <button
          onClick={saveDashboard}
          style={{
            padding: "8px 16px",
            backgroundColor: "var(--accent-color)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            color: "#ffffff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          💾 Save
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
