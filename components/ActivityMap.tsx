import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

interface ActivityMapProps {
  year: number;
  currentStreak: number;
}

export function ActivityMap({ year, currentStreak }: ActivityMapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Color scale for contribution levels (blue theme)
  const colorScale =
    colorScheme === "dark"
      ? ["#161b22", "#0a3069", "#0969da", "#1f6feb", "#58a6ff"]
      : ["#ebedf0", "#c6e0f5", "#7fb3d5", "#49a3d1", "#1e7ba4"];

  // Generate contribution data for the year
  const { contributionData, monthLabels, totalWeeks } = useMemo(() => {
    const data: Array<{
      date: Date;
      value: number;
      weekIndex: number;
      dayIndex: number;
    }> = [];
    const months: Array<{ month: string; x: number }> = [];

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // Find the first Sunday on or before Jan 1
    const firstDay = new Date(startDate);
    const dayOfWeek = firstDay.getDay();
    firstDay.setDate(firstDay.getDate() - dayOfWeek);

    const current = new Date(firstDay);
    let weekIndex = 0;
    let lastMonth = -1;

    while (current <= endDate || current.getDay() !== 0) {
      const dayIndex = current.getDay();

      // Only include days within the year
      if (current >= startDate && current <= endDate) {
        const value = Math.floor(Math.random() * 5); // Random 0-4
        data.push({
          date: new Date(current),
          value,
          weekIndex,
          dayIndex,
        });

        // Track month labels
        const month = current.getMonth();
        if (month !== lastMonth && dayIndex === 0) {
          months.push({
            month: current.toLocaleDateString("en-US", { month: "short" }),
            x: weekIndex,
          });
          lastMonth = month;
        }
      }

      // Move to next day
      current.setDate(current.getDate() + 1);

      // Start new week on Sunday
      if (current.getDay() === 0) {
        weekIndex++;
      }
    }

    return {
      contributionData: data,
      monthLabels: months,
      totalWeeks: weekIndex,
    };
  }, [year]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Activity Map</Text>
        <View style={styles.legend}>
          <Text style={[styles.legendText, { color: colors.secondaryText }]}>
            Less
          </Text>
          {colorScale.map((color, index) => (
            <View
              key={index}
              style={[styles.legendBox, { backgroundColor: color }]}
            />
          ))}
          <Text style={[styles.legendText, { color: colors.secondaryText }]}>
            More
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.calendarContainer}>
          <Svg width={totalWeeks * 13 + 20} height={110}>
            {/* Month labels */}
            {monthLabels.map((month, i) => (
              <SvgText
                key={i}
                x={month.x * 13 + 10}
                y={12}
                fontSize="10"
                fill={colors.secondaryText}
              >
                {month.month}
              </SvgText>
            ))}

            {/* Contribution squares */}
            {contributionData.map((day, i) => {
              const color = colorScale[day.value];
              return (
                <Rect
                  key={i}
                  x={day.weekIndex * 13 + 10}
                  y={day.dayIndex * 13 + 20}
                  width={11}
                  height={11}
                  fill={color}
                  rx={2}
                />
              );
            })}
          </Svg>
        </View>
      </ScrollView>

      {/* Streak info */}
      <View style={styles.streakContainer}>
        <Text style={[styles.streakText, { color: colors.secondaryText }]}>
          Consistent activity leads to 3× higher success rate.{"\n"}
          You are on a{" "}
          <Text style={[styles.streakNumber, { color: colors.tint }]}>
            {currentStreak} day streak
          </Text>
          !
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.card,
    padding: Spacing.lg,
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.bodySemibold.fontSize,
    fontWeight: Typography.bodySemibold.fontWeight,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendText: {
    fontSize: 10,
  },
  legendBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  scrollContent: {
    paddingRight: Spacing.sm,
  },
  calendarContainer: {
    paddingVertical: Spacing.sm,
  },
  streakContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  streakText: {
    fontSize: Typography.footnote.fontSize,
    lineHeight: Typography.footnote.lineHeight,
    textAlign: "center",
  },
  streakNumber: {
    fontWeight: "700",
  },
});
