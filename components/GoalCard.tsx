import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Goal, GoalCategory } from "@/types/goal";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

const CATEGORY_COLORS: Record<GoalCategory, string> = {
  "Personal Growth": "#FF9500",
  "Health & Fitness": "#007AFF",
  Finance: "#34C759",
  Education: "#AF52DE",
  Career: "#5856D6",
  Relationships: "#FF2D55",
  Hobbies: "#FFD60A",
  Home: "#5E5CE6",
};

const STATUS_CONFIG = {
  "on-track": {
    label: "On Track",
    color: "#007AFF",
    barColor: "#007AFF",
    icon: undefined,
  },
  behind: {
    label: "Behind",
    color: "#FF9500",
    barColor: "#FF9500",
    icon: "⚠️",
  },
  ahead: {
    label: "Ahead",
    color: "#34C759",
    barColor: "#34C759",
    icon: undefined,
  },
  "at-risk": {
    label: "At Risk",
    color: "#FF3B30",
    barColor: "#FF3B30",
    icon: undefined,
  },
  started: {
    label: "Started",
    color: "#AF52DE",
    barColor: "#AF52DE",
    icon: undefined,
  },
};

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const categoryColor = CATEGORY_COLORS[goal.category] || colors.tint;
  const statusConfig = STATUS_CONFIG[goal.status];

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Header Row */}
      <View style={styles.header}>
        <View
          style={[styles.iconCircle, { backgroundColor: categoryColor + "20" }]}
        >
          <Text style={styles.iconText}>{goal.icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {goal.title}
          </Text>
          <Text style={[styles.category, { color: colors.secondaryText }]}>
            {goal.category}
          </Text>
        </View>
        <Text style={[styles.percentage, { color: colors.text }]}>
          {goal.progress}%
        </Text>
      </View>

      {/* Progress Row */}
      <View style={styles.progressRow}>
        <Text style={[styles.progressText, { color: colors.secondaryText }]}>
          {goal.current} / {goal.target} {goal.unit}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.color + "20" },
          ]}
        >
          {statusConfig.icon && (
            <Text style={styles.statusIcon}>{statusConfig.icon}</Text>
          )}
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            {
              backgroundColor: statusConfig.barColor,
              width: `${goal.progress}%`,
            },
          ]}
        />
      </View>

      {/* Tip (if exists) */}
      {goal.tip && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={[styles.tipText]}>
            <Text style={styles.tipLabel}>Tip: </Text>
            {goal.tip}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.card,
    marginBottom: Spacing.md,
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  iconText: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.bodySemibold.fontSize,
    fontWeight: Typography.bodySemibold.fontWeight,
    marginBottom: 2,
  },
  category: {
    fontSize: Typography.footnote.fontSize,
    fontWeight: Typography.footnote.fontWeight,
  },
  percentage: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: Spacing.sm,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  progressText: {
    fontSize: Typography.subheadline.fontSize,
    fontWeight: Typography.subheadline.fontWeight,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    gap: 4,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  tipContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF9E6",
    borderWidth: 1,
    borderColor: "#FFE4A1",
    borderRadius: 8,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    fontSize: Typography.footnote.fontSize,
    lineHeight: Typography.footnote.lineHeight,
  },
  tipLabel: {
    fontWeight: "600",
  },
});
