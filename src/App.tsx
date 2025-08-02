// App.tsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { CollaborationProvider } from "./context/CollaborationContext";
import DashboardCanvas from "./components/DashboardCanvas";
import WidgetPanel from "./components/WidgetPanel";
import Toolbar from "./components/Toolbar";
import UserList from "./components/UserList";
import { useDashboardStoreWithSelectors } from "./store/dashboardStore";

const App: React.FC = () => {
  const { activeDashboard, loadDashboard } = useDashboardStoreWithSelectors();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await loadDashboard("default-dashboard");
      setLoading(false);
    };
    initialize();
  }, [loadDashboard]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <ThemeProvider>
      <CollaborationProvider dashboardId={activeDashboard?.id || ""}>
        <div className="app-container">
          <Toolbar />
          <div className="main-content">
            <WidgetPanel />
            <DashboardCanvas />
            <UserList />
          </div>
        </div>
      </CollaborationProvider>
    </ThemeProvider>
  );
};

export default App;
