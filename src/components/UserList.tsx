import React from "react";
import { useCollaboration } from "../context/CollaborationContext";

const UserList: React.FC = () => {
  const { users } = useCollaboration();

  return (
    <div
      className="user-list"
      style={{
        width: "200px",
        backgroundColor: "#f8fafc",
        borderLeft: "1px solid #e2e8f0",
        padding: "16px",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "16px",
          fontWeight: "600",
          color: "#1e293b",
        }}
      >
        👥 Collaborators
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.values(users).map((user) => (
          <div
            key={user.id}
            className="user-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: user.color,
                marginRight: "8px",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "#475569",
                fontWeight: "500",
              }}
            >
              {user.name || `User ${user.id}`}
            </span>
          </div>
        ))}
        {Object.keys(users).length === 0 && (
          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
              textAlign: "center",
              padding: "16px",
            }}
          >
            No other users online
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
