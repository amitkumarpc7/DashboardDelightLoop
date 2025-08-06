import { useCallback, useRef } from "react";
import { useDashboardActions } from "../store/dashboardStore";

export const useDrag = (widgetId: string) => {
  const { updateWidget } = useDashboardActions();
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Don't start drag if clicking on resize handles or buttons
      const target = e.target as HTMLElement;
      if (
        target.closest(".resize-handle") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        return;
      }

      e.preventDefault();
      isDragging.current = true;
      startPos.current = { x: e.clientX, y: e.clientY };

      // Get the widget's current position
      const widgetElement = e.currentTarget as HTMLElement;
      const rect = widgetElement.getBoundingClientRect();
      startOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Add dragging class for visual feedback
      widgetElement.style.zIndex = "1000";
      widgetElement.style.opacity = "0.8";
      widgetElement.style.transform = "rotate(2deg)";

      // Add global mouse event listeners
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        // Get the canvas element to calculate relative position
        const canvas = widgetElement.closest(
          ".dashboard-canvas"
        ) as HTMLElement;
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          const canvasPadding = 20; // Canvas padding

          const newX =
            e.clientX - canvasRect.left - startOffset.current.x - canvasPadding;
          const newY =
            e.clientY - canvasRect.top - startOffset.current.y - canvasPadding;

          // Ensure widget doesn't go outside canvas bounds (accounting for padding)
          const maxX = canvasRect.width - rect.width - canvasPadding * 2;
          const maxY = canvasRect.height - rect.height - canvasPadding * 2;

          const clampedX = Math.max(0, Math.min(newX, maxX));
          const clampedY = Math.max(0, Math.min(newY, maxY));

          updateWidget(widgetId, {
            layout: {
              x: clampedX,
              y: clampedY,
              width: rect.width,
              height: rect.height,
            },
          });
        }
      };

      const handleMouseUp = () => {
        isDragging.current = false;

        // Remove dragging visual feedback
        widgetElement.style.zIndex = "";
        widgetElement.style.opacity = "";
        widgetElement.style.transform = "";

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [widgetId, updateWidget]
  );

  return { handleMouseDown, isDragging: isDragging.current };
};
