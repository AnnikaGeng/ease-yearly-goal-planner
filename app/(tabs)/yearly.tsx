import { ActivityMap } from "@/components/ActivityMap";
import { AIInsightCard } from "@/components/AIInsightCard";
import { GoalCard } from "@/components/GoalCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { YearSelector } from "@/components/YearSelector";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Goal } from "@/types/goal";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Mock goals
const MOCK_GOALS: Goal[] = [
  {
    id: "1",
    title: "Read Books",
    category: "Personal Growth",
    icon: "📚",
    progress: 33,
    current: 8,
    target: 24,
    unit: "Books",
    status: "behind",
    priority: "high",
    tip: "Try reading 20 pages every Tuesday to catch up.",
  },
  {
    id: "2",
    title: "Run 500km",
    category: "Health & Fitness",
    icon: "🏃",
    progress: 50,
    current: 250,
    target: 500,
    unit: "km",
    status: "on-track",
    priority: "high",
  },
  {
    id: "3",
    title: "Savings",
    category: "Finance",
    icon: "💰",
    progress: 41,
    current: 5000,
    target: 12000,
    unit: "USD",
    status: "behind",
    priority: "medium",
    tip: "Put aside $200 extra this month to catch up.",
  },
  {
    id: "4",
    title: "Learn Spanish",
    category: "Education",
    icon: "🗣️",
    progress: 15,
    current: 3,
    target: 20,
    unit: "Lessons",
    status: "started",
    priority: "low",
  },
];

export default function YearlyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  const [selectedYear] = useState(() => new Date().getFullYear());
  const [goals] = useState(MOCK_GOALS);
  const [showAIInsight, setShowAIInsight] = useState(true);

  const currentStreak = 12;
  const totalGoals = goals.length;
  const completedGoals = useMemo(
    () => goals.filter((g) => g.progress === 100).length,
    [goals]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View style={styles.header}>
        <YearSelector
          selectedYear={selectedYear}
          onYearPress={() => {
            // TODO: Open year picker modal
          }}
        />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="🏁"
            value={totalGoals}
            label="Total Goals"
            iconColor="#007AFF"
          />
          <StatCard
            icon="✅"
            value={completedGoals}
            label="Completed"
            iconColor="#34C759"
          />
        </View>

        {/* Activity Map */}
        <ActivityMap year={selectedYear} currentStreak={currentStreak} />

        {/* AI Insight Card */}
        {showAIInsight && (
          <View style={styles.aiInsightContainer}>
            <AIInsightCard
              title="AI INSIGHT"
              description="You're slightly behind on reading. Try reading 20 pages every Tuesday to catch up."
              actionLabel="View Analysis →"
              onAction={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
              }}
              onClose={() => setShowAIInsight(false)}
            />
          </View>
        )}

        {/* Your Goals Section */}
        <View style={styles.goalsSection}>
          <SectionHeader title="Your Goals" />
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onPress={() => {
                // TODO: Navigate to goal detail
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: colors.tint,
            bottom: insets.bottom + 88,
          },
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          // TODO: Open create goal modal
        }}
        activeOpacity={0.8}
      >
        <View style={styles.fabContent}>
          <Text style={styles.fabIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  statsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  aiInsightContainer: {
    marginVertical: Spacing.xl,
  },
  goalsSection: {
    marginBottom: Spacing.xl,
  },
  fab: {
    position: "absolute",
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    elevation: 8,
  },
  fabContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fabIcon: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "300",
    lineHeight: 32,
  },
});
