import type { ReactElement } from "react";

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

export interface WidgetComponentProps {
  id: string;
  type: string;
  config: any;
  layout: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  data?: any;
  loading?: boolean;
  error?: string;
}

import type { ComponentType } from "react";

export interface WidgetComponent {
  (props: {
    config: any;
    data?: any;
    loading?: boolean;
    error?: string;
  }): ReactElement | null;
}

export type WidgetComponentType = ComponentType<{
  config: any;
  data?: any;
  loading?: boolean;
  error?: string;
}>;

export interface WidgetDefinition {
  type: string;
  name: string;
  description: string;
  icon: string;
  defaultConfig: any;
  defaultLayout: {
    width: number;
    height: number;
  };
  component: WidgetComponentType;
}

export interface LayoutConfig {
  type: "grid" | "flex" | "freeform";
  cols?: number;
  rowHeight?: number;
  gap?: number;
  padding?: number;
}
