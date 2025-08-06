import React, { useState } from "react";
import { useDashboardActions } from "../store/dashboardStore";

interface TableWidgetProps {
  config: {
    title: string;
    columns: string[];
    data: string[][];
  };
  widgetId?: string;
}

const TableWidget: React.FC<TableWidgetProps & { widgetId?: string }> = ({
  config,
  widgetId,
}) => {
  const { title, columns, data } = config;
  const { updateWidget } = useDashboardActions();
  const [editingCell, setEditingCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [cellValue, setCellValue] = useState("");

  const startEdit = (row: number, col: number, value: string) => {
    setEditingCell({ row, col });
    setCellValue(value);
  };

  const handleSave = () => {
    if (widgetId && editingCell) {
      const newData = data.map((rowArr, rIdx) =>
        rowArr.map((cell, cIdx) =>
          rIdx === editingCell.row && cIdx === editingCell.col
            ? cellValue
            : cell
        )
      );
      updateWidget(widgetId, { config: { ...config, data: newData } });
    }
    setEditingCell(null);
    setCellValue("");
  };

  return (
    <div
      className="table-widget"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {title && (
        <div
          style={{
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: "bold",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ flex: 1, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb" }}>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ borderBottom: "1px solid #f3f4f6" }}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#374151",
                      cursor: "pointer",
                    }}
                    onClick={() => startEdit(rowIndex, cellIndex, cell)}
                  >
                    {editingCell &&
                    editingCell.row === rowIndex &&
                    editingCell.col === cellIndex ? (
                      <input
                        value={cellValue}
                        autoFocus
                        onChange={(e) => setCellValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSave();
                        }}
                        style={{ fontSize: 14, width: "100%" }}
                      />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWidget;
