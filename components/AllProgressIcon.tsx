import { Colors } from "@/constants/theme";
import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface YearProgressCardProps {
  percentage: number;
  label?: string;
}

export const YearProgressCard: React.FC<YearProgressCardProps> = ({
  percentage,
  label = "YEAR",
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.accent,
        },
      ]}
    >
      {/* Icon Circle */}
      <View style={styles.iconContainer}>
        <SymbolView
          name="chart.pie"
          size={28}
          type="hierarchical"
          tintColor="#FFFFFF"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.percentage, { color: colors.text }]}>
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 10,
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.08)",
    elevation: 3,
    alignSelf: "flex-start",
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 28,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  textContainer: {
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  percentage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: -0.5,
  },
});
