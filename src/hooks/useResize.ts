import { useCallback } from "react";
import { useDashboardActions } from "../store/dashboardStore";

interface ResizeHandle {
  direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
  cursor: string;
}

export const useResize = (widgetId: string, ymap?: any) => {
  const { updateWidget } = useDashboardActions();

  const resizeHandles: ResizeHandle[] = [
    { direction: "n", cursor: "n-resize" },
    { direction: "s", cursor: "s-resize" },
    { direction: "e", cursor: "e-resize" },
    { direction: "w", cursor: "w-resize" },
    { direction: "ne", cursor: "ne-resize" },
    { direction: "nw", cursor: "nw-resize" },
    { direction: "se", cursor: "se-resize" },
    { direction: "sw", cursor: "sw-resize" },
  ];

  const onResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth =
        (e.target as HTMLElement).parentElement?.offsetWidth || 0;
      const startHeight =
        (e.target as HTMLElement).parentElement?.offsetHeight || 0;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        // Calculate new dimensions based on resize direction
        if (direction.includes("e")) newWidth = startWidth + deltaX;
        if (direction.includes("w")) newWidth = startWidth - deltaX;
        if (direction.includes("s")) newHeight = startHeight + deltaY;
        if (direction.includes("n")) newHeight = startHeight - deltaY;

        // Apply minimum size constraints
        newWidth = Math.max(100, newWidth);
        newHeight = Math.max(50, newHeight);

        // Get current widget position from the DOM element
        const widgetElement = document.querySelector(
          `[data-widget-id="${widgetId}"]`
        ) as HTMLElement;
        const currentX = widgetElement
          ? parseInt(widgetElement.style.left) || 0
          : 0;
        const currentY = widgetElement
          ? parseInt(widgetElement.style.top) || 0
          : 0;

        // Update widget layout
        updateWidget(widgetId, {
          layout: {
            x: currentX,
            y: currentY,
            width: newWidth,
            height: newHeight,
          },
        });

        // Update Yjs map for collaboration
        if (ymap) {
          ymap.set(`widget-${widgetId}-layout`, {
            width: newWidth,
            height: newHeight,
          });
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [widgetId, updateWidget, ymap]
  );

  return {
    resizeHandles,
    onResizeStart,
  };
};
