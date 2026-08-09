import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MonthSelectorProps {
  currentMonth: Date;
  userStatus?: string;
  onMonthPress?: () => void;
}

export function MonthSelector({
  currentMonth,
  userStatus = "DEEP FOCUS",
  onMonthPress,
}: MonthSelectorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handlePress = () => {
    if (onMonthPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onMonthPress();
    }
  };

  const monthName = currentMonth.toLocaleString("en-US", { month: "long" });
  const year = currentMonth.getFullYear();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.monthButton}
        onPress={handlePress}
        disabled={!onMonthPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.monthText, { color: colors.text }]}>
          {monthName} {year}
        </Text>
        {onMonthPress && (
          <Text style={[styles.chevron, { color: colors.text }]}>›</Text>
        )}
      </TouchableOpacity>

      <View style={[styles.statusBadge, { backgroundColor: colors.tint + "20" }]}>
        <Text style={styles.lightningIcon}>⚡</Text>
        <Text style={[styles.statusText, { color: colors.tint }]}>
          {userStatus}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  monthButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "700",
  },
  chevron: {
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 4,
    transform: [{ rotate: "90deg" }],
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
  },
  lightningIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
