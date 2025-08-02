import React from "react";

interface TableWidgetProps {
  config: {
    title: string;
    columns: string[];
    data: string[][];
  };
}

const TableWidget: React.FC<TableWidgetProps> = ({ config }) => {
  const { title, columns, data } = config;

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
                    }}
                  >
                    {cell}
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
