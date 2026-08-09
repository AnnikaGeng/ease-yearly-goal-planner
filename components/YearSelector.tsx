import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface YearSelectorProps {
  selectedYear: number;
  onYearPress?: () => void;
}

export function YearSelector({ selectedYear, onYearPress }: YearSelectorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handlePress = () => {
    if (onYearPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onYearPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.yearButton}
        onPress={handlePress}
        disabled={!onYearPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.yearText, { color: colors.text }]}>
          {selectedYear}
        </Text>
        {onYearPress && (
          <Text style={[styles.chevron, { color: colors.text }]}>▼</Text>
        )}
      </TouchableOpacity>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Annual Overview
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  yearButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  yearText: {
    fontSize: 28,
    fontWeight: "700",
  },
  chevron: {
    fontSize: 16,
    marginLeft: Spacing.xs,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
});
