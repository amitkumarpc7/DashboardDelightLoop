import { useEffect, useState } from "react";
import * as Y from "yjs";
import { useCollaboration } from "../context/CollaborationContext";

export const useYMap = (mapName: string) => {
  const { ydoc } = useCollaboration();
  const [ymap, setYmap] = useState<Y.Map<any> | null>(null);

  useEffect(() => {
    const map = ydoc.getMap(mapName);
    setYmap(map);

    const handleMapChange = () => {
      // Trigger re-render when map changes
      setYmap(map);
    };

    map.observe(handleMapChange);

    return () => {
      map.unobserve(handleMapChange);
    };
  }, [ydoc, mapName]);

  const setValue = (key: string, value: any) => {
    if (ymap) {
      ymap.set(key, value);
    }
  };

  const getValue = (key: string) => {
    return ymap?.get(key);
  };

  const deleteValue = (key: string) => {
    if (ymap) {
      ymap.delete(key);
    }
  };

  return {
    ymap,
    setValue,
    getValue,
    deleteValue,
  };
};
