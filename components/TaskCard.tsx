import {
  BorderRadius,
  CategoryColors,
  Colors,
  Shadow,
  Spacing,
  Typography,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Task, TaskCategory } from "@/types/task";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface TaskCardProps {
  task: Task;
  isDraggable?: boolean;
  isActive?: boolean;
  onToggleComplete?: (taskId: string) => void;
  onLongPress?: () => void;
}

export function TaskCard({
  task,
  isDraggable = false,
  isActive = false,
  onToggleComplete,
  onLongPress,
}: TaskCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const animatedStyle = useAnimatedStyle(() => {
    const targetScale = isActive ? 0.98 : 1;

    return {
      transform: [
        {
          scale: withSpring(targetScale, {
            damping: 100,
            stiffness: 100,
          }),
        },
      ],
      opacity: withSpring(isActive ? 0.95 : task.completed ? 0.5 : 1),
      marginHorizontal: withSpring(isActive ? -Spacing.md : 0),
    };
  });

  const categoryColor = getCategoryColor(task.category);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          ...(isActive ? Shadow.cardActive : Shadow.card),
        },
        animatedStyle,
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => onToggleComplete?.(task.id)}
        style={styles.checkboxContainer}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: task.completed
                ? colors.completed
                : colors.tertiaryText,
              backgroundColor: task.completed
                ? colors.completed
                : "transparent",
            },
          ]}
        >
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              textDecorationLine: task.completed ? "line-through" : "none",
            },
          ]}
        >
          {task.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.category, { color: categoryColor }]}>
            {task.category}
          </Text>
          {task.time && (
            <Text style={[styles.time, { color: colors.tertiaryText }]}>
              {task.time}
            </Text>
          )}
        </View>
      </View>

      {/* Drag Handle */}
      {isDraggable && !task.completed && (
        <Pressable
          onLongPress={onLongPress}
          // delayLongPress={100}
          style={styles.dragHandle}
        >
          <Text style={[styles.dragIcon, { color: colors.tertiaryText }]}>
            ⋮⋮
          </Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

function getCategoryColor(category: TaskCategory): string {
  return CategoryColors[category] || Colors.light.personal;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.card,
  },
  checkboxContainer: {
    padding: Spacing.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    fontSize: Typography.bodySemibold.fontSize,
    fontWeight: Typography.bodySemibold.fontWeight,
    lineHeight: Typography.bodySemibold.lineHeight,
    marginBottom: Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  category: {
    fontSize: Typography.footnoteSemibold.fontSize,
    fontWeight: Typography.footnoteSemibold.fontWeight,
    lineHeight: Typography.footnoteSemibold.lineHeight,
  },
  time: {
    fontSize: Typography.footnote.fontSize,
    fontWeight: Typography.footnote.fontWeight,
    lineHeight: Typography.footnote.lineHeight,
  },
  dragHandle: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.md,
  },
  dragIcon: {
    fontSize: 20,
  },
});
