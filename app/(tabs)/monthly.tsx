import { CalendarGrid } from "@/components/CalendarGrid";
import {
  CategoryProgress,
  CategoryProgressCard,
} from "@/components/CategoryProgressCard";
import { MonthSelector } from "@/components/MonthSelector";
import { TaskCard } from "@/components/TaskCard";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Task } from "@/types/task";
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

// Mock data for category progress
const MOCK_CATEGORIES: CategoryProgress[] = [
  {
    id: "1",
    name: "Health",
    icon: "❤️",
    color: "#FF6B6B",
    percentage: 60,
    completedTasks: 12,
    totalTasks: 20,
  },
  {
    id: "2",
    name: "Learning",
    icon: "🎓",
    color: "#4A90E2",
    percentage: 20,
    completedTasks: 4,
    totalTasks: 20,
  },
  {
    id: "3",
    name: "Work",
    icon: "💼",
    color: "#34C759",
    percentage: 85,
    completedTasks: 17,
    totalTasks: 20,
  },
  {
    id: "4",
    name: "Personal",
    icon: "🏠",
    color: "#AF52DE",
    percentage: 45,
    completedTasks: 9,
    totalTasks: 20,
  },
];

// Generate mock tasks for today
const getMockTasks = (): Task[] => {
  const todayStr = new Date().toISOString().split("T")[0];
  return [
    {
      id: "1",
      title: "Morning Run",
      category: "Health",
      section: "morning",
      completed: true,
      time: "7:30 AM",
      date: todayStr,
    },
    {
      id: "2",
      title: "Draft Q4 Report",
      category: "Work",
      section: "morning",
      completed: false,
      time: "10:00 AM - 12:00 PM",
      hasAI: true,
      priority: "high",
      date: todayStr,
    },
    {
      id: "3",
      title: "Grocery Shopping",
      category: "Personal",
      section: "afternoon",
      completed: false,
      time: "5:30 PM",
      date: todayStr,
    },
    {
      id: "4",
      title: "Read 20 pages",
      category: "Learning",
      section: "evening",
      completed: false,
      time: "9:00 PM",
      date: todayStr,
    },
  ];
};

export default function MonthlyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Initialize with current month and today's date
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date());
  const [tasks, setTasks] = useState(getMockTasks());
  const insets = useSafeAreaInsets();

  // Mock dates with tasks (for calendar indicators) - useMemo to prevent recreation
  const datesWithTasks = useMemo(() => {
    const today = new Date();
    const getDateKey = (daysOffset: number) => {
      const date = new Date(today);
      date.setDate(today.getDate() + daysOffset);
      return date.toISOString().split("T")[0];
    };

    return new Set([
      getDateKey(-4), // 4 days ago
      getDateKey(-1), // yesterday
      today.toISOString().split("T")[0], // today
      getDateKey(8), // 8 days from now
    ]);
  }, []);

  // Dates with incomplete tasks (for red dot indicator)
  const datesWithIncompleteTasks = useMemo(() => {
    const today = new Date();
    const getDateKey = (daysOffset: number) => {
      const date = new Date(today);
      date.setDate(today.getDate() + daysOffset);
      return date.toISOString().split("T")[0];
    };

    return new Set([
      getDateKey(-1), // yesterday
      today.toISOString().split("T")[0], // today
      getDateKey(8), // 8 days from now
    ]);
  }, []);

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // TODO: Filter tasks by selected date
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    // TODO: Fetch tasks for new month
  };

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "Select a date";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = selectedDate.getDate();
    const month = months[selectedDate.getMonth()];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    if (selected.getTime() === today.getTime()) {
      return `Today, ${month} ${day}`;
    }
    return `${month} ${day}`;
  }, [selectedDate]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View style={styles.header}>
        <MonthSelector
          currentMonth={currentMonth}
          userStatus="DEEP FOCUS"
          onMonthPress={() => {
            // TODO: Open month picker modal
          }}
        />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Progress Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
          style={styles.categoryScroll}
        >
          {MOCK_CATEGORIES.map((category) => (
            <View key={category.id} style={styles.categoryCardWrapper}>
              <CategoryProgressCard
                category={category}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  // TODO: Navigate to category detail
                }}
              />
            </View>
          ))}
        </ScrollView>

        {/* Calendar Grid */}
        <View style={styles.calendarSection}>
          <CalendarGrid
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            datesWithTasks={datesWithTasks}
            datesWithIncompleteTasks={datesWithIncompleteTasks}
          />
        </View>

        {/* Daily Task List */}
        <View style={styles.taskListSection}>
          <View style={styles.taskListHeader}>
            <Text style={[styles.taskListTitle, { color: colors.text }]}>
              {formattedDate}
            </Text>
            <View
              style={[
                styles.taskCountBadge,
                { backgroundColor: colors.secondaryText + "20" },
              ]}
            >
              <Text
                style={[styles.taskCountText, { color: colors.secondaryText }]}
              >
                {tasks.length} Tasks
              </Text>
            </View>
          </View>

          {/* Task List */}
          {tasks.map((task) => (
            <View key={task.id} style={{ marginBottom: Spacing.md }}>
              <TaskCard
                task={task}
                isDraggable={false}
                onToggleComplete={handleToggleComplete}
              />
            </View>
          ))}
        </View>

        {/* Monthly Recap Card - Placeholder */}
        <View
          style={[
            styles.recapCard,
            {
              backgroundColor: colors.tint + "20",
              borderColor: colors.tint + "30",
            },
          ]}
        >
          <View style={styles.recapHeader}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={[styles.recapTitle, { color: colors.text }]}>
              Monthly Recap
            </Text>
          </View>
          <Text style={[styles.recapHeading, { color: colors.text }]}>
            Keep going!
          </Text>
          <Text
            style={[styles.recapDescription, { color: colors.secondaryText }]}
          >
            Your October story will be ready in{" "}
            <Text style={styles.recapDays}>23 days</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              // TODO: Navigate to previous month recap
            }}
          >
            <Text style={[styles.recapLink, { color: colors.tint }]}>
              View September Recap
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: colors.tint,
            marginBottom: insets.bottom + 50,
          },
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          // TODO: Open AI assistant or add task modal
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
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
    paddingBottom: 100,
  },
  categoryScroll: {
    marginBottom: Spacing.xl,
  },
  categoryScrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  categoryCardWrapper: {
    marginRight: Spacing.md,
  },
  calendarSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  taskListSection: {
    paddingHorizontal: Spacing.lg,
  },
  taskListHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  taskCountBadge: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.md,
    borderRadius: 12,
  },
  taskCountText: {
    fontSize: 13,
    fontWeight: "600",
  },
  recapCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
  },
  recapHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  lockIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  recapTitle: {
    fontSize: Typography.bodySemibold.fontSize,
    fontWeight: Typography.bodySemibold.fontWeight,
  },
  recapHeading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  recapDescription: {
    fontSize: Typography.subheadline.fontSize,
    lineHeight: Typography.subheadline.lineHeight,
    marginBottom: Spacing.md,
  },
  recapDays: {
    fontWeight: "700",
  },
  recapLink: {
    fontSize: Typography.subheadline.fontSize,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: Spacing.xxl,
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "300",
    lineHeight: 32,
  },
});
