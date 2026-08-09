import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  iconColor: string;
}

export function StatCard({ icon, value, label, iconColor }: StatCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.title}>
        <View
          style={[styles.iconCircle, { backgroundColor: iconColor + "20" }]}
        >
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={[styles.label, { color: colors.secondaryText }]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.card,
    alignItems: "center",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 20,
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: Spacing.xxl,
  },
  label: {
    fontSize: Typography.footnote.fontSize,
    fontWeight: Typography.footnote.fontWeight,
    textAlign: "left",
  },
  title: {
    flex: 1,
    flexDirection: "column",
    gap: Spacing.md,
  },
});
