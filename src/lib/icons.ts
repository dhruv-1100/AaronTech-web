import {
  Wrench,
  Flame,
  FlaskConical,
  CircleDot,
  Gauge,
  Target,
  ToggleRight,
  Droplets,
  Layers,
  Zap,
  Spline,
  Circle,
  Package,
  Factory,
  ShieldCheck,
  TrendingDown,
  Leaf,
  FileCheck,
  Fuel,
} from "lucide-react";
import React from "react";

export const iconMap: Record<string, React.ComponentType<any>> = {
  Wrench,
  Flame,
  FlaskConical,
  CircleDot,
  Gauge,
  Target,
  ToggleRight,
  Droplets,
  Layers,
  Zap,
  Spline,
  Circle,
  Package,
  Factory,
  ShieldCheck,
  TrendingDown,
  Leaf,
  FileCheck,
  Fuel,
};

export function resolveIcon(name: string): React.ComponentType<any> {
  return iconMap[name] ?? Circle;
}
