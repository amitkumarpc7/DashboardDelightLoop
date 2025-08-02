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
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
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
            color: "#1e293b",
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
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#475569",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f8fafc";
          }}
        >
          ↩ Undo
        </button>
        <button
          onClick={redo}
          style={{
            padding: "8px 12px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#475569",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f8fafc";
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
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#475569",
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
            backgroundColor: "#3b82f6",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            color: "#ffffff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#3b82f6";
          }}
        >
          💾 Save
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
