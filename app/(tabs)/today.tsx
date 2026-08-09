import { AIInsightCard } from "@/components/AIInsightCard";
import { YearProgressCard } from "@/components/AllProgressIcon";
import { SectionHeader } from "@/components/SectionHeader";
import { TaskCard } from "@/components/TaskCard";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Task } from "@/types/task";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Mock data
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Review pull requests",
    category: "Development",
    section: "priority",
    completed: false,
    position: 0,
  },
  {
    id: "2",
    title: "Prepare presentation slides",
    category: "Planning",
    section: "priority",
    completed: false,
    position: 1,
  },
  {
    id: "3",
    title: "Respond to client emails",
    category: "Urgent",
    section: "priority",
    completed: false,
    position: 2,
  },
  {
    id: "4",
    title: "Daily standup meeting",
    category: "Daily Sync",
    section: "morning",
    completed: false,
    time: "09:00",
  },
  {
    id: "5",
    title: "Coffee break",
    category: "Personal",
    section: "morning",
    completed: false,
    time: "10:30",
  },
  {
    id: "6",
    title: "Team sync call",
    category: "Team Call",
    section: "afternoon",
    completed: false,
    time: "14:00",
  },
  {
    id: "7",
    title: "Code review session",
    category: "Development",
    section: "afternoon",
    completed: false,
    time: "15:30",
  },
  {
    id: "8",
    title: "Plan tomorrow tasks",
    category: "Planning",
    section: "evening",
    completed: false,
    time: "17:00",
  },
];

export default function TodayScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [showAIInsight, setShowAIInsight] = useState(true);
  const insets = useSafeAreaInsets();

  // Get current date
  const getCurrentDate = () => {
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
    const now = new Date();
    return `${months[now.getMonth()]} ${now.getDate()}`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, Alex";
    if (hour < 18) return "Good Afternoon, Alex";
    return "Good Evening, Alex";
  };

  // Filter tasks by section
  const priorityTasks = tasks
    .filter((t) => t.section === "priority")
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  const morningTasks = tasks.filter((t) => t.section === "morning");
  const afternoonTasks = tasks.filter((t) => t.section === "afternoon");
  const eveningTasks = tasks.filter((t) => t.section === "evening");

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleReorderPriority = (data: Task[]) => {
    // Update positions
    const updatedTasks = data.map((task, index) => ({
      ...task,
      position: index,
    }));

    // Merge with other sections
    const otherTasks = tasks.filter((t) => t.section !== "priority");
    setTasks([...updatedTasks, ...otherTasks]);
  };

  const renderPriorityItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<Task>) => {
    return (
      <>
        <View style={{ marginBottom: Spacing.md }}>
          <TaskCard
            task={item}
            isDraggable={true}
            isActive={isActive}
            onToggleComplete={handleToggleComplete}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              drag();
            }}
          />
        </View>
      </>
    );
  };

  const renderInfoCard = () => (
    <>
      {/* AI Insight Card */}
      {showAIInsight && (
        <AIInsightCard
          title="Smart Suggestion"
          description="You have 3 urgent tasks. Consider scheduling breaks between them."
          actionLabel="Optimize Schedule"
          onAction={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
          onClose={() => setShowAIInsight(false)}
        />
      )}

      {/* Priority Section Header */}
      <SectionHeader title="High Priority" />
    </>
  );

  const renderListFooter = () => (
    <>
      {/* Morning Section */}
      {morningTasks.length > 0 && (
        <>
          <SectionHeader title="Morning" />
          {morningTasks.map((task) => (
            <View key={task.id} style={{ marginBottom: Spacing.lg }}>
              <TaskCard
                task={task}
                isDraggable={false}
                onToggleComplete={handleToggleComplete}
              />
            </View>
          ))}
        </>
      )}

      {/* Afternoon Section */}
      {afternoonTasks.length > 0 && (
        <>
          <SectionHeader title="Afternoon" />
          {afternoonTasks.map((task) => (
            <View key={task.id} style={{ marginBottom: Spacing.md }}>
              <TaskCard
                task={task}
                isDraggable={false}
                onToggleComplete={handleToggleComplete}
              />
            </View>
          ))}
        </>
      )}

      {/* Evening Section */}
      {eveningTasks.length > 0 && (
        <>
          <SectionHeader title="Evening" />
          {eveningTasks.map((task) => (
            <View key={task.id} style={{ marginBottom: Spacing.md }}>
              <TaskCard
                task={task}
                isDraggable={false}
                onToggleComplete={handleToggleComplete}
              />
            </View>
          ))}
        </>
      )}

      {/* Footer Message */}
      <Text style={[styles.footerText, { color: colors.tertiaryText }]}>
        All other tasks are scheduled for tomorrow
      </Text>
    </>
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
        <View style={styles.headerLeft}>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {getCurrentDate()}
          </Text>
          <Text style={[styles.greetingText, { color: colors.secondaryText }]}>
            {getGreeting()}
          </Text>
        </View>
        <View style={styles.yearlyProgress}>
          <YearProgressCard percentage={78} />
        </View>
      </View>

      {/* Content */}
      <DraggableFlatList
        data={priorityTasks}
        renderItem={renderPriorityItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => handleReorderPriority(data)}
        activationDistance={5}
        ListHeaderComponent={renderInfoCard}
        ListFooterComponent={renderListFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 150 },
        ]}
      />

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  dateText: {
    fontSize: Typography.largeTitle.fontSize,
    fontWeight: Typography.largeTitle.fontWeight,
    lineHeight: Typography.largeTitle.lineHeight,
    marginBottom: Spacing.xs,
  },
  greetingText: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.body.fontWeight,
    lineHeight: Typography.body.lineHeight,
  },
  yearlyProgress: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Spacing.md,
  },
  progressIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  progressIconText: {
    fontSize: 22,
  },
  progressTextContainer: {
    alignItems: "flex-start",
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  progressValue: {
    fontSize: 17,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    overflow: "visible",
  },
  footerText: {
    fontSize: Typography.footnote.fontSize,
    fontWeight: Typography.footnote.fontWeight,
    lineHeight: Typography.footnote.lineHeight,
    textAlign: "center",
    marginTop: Spacing.xl,
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
