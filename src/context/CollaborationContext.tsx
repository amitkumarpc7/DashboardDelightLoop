// CollaborationContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

interface User {
  id: string;
  name: string;
  color: string;
}

interface CollaborationContextType {
  ydoc: Y.Doc;
  provider: WebrtcProvider;
  users: Record<string, User>;
  awareness: any;
}

const CollaborationContext = createContext<
  CollaborationContextType | undefined
>(undefined);

export const CollaborationProvider: React.FC<{
  children: React.ReactNode;
  dashboardId: string;
}> = ({ children, dashboardId }) => {
  const [ydoc] = useState(new Y.Doc());
  const [provider, setProvider] = useState<WebrtcProvider | null>(null);
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    const newProvider = new WebrtcProvider(dashboardId, ydoc);
    setProvider(newProvider);

    const handleAwarenessChange = () => {
      const states = newProvider.awareness.getStates();
      const usersMap: Record<string, User> = {};

      states.forEach((state, clientId) => {
        usersMap[clientId] = {
          id: String(clientId),
          name: state.user?.name || "",
          color: state.user?.color || "#000000",
        };
      });

      setUsers(usersMap);
    };

    newProvider.awareness.on("change", handleAwarenessChange);

    return () => {
      newProvider.awareness.off("change", handleAwarenessChange);
      newProvider.destroy();
    };
  }, [dashboardId, ydoc]);

  if (!provider) return <div>Initializing collaboration...</div>;

  return (
    <CollaborationContext.Provider
      value={{
        ydoc,
        provider,
        users,
        awareness: provider.awareness,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error(
      "useCollaboration must be used within a CollaborationProvider"
    );
  }
  return context;
};
