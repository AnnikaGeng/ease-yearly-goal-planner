import { BorderRadius, Colors, Shadow, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface CategoryProgress {
  id: string;
  name: string;
  icon: string;
  color: string;
  percentage: number;
  completedTasks: number;
  totalTasks: number;
}

interface CategoryProgressCardProps {
  category: CategoryProgress;
  onPress?: () => void;
}

export function CategoryProgressCard({
  category,
  onPress,
}: CategoryProgressCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View
        style={[styles.iconCircle, { backgroundColor: category.color + "20" }]}
      >
        <Text style={styles.iconText}>{category.icon}</Text>
      </View>
      <Text style={[styles.categoryName, { color: colors.text }]}>
        {category.name}
      </Text>
      <View style={styles.percentageRow}>
        <Text style={[styles.percentage, { color: colors.text }]}>
          {category.percentage}
        </Text>
        <Text style={[styles.percentSymbol, { color: colors.secondaryText }]}>
          %
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            {
              backgroundColor: category.color,
              width: `${category.percentage}%`,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    padding: Spacing.lg,
    borderRadius: BorderRadius.card,
    ...Shadow.small,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  iconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: Typography.subheadline.fontSize,
    fontWeight: Typography.subheadline.fontWeight,
    marginBottom: Spacing.md,
  },
  percentageRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.sm,
  },
  percentage: {
    fontSize: 36,
    fontWeight: "700",
  },
  percentSymbol: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.body.fontWeight,
    marginLeft: 2,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E5E5EA",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
