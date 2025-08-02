import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

// -------------------- Types --------------------
export interface Widget {
  id: string;
  type: string;
  config: any;
  layout: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Dashboard {
  id: string;
  name: string;
  widgets: Record<string, Widget>;
  layout: {
    type: "grid" | "flex" | "freeform";
    config: any;
  };
}

interface DashboardState {
  dashboards: Record<string, Dashboard>;
  activeDashboardId: string | null;
  history: {
    past: Dashboard[];
    present: Dashboard | null;
    future: Dashboard[];
  };
  loadDashboard: (id: string) => Promise<void>;
  saveDashboard: () => Promise<void>;
  addWidget: (widget: Omit<Widget, "id">) => void;
  updateWidget: (widgetId: string, updates: Partial<Widget>) => void;
  removeWidget: (widgetId: string) => void;
  undo: () => void;
  redo: () => void;
}

// -------------------- Store --------------------
export const useDashboardStore = create<DashboardState>()(
  immer((set, get) => ({
    dashboards: {},
    activeDashboardId: null,
    history: {
      past: [],
      present: null,
      future: [],
    },
    loadDashboard: async (id: string) => {
      const dashboard: Dashboard = {
        id,
        name: `Dashboard ${id}`,
        widgets: {},
        layout: {
          type: "grid",
          config: { cols: 12, rowHeight: 50 },
        },
      };

      set((state) => {
        state.dashboards[id] = dashboard;
        state.activeDashboardId = id;
        state.history.present = dashboard;
      });
    },

    saveDashboard: async () => {
      const { activeDashboardId, dashboards } = get();
      if (!activeDashboardId) return;

      console.log("Saving dashboard:", dashboards[activeDashboardId]);
    },

    addWidget: (widget) => {
      const { activeDashboardId } = get();
      if (!activeDashboardId) return;

      const newWidget: Widget = {
        ...widget,
        id: `widget-${Date.now()}`,
      };

      set((state) => {
        if (state.history.present) {
          state.history.past.push(state.history.present);
          state.history.future = [];
        }

        state.dashboards[activeDashboardId].widgets[newWidget.id] = newWidget;
        state.history.present = state.dashboards[activeDashboardId];
      });
    },

    updateWidget: (widgetId, updates) => {
      const { activeDashboardId } = get();
      if (!activeDashboardId) return;

      set((state) => {
        if (state.history.present) {
          state.history.past.push(state.history.present);
          state.history.future = [];
        }

        const widget = state.dashboards[activeDashboardId].widgets[widgetId];
        if (widget) {
          Object.assign(widget, updates);
        }

        state.history.present = state.dashboards[activeDashboardId];
      });
    },

    removeWidget: (widgetId) => {
      const { activeDashboardId } = get();
      if (!activeDashboardId) return;

      set((state) => {
        if (state.history.present) {
          state.history.past.push(state.history.present);
          state.history.future = [];
        }

        delete state.dashboards[activeDashboardId].widgets[widgetId];
        state.history.present = state.dashboards[activeDashboardId];
      });
    },

    undo: () => {
      set((state) => {
        if (state.history.past.length === 0) return;

        const previous = state.history.past.pop();
        if (previous && state.history.present) {
          state.history.future.unshift(state.history.present);
          state.history.present = previous;

          if (state.activeDashboardId) {
            state.dashboards[state.activeDashboardId] = previous;
          }
        }
      });
    },

    redo: () => {
      set((state) => {
        if (state.history.future.length === 0) return;

        const next = state.history.future.shift();
        if (next && state.history.present) {
          state.history.past.push(state.history.present);
          state.history.present = next;

          if (state.activeDashboardId) {
            state.dashboards[state.activeDashboardId] = next;
          }
        }
      });
    },
  }))
);

// -------------------- Selectors --------------------

export const useActiveDashboard = () =>
  useDashboardStore((state) =>
    state.activeDashboardId ? state.dashboards[state.activeDashboardId] : null
  );

export const useDashboardActions = () => {
  const loadDashboard = useDashboardStore((state) => state.loadDashboard);
  const saveDashboard = useDashboardStore((state) => state.saveDashboard);
  const addWidget = useDashboardStore((state) => state.addWidget);
  const updateWidget = useDashboardStore((state) => state.updateWidget);
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const undo = useDashboardStore((state) => state.undo);
  const redo = useDashboardStore((state) => state.redo);

  return {
    loadDashboard,
    saveDashboard,
    addWidget,
    updateWidget,
    removeWidget,
    undo,
    redo,
  };
};

// Add missing selector for App.tsx
export const useDashboardStoreWithSelectors = () => {
  const activeDashboard = useDashboardStore((state) =>
    state.activeDashboardId ? state.dashboards[state.activeDashboardId] : null
  );
  const loadDashboard = useDashboardStore((state) => state.loadDashboard);
  const saveDashboard = useDashboardStore((state) => state.saveDashboard);
  const addWidget = useDashboardStore((state) => state.addWidget);
  const updateWidget = useDashboardStore((state) => state.updateWidget);
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const undo = useDashboardStore((state) => state.undo);
  const redo = useDashboardStore((state) => state.redo);

  return {
    activeDashboard,
    loadDashboard,
    saveDashboard,
    addWidget,
    updateWidget,
    removeWidget,
    undo,
    redo,
  };
};
