import type { WidgetDefinition } from "../types/widget";
import ChartWidget from "./ChartWidget";
import TextWidget from "./TextWidget";
import MetricWidget from "./MetricWidget";
import TableWidget from "./TableWidget";
import ImageWidget from "./ImageWidget";

export const widgetDefinitions: Record<string, WidgetDefinition> = {
  chart: {
    type: "chart",
    name: "Chart",
    description: "Display data in various chart formats",
    icon: "📊",
    defaultConfig: {
      chartType: "line",
      title: "Chart Title",
      dataSource: "mock",
    },
    defaultLayout: {
      width: 400,
      height: 300,
    },
    component: ChartWidget,
  },
  text: {
    type: "text",
    name: "Text",
    description: "Display formatted text content",
    icon: "📝",
    defaultConfig: {
      content: "Enter your text here...",
      fontSize: 16,
      fontWeight: "normal",
      textAlign: "left",
    },
    defaultLayout: {
      width: 300,
      height: 150,
    },
    component: TextWidget,
  },
  metric: {
    type: "metric",
    name: "Metric",
    description: "Display a single key metric",
    icon: "🔢",
    defaultConfig: {
      title: "Metric Title",
      value: "0",
      unit: "",
      trend: "up",
      trendValue: "+5%",
    },
    defaultLayout: {
      width: 200,
      height: 120,
    },
    component: MetricWidget,
  },
  table: {
    type: "table",
    name: "Table",
    description: "Display data in a table format",
    icon: "📋",
    defaultConfig: {
      title: "Table Title",
      columns: ["Name", "Value", "Status"],
      data: [
        ["Item 1", "100", "Active"],
        ["Item 2", "200", "Inactive"],
      ],
    },
    defaultLayout: {
      width: 500,
      height: 300,
    },
    component: TableWidget,
  },
  image: {
    type: "image",
    name: "Image",
    description: "Display images or logos",
    icon: "🖼️",
    defaultConfig: {
      src: "https://via.placeholder.com/300x200",
      alt: "Image description",
      fit: "cover",
    },
    defaultLayout: {
      width: 300,
      height: 200,
    },
    component: ImageWidget,
  },
};

export const widgetComponents = Object.fromEntries(
  Object.entries(widgetDefinitions).map(([key, definition]) => [
    key,
    definition.component,
  ])
);

export const getWidgetDefinition = (
  type: string
): WidgetDefinition | undefined => {
  return widgetDefinitions[type];
};

export const getAllWidgetTypes = (): WidgetDefinition[] => {
  return Object.values(widgetDefinitions);
};
