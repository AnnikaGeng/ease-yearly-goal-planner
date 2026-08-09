/**
 * Theme constants following iOS Human Interface Guidelines
 */

import { Platform } from "react-native";

export const Colors = {
  light: {
    // Text colors
    text: "#000000",
    secondaryText: "#3C3C43",
    tertiaryText: "#8E8E93",

    // Background colors
    background: "#F2F2F7",
    cardBackground: "#FFFFFF",

    // System colors
    accent: "#007AFF",
    urgent: "#FF3B30",
    goal: "#AF52DE",
    completed: "#34C759",
    personal: "#8E8E93",
    development: "#5856D6",
    planning: "#FF9500",

    // Tab bar
    tint: "#007AFF",
    tabIconDefault: "#8E8E93",
    tabIconSelected: "#007AFF",
  },
  dark: {
    // Text colors
    text: "#FFFFFF",
    secondaryText: "#EBEBF5",
    tertiaryText: "#8E8E93",

    // Background colors
    background: "#000000",
    cardBackground: "#1C1C1E",

    // System colors
    accent: "#0A84FF",
    urgent: "#FF453A",
    goal: "#BF5AF2",
    completed: "#30D158",
    personal: "#98989D",
    development: "#5E5CE6",
    planning: "#FF9F0A",

    // Tab bar
    tint: "#0A84FF",
    tabIconDefault: "#98989D",
    tabIconSelected: "#0A84FF",
  },
};

// Category color mapping
export const CategoryColors = {
  "Daily Sync": Colors.light.accent,
  "Team Call": Colors.light.planning,
  Development: Colors.light.development,
  Planning: Colors.light.planning,
  Personal: Colors.light.personal,
  Urgent: Colors.light.urgent,
  Health: "#FF6B6B",
  Learning: "#4A90E2",
  Work: "#34C759",
} as const;

// Typography (SF Pro system)
export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: "700" as const,
    lineHeight: 41,
  },
  title1: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
  },
  body: {
    fontSize: 17,
    fontWeight: "400" as const,
    lineHeight: 22,
  },
  bodySemibold: {
    fontSize: 17,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  subheadline: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
  footnoteSemibold: {
    fontSize: 13,
    fontWeight: "600" as const,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
};

// Spacing (iOS HIG)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Border radius
export const BorderRadius = {
  card: 12,
  button: 8,
  small: 6,
};

// Shadow styles using boxShadow (replaces deprecated shadow* props)
export const Shadow = {
  small: {
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  medium: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  large: {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
    elevation: 8,
  },
  card: {
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  cardActive: {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.25)",
    elevation: 12,
  },
  icon: {
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.08)",
    elevation: 3,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "System",
    rounded: "System",
  },
  default: {
    sans: "System",
    rounded: "System",
  },
  web: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    rounded:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
});
